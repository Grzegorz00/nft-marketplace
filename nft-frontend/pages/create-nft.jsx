import React, { useState, useEffect, useContext } from "react";
import Form from '../components/UploadNFT'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

export default function CreateNFT() {
  const { uploadToIPFS, createNFT } = useContext(NFTMarketplaceContext);

  return (
    <Form uploadToIPFS={uploadToIPFS} createNFT={createNFT} />
  )
}
