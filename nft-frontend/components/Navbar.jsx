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
        <div className="container flex flex-wrap items-center justify-between mx-auto"> 
            <div className="space-x-5 px-3">
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
                    href="create-nft" 
                    className="text-dark-400 hover:text-pink-500 text-indigo-500">
                    Marketplace
                </Link>
            </div>
            <div class="relative flex items-center">
                <svg className='w-5 h-5 absolute ml-3 pointer-events-none'>
                    <FontAwesomeIcon icon={solid('magnifying-glass-dollar')} className='text-indigo-500'/>
                </svg>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full pr-2 pl-10 py-0 placeholder-indigo-300 text-indigo-900 rounded-2xl border-2 border-indigo-500"/>
            </div>
        </div>
    </nav>
    )
}


