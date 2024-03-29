import {useState } from 'react'
import Image from "next/image"
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { TransactWindow } from './componentsIndex';

export default function CartNFT({nftDetails, cardSize}){
    const [showWindow, setWidnow] = useState(false)
    
    return(
        <div className={`flex justify-center ${cardSize == 'sm' ? 'w-52 h-360' : 'w-80 h-472'}`}>
            <div className="rounded-xl overflow-hidden group shadow-lg shadow-cyan-500/50">
                <Link href={typeof(nftDetails.sold) === "undefined" ? "" : { pathname: "/nft", query: nftDetails}}>
                    <Image src={nftDetails.fileUrl}
                        className={`object-cover transition-transform duration-300 group-hover:scale-110 object-top ${cardSize == 'sm' ? 'h-52 w-52' : 'h-80 w-80'}`}
                        width={500} height={500} alt='NFT'/>
                    <div 
                        className="p-4 relative bg-white">
                        <p className={`truncate text-2xl text-indigo-900 font-custom ${cardSize == 'sm' ? 'text-lg' : 'text-2xl'}`}>{nftDetails.name}</p>
                        <p className="text-gray-500 truncate">{nftDetails.description}</p>
                    </div>
                </Link>

                <div className='py-4 gradient-200 rounded-b-xl relative'>
                    <div className='flex items-center space-x-1 relative px-4'>
     
                        <p className={`px-0 text-indigo-900 ${cardSize == 'sm' ? 'text-lg font-bold' : 'text-2xl'}`}>{nftDetails.price} ETH</p>

                        <svg className='w-5 h-5'>
                            <FontAwesomeIcon icon={brands('ethereum')} className='text-indigo-500'/>
                        </svg>
                        {(() => {
                            if (nftDetails.sold == false) {
                                return (
                                    <button className="button-buy" onClick={() => setWidnow(true)}>Buy</button>
                                )
                            } 
                            else if (nftDetails.sold == true) {
                                return (
                                    <button className="button-sell" onClick={() => setWidnow(true)}>Sell</button>
                                )
                            }
                        })()}
                        <TransactWindow showWindow={showWindow} nft={nftDetails} onClose={() => setWidnow(false)}/>
                    </div>
                </div>
            </div> 
        </div> 
    )
}