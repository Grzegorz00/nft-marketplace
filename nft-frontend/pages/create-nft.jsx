import React, { useContext } from "react";
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { UploadNFT, NotLoggedIn } from '../components/componentsIndex'

export default function CreateNFT() {
  const { uploadToIPFS, createNFT, currentAccount } = useContext(NFTMarketplaceContext);

  if (currentAccount == "") return (<NotLoggedIn />)
  return (
    <div>
      <UploadNFT uploadToIPFS={uploadToIPFS} createNFT={createNFT} />
    </div>
  )
}
