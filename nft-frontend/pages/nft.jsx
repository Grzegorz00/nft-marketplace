import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { TransactWindow } from "../components/componentsIndex";

export default function DetailsNFT() {
    const router = useRouter();
    const [showWindow, setWindow] = useState(false)
    const [nft, setNft] = useState({});
    const [activeDrop, setActiveDrop] = useState(false)
    const [data, setData] = useState([]);
    const [ethereumExchangeRate, setEthereumExchangeRate] = useState('')
    const priceDollars = (ethereumExchangeRate * nft.price).toFixed(2)

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        useGrouping: true,
      });


    useEffect(() => {
        fetchData();
        if (!router.isReady) return;
        setNft(router.query);
    }, [router.isReady]);

    useEffect(() => {
        if(data)
            setEthereumExchangeRate(data.map((eth) => eth.current_price))
    },[data])


    async function fetchData() {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        if(!res.ok){
            setData([]);
            return
        }
        const data = await res.json()
        setData(data);
    }

    function sellButton(){
        return(
                <div className="border-indigo-200 border-2 rounded-lg bg-indigo-100">
                   
                    <div className='px-5 pb-3 pt-7 flex items-center justify-between'>

                        <div className="text-4xl md:text-2xl text-indigo-900">
                            <p>Bought for</p>
                        </div>
                        
                        <div>
                            <div className="flex items-center">
                                <p className="text-indigo-900 text-3xl md:text-xl">{formatter.format(nft.price)} ETH</p>
                                <svg className='w-5 h-6 '>
                                        <FontAwesomeIcon icon={brands('ethereum')} className='text-indigo-500'/>
                                </svg>
                            </div>

                            <div className="flex items-center"> 
                                <p className="text-indigo-700 text-lg md:text-sm">{formatter.format(priceDollars)}</p>
                                <svg className='w-3 h-3'>
                                        <FontAwesomeIcon icon={solid('dollar-sign')} className='text-indigo-400'/>
                                </svg> 
                            </div>
                        </div>
                    </div>
                    <div className="px-5 pb-3">
                    <button
                        onClick={() => setWindow(true)}
                        className="px-4 py-5 w-full rounded-xl bg-cyan-600 hover:scale-105 duration-200 items-center flex justify-center text-white text-2xl hover:bg-cyan-400">
                        Sell
                        <svg className='w-7 h-7 ml-2'>
                            <FontAwesomeIcon icon={solid('gavel')} className='text-white'/>
                        </svg>
                    </button>
                    <TransactWindow showWindow={showWindow} nft={nft} onClose={() => setWindow(false)}/>
                    </div>
                </div>
        )
    }

    function buyButton(){
        return(
                <div className="border-indigo-200 border-2 rounded-lg bg-indigo-100">
                   
                    <div className='px-5 pb-3 pt-7 flex items-baseline space-x-4'>
                        <div className="flex items-center">
                            <p className="text-indigo-900 text-3xl md:text-xl">{formatter.format(nft.price)} ETH</p>
                            <svg className='w-5 h-6 '>
                                    <FontAwesomeIcon icon={brands('ethereum')} className='text-indigo-500'/>
                            </svg>
                        </div>

                        <div className="flex items-center"> 
                            <p className="text-indigo-700 text-xl md:text-base">{formatter.format(priceDollars)}</p>
                            <svg className='w-3 h-3'>
                                    <FontAwesomeIcon icon={solid('dollar-sign')} className='text-indigo-400'/>
                            </svg> 
                        </div>
                    </div>
                    <div className="px-5 pb-3">
                    <button
                        onClick={() => setWindow(true)}
                        className="px-4 py-5 w-full rounded-xl bg-pink-500 hover:scale-105 duration-200 items-center flex justify-center text-white text-2xl hover:bg-pink-400">
                        Buy
                        <svg className='w-7 h-7 ml-2'>
                            <FontAwesomeIcon icon={solid('sack-dollar')} className='text-white'/>
                        </svg>
                    </button>
                    <TransactWindow showWindow={showWindow} nft={nft} onClose={() => setWindow(false)}/>
                    </div>
                </div>
        )
    }



    return (    
    <div className="container px-5 py-24 mx-auto md:py-12">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image 
            src={nft.fileUrl} 
            width={450} height={450}
            alt="NFT"
            className="lg:w-1/2 md:h-650 h-728 w-full object-cover object-center rounded border border-gray-200"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-xl title-font text-gray-500 tracking-widest">NAME</h2>
                <h1 className="text-indigo-900 text-3xl font-custom">{nft.name}</h1>
                
                <div className="rounded-lg overflow-hidden border-2 border-indigo-200 bg-indigo-50 md:text-base text-lg my-4">
                        <div className='group relative'>
                            <button 
                                className='px-4 py-3 border-b-2 border-indigo-200 flex items-center bg-white duration-50 w-full'
                                onClick={() => setActiveDrop(!activeDrop)}>

                                <svg className='w-5 h-5'>
                                    <FontAwesomeIcon icon={solid('book-open')} className='text-indigo-500'/>
                                </svg>

                                <p className="text-indigo-900 font-bold px-3">Description</p>

                                <svg className={`duration-50 w-4 h-5 absolute right-5 ${activeDrop ? 'rotate-180' : ' '}`}>
                                    <FontAwesomeIcon icon={solid('chevron-down')} className='text-indigo-300 group-hover:text-indigo-500'/>
                                </svg>

                            </button>

                            <div className={`p-4 bg-indigo-50 border-b-2 border-indigo-200 ${activeDrop ? '' : 'hidden'}`}>
                                <p className="text-indigo-900 md:text-sm">{nft.description}</p> 
                            </div>

                        </div>

                        <div className="px-4 py-3 flex items-center border-b-2 border-indigo-200 bg-white">
                            <svg className='w-5 h-5'>
                                <FontAwesomeIcon icon={solid('list')} className='text-indigo-500'/>
                            </svg>
                            <p className="text-indigo-900 font-bold px-3">Details</p>
                        </div>

                        <div className='p-4 text-indigo-900 md:text-sm'>
                            <table class="table-fixed">
                                <tbody>
                                    <tr>
                                        <td className="font-bold pr-16 md:pr-12">ID</td>
                                        <td>{nft.tokenId}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Owner</td>
                                        <td>{nft.owner}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Seller</td>
                                        <td>{nft.seller}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Author</td>
                                        <td>{nft.creator}</td>
                                    </tr>
                                </tbody>
                            </table>    
                        </div>
                    </div>
               
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
    )
}
