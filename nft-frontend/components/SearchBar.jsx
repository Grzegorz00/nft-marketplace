import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function SearchBar({nfts, setNfts, nftsCopy}) {
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (search) {
            onHandleSearch(search);
        } else {
            onClearSearch();
        }
    }, [search]);

    const onHandleSearch = (value) => {
        const filteredNFTS = nfts.filter(({ name }) =>
          name.toLowerCase().includes(value.toLowerCase())
        );
    
        if (filteredNFTS.length === 0) {
          setNfts(nftsCopy);
        } else {
          setNfts(filteredNFTS);
        }
    
      };
    
      const onClearSearch = () => {
        if (nfts.length && nftsCopy.length) {
          setNfts(nftsCopy);
        }
      };

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