import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

export default function DetailsNFT() {
    const router = useRouter();
    const { buyNFT } = useContext(NFTMarketplaceContext)
    const [nft, setNft] = useState({
        fileUrl: "",
        tokenId: "",
        name: "",
        owner: "",
        price: "",
        seller: "",
        description: "",
        sold: ""
      });
    useEffect(() => {
        if (!router.isReady) return;
        setNft(router.query);
    }, [router.isReady]);

    return (
        <div className="flex justify-center">
          <div className="flex items-start gap-10 mt-10"> 
                
            <Image 
                src={nft.fileUrl} width={450} height={450}
                className="object-cover h-fit w-auto max-w-md rounded-xl"
            />

            <div>
                <div className="rounded-xl border-2 border-indigo-200 mb-3">
                    <p className="text-3xl text-center font-bold text-indigo-900 py-3">
                                {nft.name}
                    </p>
                </div>

                <div className="rounded-xl overflow-hidden border-2 border-indigo-200 bg-indigo-50 text-xl mb-10">

                        <div className="px-4 py-3 border-b-2 border-indigo-200 flex items-center bg-white">
                            <svg className='w-5 h-5'>
                                <FontAwesomeIcon icon={solid('book-open')} className='text-indigo-500'/>
                            </svg>
                            <p className="text-indigo-900 font-bold px-3">Description</p>
                        </div>

                        <div className='p-4 bg-indigo-50 border-b-2 border-indigo-200'>
                            <p className="text-indigo-900">{nft.description}</p> 
                        </div>

                        <div className="px-4 py-3 border-b-2 border-indigo-200 flex items-center bg-white">
                            <svg className='w-5 h-5'>
                                <FontAwesomeIcon icon={solid('money-bill')} className='text-indigo-500'/>
                            </svg>
                            <p className="text-indigo-900 font-bold px-3">Price</p>
                        </div>

                        <div className='p-4 bg-indigo-50 border-b-2 border-indigo-200 flex items-center'>
                            <p className="text-indigo-900">{nft.price}</p>
                            <svg className='w-4 h-4 '>
                                <FontAwesomeIcon icon={brands('ethereum')} className='text-indigo-500'/>
                                </svg> 
                        </div>

                        <div className="px-4 py-3 flex items-center border-b-2 border-indigo-200 bg-white">
                            <svg className='w-5 h-5'>
                                <FontAwesomeIcon icon={solid('list')} className='text-indigo-500'/>
                            </svg>
                            <p className="text-indigo-900 font-bold px-3">Details</p>
                        </div>

                        <div className='p-4 text-indigo-900'>
                            <p>Token ID: {nft.tokenId}</p>
                            <p>Owner: {nft.owner}</p>  
                            <p>Seller: {nft.seller}</p>    
                        </div>
                    </div>
                    
                    <button
                        onClick={() => buyNFT(nft, router)} 
                        className="px-4 py-5 w-full rounded-xl bg-pink-500 hover:scale-110 duration-200 items-center flex justify-center text-pink-100 text-2xl hover:bg-pink-400">
                        <svg className='w-7 h-7 mr-2'>
                            <FontAwesomeIcon icon={solid('sack-dollar')} className='text-pink-100'/>
                        </svg>
                        Buy
                    </button>
            </div>


            </div>
        </div>
        // </div>
    )
}
