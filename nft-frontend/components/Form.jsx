import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    solid,
    regular,
    brands,
    icon
  } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Form(){
    return(
        <div className="font-mono">
            <div className="flex justify-center">
                <div className="w-1/2 flex flex-col pb-12">
                    <input 
                        placeholder="Asset Name"
                        className="mt-8 rounded p-4 focus:outline-none border-2 border-indigo-200 text-indigo-900 focus:border-pink-200"
                    />
                    <input
                        placeholder="Asset Description"
                        className="mt-2 rounded p-4 focus:outline-none border-2 border-indigo-200 text-indigo-900 focus:border-pink-200"
                    />
                    
                    <div className='flex items-center mt-2'>
                        <svg className='w-8 h-8 absolute ml-3'>
                            <FontAwesomeIcon icon={brands('ethereum')} className='text-indigo-300'/>
                        </svg>
                        <input
                            placeholder="Asset Price in Eth"
                            className="rounded p-4 focus:outline-none border-2 border-indigo-200 text-indigo-900 focus:border-pink-200 pl-12 "
                         />
                    </div>

                    <input
                        type="file"
                        name="Asset"
                        className="my-4"/>
                    <button className="font-mono mt-4 bg-indigo-400 text-white rounded p-4 shadow-lg hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        Create NFT
                    </button>
            </div>
        </div>
    </div>
    )
}

