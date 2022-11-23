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
        <nav className=" py-4 bg-gray-100 shadow-lg font-mono text-2xl">
            
            <div className="flex justify-between items-center ml-10 mr-10"> 
                {/* LOGO */}
                <div className='flex items-center space-x-5'>
                    <svg className='w-14 h-14'>
                        <FontAwesomeIcon icon={solid('store')} className='text-indigo-500'/>
                    </svg>
                    <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">NFT Marketplace</span>
                </div>

                {/* LINK NAVBAR*/}
                <div className="flex items-center">
                    <ul className='flex items-center space-x-5 px-7'>
                        <li>
                            <Link
                                href="/"
                                className="text-transparent bg-clip-text hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-indigo-500">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="marketplace" 
                                className="text-transparent bg-clip-text hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-indigo-500">
                                Marketplace
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="create-nft" 
                                className="text-transparent bg-clip-text hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-indigo-500">
                                Create Nft
                            </Link>
                        </li>
                    </ul>

                    <span className="flex items-center">
                        <svg className='w-5 h-5 absolute ml-3'>
                            <FontAwesomeIcon icon={solid('magnifying-glass-dollar')} className='text-indigo-500'/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search"
                            className="border-2 border-indigo-500 rounded-2xl pr-2 pl-10 py-0 text-indigo-900 leading-tight focus:outline-none focus:border-pink-500" 
                        />
                    </span>
                </div>

                {/* WALLET */}
                <div className='items-center flex space-x-5'>

                    <button className='flex' onClick={()=>console.log("Metamask")}>
                        <svg className='w-10 h-10'>
                            <FontAwesomeIcon icon={solid('wallet')} className='text-indigo-500 hover:text-pink-500'/>
                        </svg>
                    </button>

                    <button className='flex' onClick={()=>console.log("User")}>
                        <svg className='w-9 h-9'>
                            <FontAwesomeIcon icon={solid('user-secret')} className='text-indigo-500 hover:text-pink-500'/>
                        </svg>
                    </button>

                </div>


            </div>
        </nav>
    )
}


