import React, { useState } from "react";
import { useRouter } from "next/router";

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
                            <img className="rounded mt-4" width="350" src={fileUrl} />
                        )
                    }
                    <button 
                    className="font-mono mt-4 bg-indigo-400 text-white rounded p-4 shadow-lg hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
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