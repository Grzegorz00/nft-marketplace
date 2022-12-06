import {useState, useEffect, useContext} from "react"
import ReactDOM from "react-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import router from "next/router";
import Image from "next/image"

export default function SellWindow({showSellWindow, onClose, nft}){
    const [isBrowser, setIsBrowser] =  useState(false)
    const [price, setPrice] = useState("")
    const { createSale } = useContext(NFTMarketplaceContext)

    useEffect(() => {
        setIsBrowser(true);
    }, []);
    const handleCLose = (e) => {
        e.preventDefault();
        onClose();
    }

    const sellWindowContent = showSellWindow? (
        <div className="absolute w-full h-full flex justify-center items-center bg-center left-0 top-0 bg-black/70">
            <div className="bg-slate-50 w-500 h-600 rounded-xl">
                
                <div className="flex justify-end group px-1 py-1">
                    <button className="bg-transparent rounded-full py-2 px-2 group-hover:bg-red-500" onClick={handleCLose}>
                        <svg className='w-6 h-6'>
                                <FontAwesomeIcon icon={solid('xmark')} className='text-cyan-600 group-hover:text-white'/>
                        </svg>
                    </button>
                </div>

                <div className="flex items-center justify-center space-x-3">
                    <p className="text-cyan-600 text-3xl">Sell</p>
                    <svg className='w-10 h-10 ml-2'>
                        <FontAwesomeIcon icon={solid('gavel')} className='text-cyan-600'/>
                    </svg>
                </div>

                <div className="grid justify-center pb-3 pt-4">
                    <div className="border-2 border-cyan-600 rounded-3xl overflow-hidden bg-white">
                        <Image
                            src={nft.fileUrl} 
                            width={400} height={400}
                            alt="NFT"
                            className="rounded-b-xl object-cover w-56 h-56 object-top"
                        />
                        <p className="text-center text-xl pt-2 text-cyan-600 font-nftName">{nft.name}</p>
                    </div>
                </div>

                <div className="px-11 pt-4">
                        <svg className='w-8 h-8 absolute ml-3 mt-3'>
                            <FontAwesomeIcon icon={brands('ethereum')} className='text-cyan-600/70'/>
                        </svg>
                    <input 
                        className="w-full rounded-3xl text-xl p-4 focus:outline-none border-2 bg-cyan-50 border-cyan-600/70 text-cyan-900 focus:border-cyan-500/70 pl-12" 
                        type="text" 
                        placeholder="Asset Price"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="px-11 pt-6 group">
                    <button 
                        className="w-full text-cyan-600 text-3xl rounded-3xl p-3 bg-cyan-50 group-hover:text-green-600 border-2 border-cyan-600/70 group-hover:bg-green-50 group-hover:border-green-600"
                        onClick={() => createSale(nft.fileUrl, price, true, nft.tokenId, router)}>
                        CONFIRM
                    </button>
                </div>
            </div>
            <div>



            </div>
        </div>
    ) : null;
    
    if(isBrowser){
        return ReactDOM.createPortal(
            sellWindowContent,
            document.getElementById("sell-window-root")
        )
    }
    else {
        return null;
    }
}