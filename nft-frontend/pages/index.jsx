import React, { useState, useEffect, useContext } from "react";
import Head from "next/head"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

export default function Home() {
  const { checkContract } = useContext(NFTMarketplaceContext)

  useEffect(() => {
    checkContract()
  },[])
  return (
    <div>
      <Head>
        <title>NFT Marketplace</title>
      </Head>
    </div>
  )
}