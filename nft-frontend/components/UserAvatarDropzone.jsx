import React, { useState, useCallback, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { ADD_AVATAR } from '../queries/users';
import avatar from "../styles/images/avatar.BMP"

export default function UserAvatarDropzone ({avatarUrl}) {
  const [addImage] = useMutation(ADD_AVATAR)
  const { uploadToIPFS, currentAccount } = useContext(NFTMarketplaceContext);
  const [imageUrl, setImageUrl] = useState(avatarUrl)
  
  const onDrop = useCallback(async (acceptedFile) => {
      const url = await uploadToIPFS(acceptedFile[0])
      addImage({variables: {address: currentAccount, avatarUrl: url}})
      setImageUrl(url)
  })

  const { getRootProps, getInputProps } = useDropzone({onDrop})
  return (
    <div{...getRootProps()}>
      <input{...getInputProps()} />
      <div className='overflow-hidden outline-none w-72 h-72 rounded-full hover:bg cursor-pointer focus:outline-none border-4 border-white shadow-grey-700/50 shadow-lg'>
            <Image 
                src={imageUrl ? imageUrl : avatar}
                className="object-cover w-full h-72 hover:brightness-50"
                width={864} height={864} alt='NFT'/>
      </div>
    </div>
  )
}