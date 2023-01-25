import React, { useEffect, useContext, useState } from "react";
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { Loader } from "../components/componentsIndex";

import {IndexNftDisplay } from "../components/componentsIndex";

export default function Home() {
  const { checkIfWalletIsConnected } = useContext(NFTMarketplaceContext)
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    checkIfWalletIsConnected
  },[])

  return (
      <div className="mt-5 min-h-screen mx-10">
        <p className="text-4xl text-center text-indigo-500 font-bold">Explore Marketplace</p>
        <div className="mt-7">
          <IndexNftDisplay/>
        </div>
      </div>
    )
}