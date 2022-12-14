import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState } from 'react';

export default function CartNFT({setCardSize}){
    const [activeButton, setActiveButton] = useState(null);
    console.log(activeButton)
    return(
        <div className='flex items-center border-2 rounded-full border-indigo-300 h-12 overflow-hidden'>
            <button className={`hover:bg-indigo-100 w-full h-full px-4 outline-none border-r-2 border-indigo-300 ${activeButton == "1" ? 'bg-indigo-100' : 'bg-transparent'}`}
                    onClick={() => {
                        setCardSize("lg")
                        setActiveButton(1)
                    }}>
                <svg className='w-7 h-7'>
                    <FontAwesomeIcon icon={solid('table-cells-large')} className='text-indigo-500'/>
                </svg>
            </button>

            <button className={`hover:bg-indigo-100 w-full h-full px-4 outline-none ${activeButton == "2" ? 'bg-indigo-100' : 'bg-transparent'}`}
                    onClick={() => {
                        setCardSize("sm")
                        setActiveButton(2)
                    }}>
                <svg className='w-7 h-7 bg-transparent'>
                    <FontAwesomeIcon icon={solid('table-cells')} className='text-indigo-500'/>
                </svg>
            </button>
        </div>
    )
}