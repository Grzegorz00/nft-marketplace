import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import CartNFT from './CartNFT'


export default function Dropzone ({uploadToIPFS, setFileUrl, name, description, price}) {
    const [imageUrl, setImageUrl] = useState(null);

    const onDrop = useCallback(async (acceptedFile) => {
      const url = await uploadToIPFS(acceptedFile[0]);
      setFileUrl(url);
      setImageUrl(url);
    })

    const { getRootProps, getInputProps } = useDropzone({onDrop})
      
      return (
          <div{...getRootProps()}>
            <input{...getInputProps()} />
            <div>
              <label
                className="flex justify-center w-full h-32 transition gradient-200 border-2 border-indigo-400 border-dashed rounded-md appearance-none cursor-pointer hover:border-indigo-600 focus:outline-none">
                <span className="flex items-center space-x-12">
                      <svg className='w-11 h-11 absolute'>
                          <FontAwesomeIcon icon={solid('cloud-arrow-up')} className='text-indigo-600'/>
                      </svg>
                    <span className="font-medium text-indigo-900">
                        Drop files to Attach
                    </span>
                </span>
            </label>
          </div>
          {imageUrl && 
            (
              <CartNFT
                name={name}
                description={description}
                price={price}
                fileUrl={imageUrl}
              />
            )
          }  
        </div>
      )
    }