import React, { useState, useEffect, useContext } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import Router from "next/router"
import axios from "axios"
import {create as ipfsHttpClient} from 'ipfs-http-client'

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
const connectingWithSmartContract = async() => {
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

    const checkContract = async() => {
        const contract = await connectingWithSmartContract()
        console.log()
    }
    return(
        <NFTMarketplaceContext.Provider 
            value={{
                children,
                checkContract
            }}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
})