import React, { useState, useCallback, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { ADD_BACKGROUND } from '../queries/users';

import Image from 'next/image'

export default function UserBackgroundDropzone ({backgroundUrl}) {
  const [addImage] = useMutation(ADD_BACKGROUND)
  const { uploadToIPFS, currentAccount } = useContext(NFTMarketplaceContext);
  const [imageUrl, setImageUrl] = useState(backgroundUrl)

  const onDrop = useCallback(async (acceptedFile) => {
      const url = await uploadToIPFS(acceptedFile[0])
      addImage({variables: {address: currentAccount, backgroundUrl: url}})
      setImageUrl(url)
  })

  const { getRootProps, getInputProps } = useDropzone({onDrop})

  return (
    <div{...getRootProps()}>
      <input{...getInputProps()} />
      <div className='outline-none h-80 cursor-pointer focus:outline-none shadow-lg shadow-grey-700/50 group w-screen'>
            
            <div className='flex justify-center'>
                <svg className="absolute w-8 h-8 mt-40">
                  <FontAwesomeIcon icon={solid('plus')} className='text-transparent group-hover:text-white'/>
                </svg>
            </div>
            
            {imageUrl &&
              <Image 
                  src={imageUrl}
                  className="object-cover w-screen h-80 group-hover:brightness-50"
                  width={500} height={500} alt='NFT'/>
            }
            
      </div>
    </div>
  )
}