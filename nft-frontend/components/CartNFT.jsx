import { useContext } from 'react'
import { useRouter } from "next/router";
import Image from "next/image"
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

export default function CartNFT({nftDetails, type}){

    const { createSale } = useContext(NFTMarketplaceContext);
    const { buyNFT } = useContext(NFTMarketplaceContext)
    const router = useRouter();
    
    return(
        <div className="flex justify-center w-2xl">
                <div className="border shadow rounded-xl overflow-hidden">
                    <Link href={type == "create" ? "" : { pathname: "/details-nft", query: nftDetails}} >
                        <Image src={nftDetails.fileUrl}
                            className='h-80 w-80 object-cover transition-transform duration-300 hover:scale-125'
                            width={500} height={500} alt='NFT'/>
                        <div className='p-4 relative bg-white'>
                            <p className="text-2xl text-indigo-900">{nftDetails.name}</p>
                            <p className="text-gray-500">{nftDetails.description}</p>
                        </div>
                    </Link>

                    <div className='py-4 gradient-200 border-2 rounded-b-xl border-indigo-300 relative'>
                        <div className='flex items-center space-x-1 relative px-4'>
                            <p className="px-0 text-2xl text-indigo-900">{nftDetails.price} ETH</p>
                                <svg className='w-5 h-5 '>
                                    <FontAwesomeIcon icon={brands('ethereum')} className='text-indigo-500'/>
                                </svg>
                                {(() => {
                                if (type == "buy") {
                                    return (
                                        <button className="button-buy-sell" onClick={() => buyNFT(nftDetails, router)}>Buy</button>
                                    )
                                } 
                                else if (type == "sell") {
                                    return (
                                        <button className="button-buy-sell" 
                                            onClick={
                                                () => createSale(nftDetails.fileUrl, nftDetails.price + 1, true, nftDetails.tokenId)
                                            }
                                        >
                                            Sell
                                        </button>
                                    )
                                }
                            })()}
                        </div>
                    </div>
                </div>  
            </div>
    )
}