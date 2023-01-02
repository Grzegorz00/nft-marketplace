import React, { useState } from "react"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropzone } from "../components/componentsIndex"
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function UploadNFT({ uploadToIPFS, createNFT }){
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [fileUrl, setFileUrl] = useState(null)
    const router = useRouter()

    return(
        <div className='justify-center flex mt-10'>
            <form className="w-full max-w-2xl" 
                onSubmit={(event) => {
                    event.preventDefault();
                    createNFT(name, description, price, fileUrl, router);
                }}>
                <div className="flex">
                    
                    {/* NAME & PRICE */}
                    <div className="w-full md:w-2/3 mb-4 pr-3">
                        <input
                            className='inputForm'
                            type="text" 
                            placeholder="Asset Name"
                            onChange={(e) => 
                                setName(e.target.value)
                            }
                        />
                    </div>
                    
                    <div className="w-full md:w-1/3">
                        <svg className='w-8 h-8 absolute ml-3 mt-2'>
                            <FontAwesomeIcon icon={brands('ethereum')} className='text-indigo-300'/>
                        </svg>
                    <input 
                        className="inputForm px-4 pl-12 " 
                        type="text" 
                        placeholder="Asset Price"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    </div>
                </div>

                {/* DESCRIPTION */}
                <div className="flex flex-wrap">
                    <div className="w-full">
                        <textarea 
                            rows="5" 
                            className="block w-full focus:outline-none rounded p-4 border-2 border-indigo-200 text-indigo-900 focus:border-pink-300 gradient-100 placeholder:text-center placeholder:p-12"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                        />
                    </div>
                </div>

                <div className='mt-7 mb-5'>
                    <Dropzone
                        name={name}
                        description={description}
                        price={price}
                        uploadToIPFS={uploadToIPFS}
                        setFileUrl={setFileUrl}
                    />
                </div>
                
                {/* BUTTON */}
                <div className='flex flex-wrap'>
                    <button
                        type="submit"
                        className="block w-full font-mono mt-4 bg-indigo-400 text-white rounded p-4 shadow-lg hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                        >
                            Create NFT
                    </button>
                </div>
            </form>
        </div>
    )
}