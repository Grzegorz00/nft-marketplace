import {useState, useEffect, useContext} from "react"
import ReactDOM from "react-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import router from "next/router";
import Image from "next/image"

export default function SellWindow({showWindow, onClose, nft}){
    const [isBrowser, setIsBrowser] =  useState(false)
    const [price, setPrice] = useState("")
    const { createSale } = useContext(NFTMarketplaceContext)
    const { buyNFT } = useContext(NFTMarketplaceContext)
    const [data, setData] = useState([]);
    const ethereumExchangeRate = data?.map((eth) => eth.current_price)
    const priceDollars = (ethereumExchangeRate * (nft.sold ? price : nft.price)).toFixed(2)
    
    
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        useGrouping: true,
      });

    useEffect(() => {
        fetchData();
        setIsBrowser(true);
    }, []);
    const handleCLose = (e) => {
        e.preventDefault();
        onClose();
    }

    async function fetchData() {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        const data = await res.json()
        setData(data);
    }


    function transactWindow(){
        return(
            <div className="w-full h-full flex justify-center items-center bg-center left-0 top-0 bg-black/70 fixed">
                <div className="w-500 h-600 rounded-xl bg-gradient-to-b from-white via-indigo-100 to-white relative ">
                    
                    <div className="relative flex justify-center items-center mt-4 mb-4 pb-4 border-b-2 border-indigo-500">
                        <div>
                            <p className="font-custom text-4xl text-transparent bg-clip-text gradient">{nft.name}</p>
                        </div>

                        <div className="right-0 bottom-6 group px-1 py-1 absolute">
                            <button className="bg-transparent rounded-full py-2 px-2 group-hover:bg-red-500" onClick={handleCLose}>
                                <svg className='w-6 h-6'>
                                        <FontAwesomeIcon icon={solid('xmark')} className='text-indigo-900 group-hover:text-white'/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="grid justify-center pt-4">
                        <div className="rounded-xl overflow-hidden bg-white shadow-cyan-500/50 shadow-lg">
                            <Image
                                src={nft.fileUrl} 
                                width={400} height={400}
                                alt="NFT"
                                className="object-cover w-72 h-72 object-top"
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-0 w-full">

                        <div className="border-t-2 border-r-2 border-l-2 border-indigo-500">
                            <div className="flex items-center">
                                <div className="flex items-center space-x-1 bg-indigo-400 py-3">
                                    <p className="text-white text-2xl pl-3">ETH</p>
                                    <svg className='w-5 h-5'>
                                        <FontAwesomeIcon icon={brands('ethereum')} className='text-white'/>
                                    </svg>
                                </div>

                                {(() => {
                                    if (nft.sold.toString() == "true") {
                                        return ( sellView())
                                    } 
                                    else {
                                        return ( buyView())
                                    }
                                })()}
                            </div>

                            <div className="flex items-center border-t-2 border-indigo-500">
                                <div className="flex items-center space-x-1 bg-indigo-400 py-3">
                                    <p className="text-white text-2xl pl-3">USD</p>
                                    <svg className='w-5 h-5'>
                                        <FontAwesomeIcon icon={solid('dollar-sign')} className='text-white'/>
                                    </svg>
                                </div>

                                <p className="text-indigo-900 text-xl ml-4">{formatter.format(priceDollars)}</p>
                            </div>
                        </div>

                        {(() => {
                            if (nft.sold.toString() == "true") {
                                return ( sellButton())
                            } 
                            else {
                                return ( buyButton())
                            }
                         })()}
                    </div>

                </div>
            </div>
        )
    }

    function sellView(){
        return(                                
        <input 
            className="w-full outline-none bg-transparent text-indigo-900 text-xl ml-4" 
            type="text" 
            placeholder="Asset Price"
            onChange={(e) => setPrice(e.target.value)}
        />
        )
    }

    function buyView(){
        return(
            <p className="text-indigo-900 text-xl ml-4">{nft.price}</p>
        )
    }

    function sellButton(){
        return(
        <div className="group w-full">
            <button 
                className="w-full border-2 border-indigo-500 rounded-b-lg p-3 group-hover:bg-cyan-100 group-hover:border-cyan-600"
                onClick={() => createSale(nft.fileUrl, price, true, nft.tokenId, router)}>
                <div className="flex items-center justify-center space-x-3">

                    <p className="text-indigo-900 text-3xl group-hover:text-cyan-900">Sell</p>
                    
                    <svg className='w-10 h-10 ml-2'>
                        <FontAwesomeIcon icon={solid('gavel')} className='text-indigo-900 group-hover:text-cyan-900'/>
                    </svg>
                </div>
            </button>
        </div>
        )
    }

    function buyButton(){
        return(
        <div className="group w-full p-0 mb-01">
            <button 
                className="w-full border-2 border-indigo-500 rounded-b-lg p-3 group-hover:text-pink-600 group-hover:bg-pink-50 group-hover:border-pink-600"
                onClick={() => buyNFT(nft, router)}>
                <div className="flex items-center justify-center space-x-3">
                    <svg className='w-10 h-10 ml-2'>
                            <FontAwesomeIcon icon={solid('sack-dollar')} className='text-indigo-900 group-hover:text-pink-900'/>
                    </svg>

                    <p className="text-indigo-900 text-3xl group-hover:text-pink-900">Buy</p>
                </div>
            </button>
        </div>
        )
    }

    const transactWindowContent = showWindow? (
        transactWindow()
    ) : null; 
    
    if(isBrowser){
        return ReactDOM.createPortal(
            transactWindowContent,
            document.getElementById("transact-window-root")
        )
    }
    else {
        return null;
    }
}