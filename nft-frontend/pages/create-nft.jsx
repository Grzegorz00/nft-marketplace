import React, { useState, useEffect, useContext } from "react";
import UploadNFT from '../components/UploadNFT'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotLoggedIn from "../components/NotLoggedIn";
import {
    solid,
    regular,
    brands,
    icon
  } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function CreateNFT() {
  const { uploadToIPFS, createNFT, currentAccount, connectWallet } = useContext(NFTMarketplaceContext);

  if (currentAccount == "") return (<NotLoggedIn />)
  return (
    <UploadNFT uploadToIPFS={uploadToIPFS} createNFT={createNFT} />
  )
}
