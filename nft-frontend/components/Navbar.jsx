import React, { useContext } from "react";
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

export default function Navbar(){
    const {  currentAccount, connectWallet } = useContext(NFTMarketplaceContext);

    return(
        <nav className=" py-4 bg-gray-100 shadow-lg text-2xl">
            
            <div className="flex justify-between items-center ml-10 mr-10"> 
                {/* LOGO */}
                <Link className='flex items-center space-x-5' href="/">
                    <svg className='w-11 h-11'>
                        <FontAwesomeIcon icon={solid('store')} className='text-indigo-500'/>
                    </svg>
                    <span className="font-nf    tName text-3xl text-transparent bg-clip-text gradient">NFT Marketplace</span>
                </Link>

                {/* LINK SEARCHBAR*/}
                <div className="flex items-center">
                    <ul className='flex items-center space-x-5 px-7'>
                        <li>
                            <Link 
                                href="marketplace" 
                                className="text-transparent bg-clip-text hover:gradient bg-indigo-500">
                                Marketplace
                            </Link>
                        </li>
                        {currentAccount != "" ? (
                            <li>
                                <Link
                                    href="create-nft" 
                                    className="text-transparent bg-clip-text hover:gradient bg-indigo-500">
                                    Create Nft
                                </Link>
                            </li>
                        ):""}
                    </ul>

                    <div className="flex items-center group">
                        <svg className='w-5 h-5 absolute ml-3'>
                            <FontAwesomeIcon icon={solid('magnifying-glass-dollar')} className='text-indigo-500 group-focus:outline-none'/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search"
                            className="border-2 border-indigo-500 rounded-2xl pr-2 pl-10 py-0 text-indigo-900 leading-tight focus:outline-none focus:border-pink-500" 
                        />
                    </div>
                </div>

                {/* WALLET / PROFILE */}
                <div className='items-center flex space-x-5'>
                    {currentAccount == "" ? (
                        <button className='flex bg-transparent' onClick={()=>connectWallet()}>
                            <svg className='w-10 h-10'>
                                <FontAwesomeIcon icon={solid('wallet')} className='text-indigo-500 hover:text-pink-500'/>
                            </svg>
                        </button>
                    ) : (
                        <Link href="user" className='flex'>
                            <svg className='w-9 h-9'>
                                <FontAwesomeIcon icon={solid('user-secret')} className='text-indigo-500 hover:text-pink-500'/>
                            </svg>
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    )
}


