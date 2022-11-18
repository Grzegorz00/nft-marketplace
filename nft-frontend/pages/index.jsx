import React, { useState, useEffect, useContext } from "react";
import Head from "next/head"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

export default function Home() {
  const { checkIfWalletIsConnected } = useContext(NFTMarketplaceContext)

  useEffect(() => {
    checkIfWalletIsConnected
  },[])

  return (
    <div>
      <Head>
        <title>NFT Marketplace</title>
      </Head>
    </div>
  )
}