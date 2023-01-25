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
      <div className='relative w-max mx-auto'>
        <svg className='absolute w-12 h-6 inset-y-0 my-auto mt-3'>
            <FontAwesomeIcon icon={solid('magnifying-glass')} className='text-indigo-500 group-focus:outline-none'/>
        </svg>
        <input 
          type="search" 
          className='searchBar' 
          placeholder="Search"
          onChange={e => setSearch(e.target.value)}
          value={search}
          />      
      </div>
    )
} 