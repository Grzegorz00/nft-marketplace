import React, { useState, useCallback, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

export default function UserAvatarDropzone () {
    const { uploadToIPFS } = useContext(NFTMarketplaceContext);
    const [imageUrl, setImageUrl] = useState(null)

    const onDrop = useCallback(async (acceptedFile) => {
        const url = await uploadToIPFS(acceptedFile[0])
        setImageUrl(url)
    })

  const { getRootProps, getInputProps } = useDropzone({onDrop})

  return (
    <div{...getRootProps()}>
      <input{...getInputProps()} />
      <div className='overflow-hidden outline-none w-72 h-72 rounded-full hover:bg cursor-pointer focus:outline-none border-4 border-white shadow-grey-700/50 shadow-lg'>
            {imageUrl &&
            <Image 
                src={imageUrl}
                className="object-cover w-screen h-80 hover:brightness-50"
                width={500} height={500} alt='NFT'/> }
      </div>
    </div>
  )
}