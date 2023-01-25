import React, { useContext } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

export default function Navbar(){
    const router = useRouter();
    const currentRoute = router.pathname;
    const { currentAccount, connectWallet } = useContext(NFTMarketplaceContext);

    return(
        <nav className=" py-3 bg-gray-100 shadow-lg text-2xl">
            
            <div className="flex justify-between items-center mx-10"> 
                {/* LOGO */}
                <Link 
                    className='flex items-center space-x-5' 
                    href="/"
                >

                    <svg className='w-9 h-9'>
                        <FontAwesomeIcon icon={solid('store')} className='text-indigo-500'/>
                    </svg>
                    <span className="font-custom text-2xl text-transparent bg-clip-text gradient">NFT Marketplace</span>
                </Link>

                <div className="flex items-center mr-72">
                    <div className='flex items-center space-x-5'>
                    <Link href="marketplace"
                        className={currentRoute === "/marketplace" ? "linkActive" : "link"}>
                        Marketplace
                    </Link>
                        {currentAccount != "" ? (
                            <Link
                                href="create-nft" 
                                className={currentRoute === "/create-nft" ? "linkActive" : "link"}>
                                Create Nft
                            </Link>
                        ):""}
                    </div >
                </div>

                {/* WALLET / PROFILE */}
                <div className='items-center flex space-x-5'>
                    {currentAccount == "" ? (
                        <button className='flex bg-transparent' onClick={()=>connectWallet()}>
                            <svg className='w-9 h-9'>
                                <FontAwesomeIcon icon={solid('wallet')} className='text-indigo-500 hover:text-pink-500'/>
                            </svg>
                        </button>
                    ) : (
                        <div className="group">
                            <Link href="user" className='flex'>
                                <svg className='w-7 h-8 group-hover:bg-transparent'>
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