import React, { useContext } from "react"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function NotLoggedIn() {
  const { connectWallet } = useContext(NFTMarketplaceContext);

  return (
    <div className='flex justify-center py-32'>
      <button className="flex items-center space-x-5" onClick={()=>connectWallet()}>
        <svg className='w-20 h-20'>
            <FontAwesomeIcon icon={solid('wallet')} className='text-indigo-500 hover:text-pink-500'/>
        </svg>
        <h1 className="text-3xl">Please Log in</h1>
      </button>
    </div>
  )
}