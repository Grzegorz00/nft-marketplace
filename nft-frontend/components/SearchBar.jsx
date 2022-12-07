import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function SearchBar({ onHandleSearch, onClearSearch }) {
    const [search, setSearch] = useState("");
    const [searchItem, setSearchItem] = useState(search);
  
    // to do wyrzucenia
    useEffect(() => {
        const timer = setTimeout(() => setSearch(searchItem), 200);
        return () => clearTimeout(timer);
      }, [searchItem]);
    
    useEffect(() => {
    
    if (search) {
        onHandleSearch(search);
    } else {
        onClearSearch();
    }
    }, [search]);

    return (
        <div className="flex items-center group">
            <svg className='w-5 h-5 absolute ml-3'>
                <FontAwesomeIcon icon={solid('magnifying-glass-dollar')} className='text-indigo-500 group-focus:outline-none'/>
            </svg>
            <input
                type="text"
                placeholder="Search"
                className="border-2 border-indigo-500 rounded-2xl pr-2 pl-10 py-0 text-indigo-900 leading-tight focus:outline-none focus:border-pink-500" 
                // zmień na searchItem żeby sie ładowało
                onChange={e => setSearch(e.target.value)}
                value={search}
            />
        </div>
    )
} 