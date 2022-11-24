import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image'

export default function UploadNFT({ uploadToIPFS, createNFT }){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [fileUrl, setFileUrl] = useState(null);
    const router = useRouter();

    return(
        <div>
            <div className="flex justify-center">
                <div className="w-1/2 flex flex-col pb-12">
                    <input 
                    placeholder="Asset Name"
                    className="mt-8 border rounded p-4"
                    onChange={(e) => setName(e.target.value)}/>
                    <textarea
                    placeholder="Asset Description"
                    className="mt-2 border rounded p-4"
                    onChange={(e) => setDescription(e.target.value)}/>
                    <input
                    placeholder="Asset Price in Eth"
                    className="mt-2 border rounded p-4"
                    onChange={(e) => setPrice(e.target.value)}/>
                    <input
                    type="file"
                    name="Asset"
                    className="my-4"
                    onChange={async (e) => setFileUrl(await uploadToIPFS(e.target.files[0]))
                    }/>
                    {
                        fileUrl && (
                            <Image src={fileUrl} width={500} height={500} className="rounded mt-4"/>
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
    </div>
    )
}