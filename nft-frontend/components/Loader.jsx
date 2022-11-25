import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Loader() {
  return (
    <div className='flex justify-center mt-10'>
        <div className='flex items-center space-x-2'>
            <svg className="w-12 h-12 animate-spin">
                <FontAwesomeIcon icon={solid('circle-notch')} className='text-indigo-500' />
            </svg>
            <h1 className='text-3xl text-transparent bg-clip-text gradient'>Loading</h1>
        </div>
    </div>
  )
} 