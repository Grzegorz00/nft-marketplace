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
    const [ethereumExchangeRate, setEthereumExchangeRate] = useState('')
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


    function transactWindow(){
        return(
            <div className="w-full h-full flex justify-center items-center bg-center left-0 top-0 bg-black/70 fixed">
                <div className="w-500 rounded-xl bg-gradient-to-b from-white via-indigo-100 to-white">
                    
                    <div className="flex justify-between items-center mt-4 pb-4 border-b-2 border-indigo-500">
                        <div className="w-6 h-6">

                        </div>

                        <div className="flex-1">
                            <p className="font-custom text-2xl text-transparent bg-clip-text gradient break-words">{nft.name.trim()}</p>
                        </div>

                        <div className="right-0 bottom-6 group px-2">
                            <button className="bg-transparent rounded-full py-2 px-2 group-hover:bg-red-500" onClick={handleCLose}>
                                <svg className='w-6 h-6'>
                                        <FontAwesomeIcon icon={solid('xmark')} className='text-indigo-900 group-hover:text-white'/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="grid justify-center ">
                        <div className="overflow-hidden bg-white">
                            <Image
                                src={nft.fileUrl} 
                                width={500} height={500}
                                alt="NFT"
                                className="object-cover w-500 h-500 object-to bg-center"
                            />
                        </div>
                    </div>

                    <div className="w-full">

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
                                        return ( <p className="text-indigo-900 text-xl ml-4 ">{nft.price}</p> )
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

    function sellButton(){
        return(
        <div className="group w-full">
            <button 
                className="w-full border-2 border-indigo-500 rounded-b-lg p-3 group-hover:bg-cyan-100 group-hover:border-cyan-600"
                onClick={() => createSale(nft.fileUrl, price, true, nft.tokenId, router)}>
                <div className="flex items-center justify-center space-x-3">

                    <p className="text-indigo-900 text-3xl group-hover:text-cyan-900">Sell</p>
                    
                    <svg className='w-8 h-8 ml-2'>
                        <FontAwesomeIcon icon={solid('cart-shopping')} className='text-indigo-900 group-hover:text-cyan-900'/>
                    </svg>
                </div>
            </button>
        </div>
        )
    }

    function buyButton(){
        return(
        <div className="group w-full">
            <button 
                className="w-full border-2 border-indigo-500 rounded-b-lg p-3 group-hover:text-pink-600 group-hover:bg-pink-50 group-hover:border-pink-600"
                onClick={() => buyNFT(nft, router)}>
                <div className="flex items-center justify-center space-x-3">
                    <svg className='w-7 h-7 ml-2'>
                            <FontAwesomeIcon icon={solid('bolt')} className='text-indigo-900 group-hover:text-pink-900'/>
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