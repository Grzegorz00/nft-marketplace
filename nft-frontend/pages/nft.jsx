import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

export default function DetailsNFT({data}) {
    const router = useRouter();
    const { createSale } = useContext(NFTMarketplaceContext)
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

    const ethereumExchangeRate = data.map((eth) => eth.current_price)
    const priceDollars = (ethereumExchangeRate * nft.price).toFixed(2)

    function buyButton(){
            return(
                <div className="border-indigo-200 border-2 rounded-lg bg-indigo-100 w-160">
                        <div className='px-5 pt-7 pb-3 flex items-baseline space-x-3'>
                            <div className="flex items-center">
                                <p className="text-indigo-900 text-4xl">{nft.price} ETH</p>
                                <svg className='w-5 h-6 '>
                                        <FontAwesomeIcon icon={brands('ethereum')} className='text-indigo-500'/>
                                </svg>
                            </div>

                            <div className="flex items-center pb-3"> 
                                <p className="text-indigo-700 text-lg">{priceDollars}</p>
                                <svg className='w-3 h-3'>
                                        <FontAwesomeIcon icon={solid('dollar-sign')} className='text-indigo-400'/>
                                </svg> 
                            </div>
                        </div>
                    <div className="px-5 pb-3">
                        <button
                            onClick={() => buyNFT(nft, router)} 
                            className="px-4 py-5 w-full rounded-xl bg-pink-500 hover:scale-105 duration-200 items-center flex justify-center text-pink-100 text-2xl hover:bg-pink-400">
                            <svg className='w-7 h-7 mr-2'>
                                <FontAwesomeIcon icon={solid('sack-dollar')} className='text-pink-100'/>
                            </svg>
                            Buy
                        </button>
                    </div>
                </div>
        )
    }

    function sellButton(){
        return(
                <div className="border-indigo-200 border-2 rounded-lg bg-indigo-100 w-160">
                   
                    <div className='px-5 pb-3 pt-7 flex items-center justify-between'>

                        <div className="text-5xl text-indigo-900">
                            <p>Bought for</p>
                        </div>
                        
                        <div>
                            <div className="flex items-center">
                                <p className="text-indigo-900 text-4xl">{nft.price} ETH</p>
                                <svg className='w-5 h-6 '>
                                        <FontAwesomeIcon icon={brands('ethereum')} className='text-indigo-500'/>
                                </svg>
                            </div>

                            <div className="flex items-center"> 
                                <p className="text-indigo-700 text-lg">{priceDollars}</p>
                                <svg className='w-3 h-3'>
                                        <FontAwesomeIcon icon={solid('dollar-sign')} className='text-indigo-400'/>
                                </svg> 
                            </div>
                        </div>
                    </div>
                    <div className="px-5 pb-3">
                    <button
                        onClick={() => createSale(nft.fileUrl, nft.price + 1, true, nft.tokenId, router)}
                        className="px-4 py-5 w-full rounded-xl bg-cyan-600 hover:scale-105 duration-200 items-center flex justify-center text-white text-2xl hover:bg-cyan-400">
                        Sell
                        <svg className='w-7 h-7 ml-2'>
                            <FontAwesomeIcon icon={solid('gavel')} className='text-white'/>
                        </svg>
                    </button>
                    </div>
                </div>
        )
    }



    return (    
        <div className="flex justify-center">

          <div className="flex items-start gap-10 mt-10"> 
            <Image 
                src={nft.fileUrl} 
                width={450} height={450}
                alt="NFT"
                className="object-cover h-160 w-160 object-top mx-auto rounded-lg"
            />

            <div className="items-center">

                <div className="text-8xl text-indigo-900 pb-10 font-nftName">
                    {nft.name}
                </div>
                
                <div className="rounded-lg overflow-hidden border-2 border-indigo-200 bg-indigo-50 text-xl mb-10">
                        <div className="px-4 py-3 border-b-2 border-indigo-200 flex items-center bg-white">
                            <svg className='w-5 h-5'>
                                <FontAwesomeIcon icon={solid('book-open')} className='text-indigo-500'/>
                            </svg>
                            <p className="text-indigo-900 font-bold px-3">Description</p>
                        </div>

                        <div className='p-4 bg-indigo-50 border-b-2 border-indigo-200'>
                            <p className="text-indigo-900">{nft.description}</p> 
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

                    <div>
                    {(() => {
                            if (nft.sold == "false") {
                                return ( buyButton())
                            } 
                            else if (nft.sold == "true") {
                                return ( sellButton())
                            }
                    })()}
                </div> 
                    
            </div>


        </div>
    </div>
    )
}

export async function getServerSideProps(){
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    const data = await res.json()
    return {
         props : { data }
    }
  }