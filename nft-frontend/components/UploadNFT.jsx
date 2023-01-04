import React, { useState } from "react"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropzone } from "../components/componentsIndex"
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useForm } from 'react-hook-form'

export default function UploadNFT({ uploadToIPFS, createNFT }){
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [fileUrl, setFileUrl] = useState(null)
    const router = useRouter()
    const {register, handleSubmit, formState:{errors}} = useForm()
    
    return(
        <div className='justify-center flex mt-10'>
            <form className="w-full max-w-2xl" 
                onSubmit={handleSubmit(() => {
                    createNFT(name, description, price, fileUrl, router);
                  })}>
                    
                <div className="flex">
                    {/* NAME & PRICE */}
                    <div className="w-full md:w-2/3 mb-4 pr-3">
                        <input
                            {...register('name', {required:true, minLength:3, maxLength:30})}
                            className={`${errors.name ? 'inputFormInvalid' : 'inputForm'}`}
                            type="text" 
                            placeholder="Asset Name"
                            onChange={(e) => setName(e.target.value) }
                        />
                        {errors.name && errors.name.type == "required" && <p className="text-red-500"> Name cannot be blank</p>}
                        {errors.name && errors.name.type == "minLength" && <p className="text-red-500"> Name must be at least 3 characters long</p>}
                        {errors.name && errors.name.type == "maxLength" && <p className="text-red-500"> Name cannot be longet than 30 characters</p>}
                    </div>
                    
                    <div className="w-full md:w-1/3">
                        <svg className='w-8 h-8 absolute ml-3 mt-2'>
                            <FontAwesomeIcon icon={brands('ethereum')} className={`${errors.price ? 'text-red-300' : 'text-indigo-300'}`}/>
                        </svg>

                        <input
                            {...register('price', {required:true,  pattern:{value:/^\d+(\.\d+)?$/}, min:0.00001, max:10000})}
                            className={`bg-red px-4 pl-12 ${errors.price ? 'inputFormInvalid' : 'inputForm'}`}
                            type="text"
                            placeholder="Asset Price"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {errors.price && errors.price.type == "required" && <p className="text-red-500">Price cannot be blank</p>}
                        {errors.price && errors.price.type == "pattern" && <p className="text-red-500">Wrong input number</p>}
                        {errors.price && errors.price.type == "min" && <p className="text-red-500">Price must be at least 0.00001 eth</p>}
                        {errors.price && errors.price.type == "max" && <p className="text-red-500">Price cannot be higher than 10000 eth</p>}

                    </div>
                </div>

                {/* DESCRIPTION */}
                <div className="flex flex-wrap">
                    <div className="w-full">
                        <textarea
                            {...register('description', {required:true, minLength:3, maxLength:1000})} 
                            rows="5"
                            className={`placeholder:text-center placeholder:p-12 ${errors.description ? 'inputFormInvalid' : 'inputForm'}`}  
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                        />
                        {errors.description && errors.description.type == "required" && <p className="text-red-500">Description cannot be blank</p>}
                        {errors.description && errors.description.type == "minLength" && <p className="text-red-500">Description must be at least 3 characters long</p>}
                        {errors.description && errors.description.type == "maxLength" && <p className="text-red-500">Description cannot be longer than 1000 characters</p>}
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