import React, { useState, useCallback, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { useDropzone } from 'react-dropzone'

import Image from 'next/image'

export default function UserBackgroundDropzone () {
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
      <div className='outline-none w-screen h-80 bg-blue-500 cursor-pointer focus:outline-none shadow-lg shadow-grey-700/50'>
            {imageUrl &&
            <Image 
                src={imageUrl}
                className="object-cover w-screen h-80 "
                width={500} height={500} alt='NFT'/>
            }
      </div>
    </div>
  )
}