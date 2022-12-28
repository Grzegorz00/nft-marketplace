import React, { useContext } from "react";
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

export default function Navbar(){
    const {  currentAccount, connectWallet } = useContext(NFTMarketplaceContext);

    return(
        <nav className=" py-4 bg-gray-100 shadow-lg text-2xl">
            
            <div className="flex justify-between items-center mr-10 ml-10"> 
                {/* LOGO */}
                <Link className='flex items-center space-x-5' href="/">
                    <svg className='w-11 h-11'>
                        <FontAwesomeIcon icon={solid('store')} className='text-indigo-500'/>
                    </svg>
                    <span className="font-custom text-3xl text-transparent bg-clip-text gradient">NFT Marketplace</span>
                </Link>

                <div className="flex items-center mr-72">
                    <ul className='flex items-center space-x-5'>
                        <li>
                            <Link 
                                href="marketplace" 
                                className="text-transparent bg-clip-text hover:gradient focus:gradient bg-indigo-500 font-custom">
                                Marketplace
                            </Link>
                        </li>
                        {currentAccount != "" ? (
                            <li>
                                <Link
                                    href="create-nft" 
                                    className="text-transparent bg-clip-text hover:gradient focus:gradient bg-indigo-500 font-custom">
                                    Create Nft
                                </Link>
                            </li>
                        ):""}
                    </ul>
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
                        <div className="group">
                            <Link href="user" className='flex'>
                                <svg className='w-8 h-8 group-hover:bg-transparent'>
                                    <FontAwesomeIcon icon={solid('user')} className='text-indigo-500 group-hover:text-pink-500'/>
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    )
}


