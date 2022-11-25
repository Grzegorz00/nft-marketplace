import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dropzone from './Dropzone'
import {
    solid,
    regular,
    brands,
    icon
} from '@fortawesome/fontawesome-svg-core/import.macro'

export default function UploadNFT({ uploadToIPFS, createNFT }){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [fileUrl, setFileUrl] = useState(null);
    const router = useRouter();
    const [image, setImage] = useState(null)

    return(
        <div className='justify-center flex mt-10'>
            <div className="w-full max-w-2xl font-mono">
                <div className="flex flex-wra">
                    
                    {/* NAME & PRICE */}
                    <div className="w-full md:w-2/3 mb-4 pr-3">
                        <input 
                            className="block w-full py-3 mb-3 p-4 rounded focus:outline-none border-2 border-indigo-200 text-indigo-900 focus:border-pink-300 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100" 
                            type="text" 
                            placeholder="Asset Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    
                    <div className="w-full md:w-1/3">
                        <svg className='w-8 h-8 absolute ml-3 mt-2'>
                            <FontAwesomeIcon icon={brands('ethereum')} className='text-indigo-300'/>
                        </svg>
                    <input 
                        className="block w-full py-3 px-4 mb-3 t rounded p-4 focus:outline-none border-2 border-indigo-200 text-indigo-900 focus:border-pink-300 pl-12 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100" 
                        type="text" 
                        placeholder="Asset Price"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    </div>
                </div>

                {/* dESCRIPTION */}
                <div className="flex flex-wrap">
                    <div className="w-full">

                        <label className="block uppercase tracking-wide text-indigo-900 text-xs font-bold mb-2">
                            Description
                        </label>

                        <textarea 
                            rows="5" 
                            className=" block w-full focus:outline-none rounded p-4 border-2 border-indigo-200 text-indigo-900 focus:border-pink-300 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100"
                            onChange={(e) => setDescription(e.target.value)}
                        />

                    </div>
                </div>

                <div className='mt-7 mb-5'>
                    <Dropzone
                        name={name}
                        description={description}
                        price={price}
                        setImage={setImage}
                        uploadToIPFS={uploadToIPFS}
                          />
                </div>
                
                {/* BUTTON */}
                <div className='flex flex-wrap'>
                    <button 
                        className="block w-full font-mono mt-4 bg-indigo-400 text-white rounded p-4 shadow-lg hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                        onClick={async () => {
                            createNFT(
                                name,
                                description,
                                price,
                                fileUrl,
                                router
                            )}
                        }>
                            Create NFT
                    </button>
                </div>
            </div>
        </div>
    )
}