import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

    return(
        <div className="flex justify-center">
            <div className="w-1/2 flex flex-col pb-12">
                <input 
                    placeholder="Asset Name"
                    className="mt-8 rounded p-4 focus:outline-none border-2 border-indigo-200 text-indigo-900 focus:border-pink-200"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder="Asset Description"
                    className="mt-2 rounded p-4 focus:outline-none border-2 border-indigo-200 text-indigo-900 focus:border-pink-200"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className='flex items-center mt-2'>
                    <svg className='w-8 h-8 absolute ml-3'>
                        <FontAwesomeIcon icon={brands('ethereum')} className='text-indigo-300'/>
                    </svg>
                    <input
                        placeholder="Asset Price in Eth"
                        className="rounded p-4 focus:outline-none border-2 border-indigo-200 text-indigo-900 focus:border-pink-200 pl-12 "
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <input
                    type="file"
                    name="Asset"
                    className="my-4"
                    onChange={async (e) => setFileUrl(await uploadToIPFS(e.target.files[0]))
                    }
                />
                {
                    fileUrl && (
                        <Image src={fileUrl} width={500} height={500} alt='NFT' className="rounded mt-4"/>
                    )
                }
                <button 
                    className="button"
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
    )
}