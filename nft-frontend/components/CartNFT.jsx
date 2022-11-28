import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { useContext } from 'react'
import { useRouter } from "next/router";

export default function CartNFT({name, description, price, fileUrl, type, nft, tokenId}){

    const { createSale } = useContext(NFTMarketplaceContext);
    const { buyNFT } = useContext(NFTMarketplaceContext)
    const router = useRouter();
    
    
    return(
        <div className="flex justify-center w-2xl">
            <div className="border shadow rounded-xl overflow-hidden group">
                <Image src={fileUrl}
                    className='h-80 w-80 object-cover transition-transform duration-300 group-hover:scale-110'
                    width={500} height={500} alt='NFT'/>
                <div className='p-4 relative bg-white'>
                    <p className="text-2xl text-indigo-900">{name}</p>
                    <p className="text-gray-500">{description}</p>
                </div>
                <div className='py-4 gradient-200 border-2 rounded-b-xl border-indigo-300 relative'>
                    <div className='flex items-center space-x-1 relative px-4'>
                        <p className="px-0 text-2xl text-indigo-900">{price} ETH</p>
                            <svg className='w-5 h-5 '>
                                 <FontAwesomeIcon icon={brands('ethereum')} className='text-indigo-500'/>
                            </svg>
                            {(() => {
                            if (type == "buy") {
                                return (
                                    <button className="button-buy-sell" 
                                        onClick={() => buyNFT(nft, router)}>Buy</button>
                                )
                            } 
                            else if (type == "sell") {
                                return (
                                    <button className="button-buy-sell" 
                                        onClick={() => createSale(fileUrl, price + 1, true, tokenId)}>Sell</button>
                                )
                            }
                         })()}
                    </div>
                </div>
            </div>  
        </div>
    )
}