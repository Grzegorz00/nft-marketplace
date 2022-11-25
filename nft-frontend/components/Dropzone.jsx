import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  solid,
  regular,
  brands,
  icon
} from '@fortawesome/fontawesome-svg-core/import.macro'


export default function Dropzone ({uploadToIPFS, setImage, name, description, price}) {

    const [fileUrl, setFileUrl] = useState(null);

    const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
    setImage(url);
    console.log(url);
    })

    const { getRootProps, getInputProps } = useDropzone({onDrop})
      
      return (
          <div className='max-w-2xl'{...getRootProps()}>
            <input className='max-w-2xl'{...getInputProps()} />
            <div className='max-w-2xl'>
              <label
                class="flex justify-center w-full h-32 transition gradient-200 border-2 border-indigo-400 border-dashed rounded-md appearance-none cursor-pointer hover:border-indigo-600 focus:outline-none">
                <span class="flex items-center space-x-12">
                <svg className='w-11 h-11 absolute'>
                            <FontAwesomeIcon icon={solid('cloud-arrow-up')} className='text-indigo-600'/>
                        </svg>
                    <span class="font-medium text-indigo-900">
                        Drop files to Attach
                    </span>
                </span>
            </label>
          </div>
          {fileUrl && (
            <div className="flex justify-center w-2xl">
              <div className="px-4">
                <div className="grid grid-cols-1 gap-4 pt-4">
                      <div className="border shadow rounded-xl overflow-hidden">
                        <Image src={fileUrl} width={500} height={500} alt='NFT'/>
                        <div className="p-4">
                          <p className="text-2xl">{name}</p>
                            <p className="text-gray-400">{description}</p>
                        </div>
                        <div className="p-4 bg-black">
                          <p className="text-2xl text-white">{price}</p>
                          <button className="button w-full">Buy</button>
                        </div>
                      </div>
                </div>
              </div>
            </div>
          )
            }   
        </div>
      )
    }

