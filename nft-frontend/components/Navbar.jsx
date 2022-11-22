import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    solid,
    regular,
    brands,
    icon
  } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Navbar(){
    return(
<nav className="
    py-4
    bg-gray-100
    shadow-lg
    navbar navbar-expand-lg navbar-light
    font-mono
    text-2xl">
        <div className="container flex flex-wrap justify-between"> 

            {/* LOGO */}
            <div className='flex items-center'>
                <span class="self-center text-4xl text-pink-500 ml-20">NFT Marketplace</span>
                <svg className='w-14 h-14 absolute ml-5 pointer-events-auto'>
                    <FontAwesomeIcon icon={solid('store')} className='text-indigo-500'/>
                </svg>
            </div>

            {/* LINK */}
            <div className="space-x-5 px-3 items-center">
                <Link
                    href="/"
                    className="text-dark-400 hover:text-pink-500 text-indigo-500">
                    Home
                    </Link>
                <Link 
                    href="create-nft" 
                    className="text-dark-400 hover:text-pink-500 text-indigo-500">
                    Create Nft
                </Link>
                <Link 
                    href="marketplace" 
                    className="text-dark-400 hover:text-pink-500 text-indigo-500">
                    Marketplace
                </Link>
            </div>

            {/* SEARCHBAR */}
            <div className="flex items-center">
                <svg className='w-5 h-5 absolute ml-3 pointer-events-auto'>
                    <FontAwesomeIcon icon={solid('magnifying-glass-dollar')} className='text-indigo-500'/>
                </svg>
                <input
                    type="text"
                    placeholder="Search"
                    className="appearance-none border-2 border-indigo-500 rounded-2xl w-full pr-2 pl-10 py-0 text-indigo-900 leading-tight focus:outline-none focus:border-pink-500"/>
            </div>

            {/* WALLET */}
            <div className='flex items-center'>
                <button className='relative flex items-center' onClick={()=>console.log("Metamask")}>
                    <svg className='w-10 h-10 absolute pointer-events-auto'>
                        <FontAwesomeIcon icon={solid('wallet')} className='text-indigo-500 hover:text-pink-500'/>
                    </svg>
                </button>
            </div>

        </div>
    </nav>
    )
}


