import React, { useState, useEffect, useContext } from "react";
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { Loader } from "../components/componentsIndex";

export default function Home() {
  const { checkIfWalletIsConnected } = useContext(NFTMarketplaceContext)
  const [nfts, setNfts] = useState([])


  useEffect(() => {
    checkIfWalletIsConnected
  },[])

  return (
    <div>
      { nfts.length == 0 ? <Loader /> :
        <h1>Home</h1>
      }
    </div>
  )
}