import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function SortButton({ handleSort }){
    const [activeDrop, setActiveDrop] = useState(false)
    const [sort, setSort] = useState("noSorted")

    const handleClick = (event, sortType) => {
        event.preventDefault();
        setSort(sortType);
        setActiveDrop(!activeDrop);
        handleSort(sortType)
    }


    return(
            <div className='group'>
                <button 
                    className='rounded-2xl text-lg bg-white border-2 border-indigo-300 px-7 flex items-center text-indigo-300 group-hover:bg-indigo-50 group-hover:text-indigo-500 duration-50'
                    onClick={() => setActiveDrop(!activeDrop)}>            
                    {sort == "noSorted"? "Sort" : sort}
                <svg className={`duration-50 w-4 h-5 ml-4 ${activeDrop ? 'rotate-180' : ' '}`}>
                    <FontAwesomeIcon icon={solid('chevron-down')} className='text-indigo-300 group-hover:text-indigo-500'/>
                </svg>
                </button>

                <div className={`absolute grid bg-indigo-50 rounded-xl text-lg mt-1 p-2 border-indigo-300 border-2 text-indigo-500 ${activeDrop ? '' : 'hidden'}`}>
                    <span className='px-2 py-1 border-b-2 border-indigo-300 font-bold'>Price</span>
                    <button className='px-2 py-1 border-b-2 border-indigo-300 hover:bg-white' onClick={(event) => handleClick(event, "Low to High")}> Low to High</button>
                    <button className='px-2 py-1 hover:bg-white border-b-2 border-indigo-300' onClick={(event) => handleClick(event, "High to Low")}> High to Low</button>
                    <button className='px-2 py-1 hover:bg-white' onClick={(event) => handleClick(event, "By Name")}> By Name</button>
                </div>

            </div>
        )
}