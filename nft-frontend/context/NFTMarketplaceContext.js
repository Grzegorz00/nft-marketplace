import React, { useState, useEffect, useContext } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import Router from "next/router"
import axios from "axios"
import {create as ipfsHttpClient} from 'ipfs-http-client'

// const test = props.host
const projectId = process.env.PROJECT_ID
const projectSecretKey = process.env.PROJECT_SECRET_KEY
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`

const subdomain = process.env.SUBDOMAIN

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  })

// Internal import
import { NFTMarketplaceAdress, NFTMarketplaceABI } from "./constants"

// Fetch smart contract
const fetchContract = (providerOrSigner) => 
    new ethers.Contract(
        NFTMarketplaceAdress,
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
        console.log("Error while connecting with the smart contract: " + error)
    }
}

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({children}) => {

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

    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add(file)
            const url = `${subdomain}/ipfs/${added.path}`
            return url
        } catch (error) {
            console.log("Error uploading the file to IPFS", error)
        }
    }

    const createNFT = async(name, description, price, fileUrl, router) => {
        if(!name || !description || !price || !fileUrl)
            console.log("Data is missing")

        const data = JSON.stringify({ name, description, price, fileUrl: fileUrl })

        try {
            const added = await client.add(data)
            const url = `https://infura-ipfs.io/ipfs/${added.path}`

            await createSale(url, price)
            router.push('/')
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
                            data: {fileUrl, name, description}
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
                            fileUrl,
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

    useEffect(() => {
        if (currentAccount) {
          fetchNFTs();
        }
      }, []);

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
                        data: {fileUrl, name, description}
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
                        fileUrl,
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

    useEffect(() => {
        fetchMyOrListedNFTs();
      }, []);

    const buyNFT = async(nft, router,) => {
        try {
            const contract = await connectWithSmartContract()
            const price = ethers.utils.parseUnits(nft.price.toString(), "ether")

            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price
            })

            await transaction.wait()
            router.push("/")
        } catch (error) {
            console.log("Error while buing NFT: " + error)
        }
    }

    return(
        <NFTMarketplaceContext.Provider 
            value={{
                checkIfWalletIsConnected,
                connectWallet,
                uploadToIPFS,
                createNFT,
                createSale,
                fetchNFTs,
                fetchMyOrListedNFTs,
                buyNFT,
                currentAccount
            }}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
}