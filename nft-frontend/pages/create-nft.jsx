import React, { useContext } from "react";
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { UploadNFT, NotLoggedIn } from '../components/componentsIndex'

export default function CreateNFT() {
  const {createNFT, currentAccount } = useContext(NFTMarketplaceContext);

  if (currentAccount == "") return (<NotLoggedIn />)
  return (
    <div className="min-h-screen">
      <UploadNFT createNFT={createNFT} />
    </div>
  )
}
