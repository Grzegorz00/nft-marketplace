import React, { useState, useEffect, useContext } from "react";
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

export default function Home() {
  const { checkIfWalletIsConnected } = useContext(NFTMarketplaceContext)

  useEffect(() => {
    checkIfWalletIsConnected
  },[])

  return (
    <div className="">
    </div>
  )
}
