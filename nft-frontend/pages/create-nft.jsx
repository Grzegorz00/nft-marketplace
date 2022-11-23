import React, { useState, useEffect, useContext } from "react";
import UploadNFT from '../components/UploadNFT'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

export default function CreateNFT() {
  const { uploadToIPFS, createNFT } = useContext(NFTMarketplaceContext);

  return (
    <UploadNFT uploadToIPFS={uploadToIPFS} createNFT={createNFT} />
  )
}
