import React, { useState, useEffect, useContext } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import Router from "next/router"
import axios from "axios"
import {create as ipfsHttpClient} from 'ipfs-http-client'

const client = ipfsHttpClient("https://ipfs.infura.io:5001/ipfs/api/v0")

// Internal import
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants"

// Fetch smart contract
const fetchContract = (providerOrSigner) => 
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        providerOrSigner
    )

// Connecting with smartcontract
const connectWithSmartContract = async() => {
    try{
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = fetchContract(signer)
        return contract
    } catch (error){
        console.log("Error while connecting with the smart contract")
    }
}

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = (({children}) => {

    const [currentAccount, setCurrentAccount] = useState("")
        
    const checkIfWalletIsConnected = async() => {
        try {
            const { ethereum } = window

            if(!ethereum) return console.log("Make sure you have metamask wallet")

            const accounts = await ethereum.request({
                method: "eth_accounts"
            })

            // User can have multiple authorized accounts, we grab the first one if its there
            if(accounts.length){
                setCurrentAccount(accounts[0])
            }else{
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log("Error while connecting to the wallet")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    },[])

    const connectWallet = async () => {
        try {
        const { ethereum } = window

        if (!ethereum) return alert("Get MetaMask!")

        const accounts = await ethereum.request({
            method: "eth_requestAccounts" 
        });

        setCurrentAccount(accounts[0]); 
        } catch (error) {
            console.log("Error while connecting to the wallet");
        }
    }

    const uploadToIPFS = async(file) => {
        try {
            const added = await client.add({ content: file})
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            return url
        } catch (error) {
            console.log("Error uploading the file to IPFS")
        }
    }

    const createNFT = async(formInput, fileUrl, router) => {
        const { name, description, price } = formInput
        if(!name || !description || !price || !fileUrl)
            console.log("Data is missing")

        const data = JSON.stringify({ name, description, image: fileUrl })

        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`

            await createSale(url, price)
        } catch (error) {
            console.log(error)
        }
    }

    const createSale = async(url, inputPrice, isReselling, id) => {
        try {
            const price = ethers.utils.parseUnits(inputPrice, "ether")
            const contract = await connectWithSmartContract()

            const listingFee = await contract.getListingFee()
            const transaction = !isReselling
                ? await contract.createToken(url, price, {
                    value: listingFee.toString()
                })
                : await contract.resellToken(id, price, {
                    value: listingFee.toString(),
                })

                await transaction.wait()
        } catch (error) {
            console.log()
        }
    }

    const fetchNFTs = async() => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider)

            const data = await contract.fetchMarketItems()

            const items = await Promise.all(
                data.map(
                    async({tokenId, seller, owner, price: unformattedPrice}) => {
                        const tokenURI = await contract.tokenURI(tokenId)

                        const {
                            data: {image, name, description}
                        } = await axios.get(tokenURI)
                        const price = ethers.utils.formatUnits(
                            unformattedPrice.toString(),
                            "ether"
                        )

                        return {
                            price,
                            tokenId: tokenId.toNumber(),
                            seller,
                            owner,
                            image,
                            name,
                            description,
                            tokenURI
                        }
                    }
                )
            )

            return items
        } catch (error) {
            console.log("Error while fetching NFTs")
        }
    }

    const fetchMyOrListedNFTs = async(type) => {
        try {
            const contract = await connectWithSmartContract()
            const data = 
            type == "FetchItemsListed" 
            ? await contract.fetchItemsListed() 
            : await contract.fetchMyNFTs() 

            const items = await Promise.all(
                data.map(async ({tokenId, seller, owner, price: unformattedPrice}) => {
                    const tokenURI = await contract.tokenURI(tokenId)
                    const {
                        data: {image, name, description}
                    } = await axios.get(tokenURI)
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    )

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI
                    }
                })
            )

            return items
        } catch (error) {
            console.log("Error while fetching NFTs")
        }
    }

    const buyNFT = async(nft) => {
        try {
            const contract = await connectWithSmartContract
            const price = ethers.utils.parseUnits(nft.price.toString(), "ether")

            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price
            })

            await transaction.wait()
        } catch (error) {
            console.log("Error while buing NFT")
        }
    }

    return(
        <NFTMarketplaceContext.Provider 
            value={{
                checkIfWalletIsConnected,
                connectWallet,
                uploadToIPFS,
                createNFT,
                fetchNFTs,
                fetchMyOrListedNFTs,
                buyNFT,
                currentAccount
            }}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
})