import React, { useState, useEffect, useContext } from "react";
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

export default function Home() {
  const { checkIfWalletIsConnected } = useContext(NFTMarketplaceContext)

  useEffect(() => {
    checkIfWalletIsConnected
  },[])

  return (
    <div className="">
      <Head>
        <title>NFT Marketplace</title>
      </Head>
      <Navbar/>
    </div>
  )
}
