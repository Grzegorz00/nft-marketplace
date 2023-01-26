import React from "react"
import { useEffect, useState, useContext, useCallback } from 'react'
import { Loader } from "./componentsIndex"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"
import { CardNFTHomePage } from "../components/componentsIndex";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

var isLoaded = false

export default function IndexNftDisplay(){
    const { fetchNFTs } = useContext(NFTMarketplaceContext)
    const [nfts, setNfts] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(()=> {
      if(isLoaded)
        return

      try{
        fetchNFTs().then((items) => {
          setNfts(items)
          isLoaded = true
        })
      } catch (error){
        alert("Please reload browser")
        console.log("Marketplace error: " + error)
      }
      return () => isLoaded = false
    },[], index)
      
    
      function getNext4() {
        const next4 = [];
        for (let i = 0; i < 4; i++) {
            next4.push(nfts[(index + i) % nfts.length]);
        }
        return next4;
      }

      const handleNext = useCallback(() => {setIndex(index+1)}, [index, setIndex])
      const handlePrevious = useCallback(() => {setIndex(index==0 ? nfts.length-1 : index-1)}, [index, setIndex])

      if(nfts.length == 0)
        return(
          <Loader/>
        )
      else
      return(
        <div className="relative flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-10 gap-5 pt-8 pb-8 px-8 resize-none">
            {
                getNext4().map((nft, i) => (
                  <div key={i}>
                      <CardNFTHomePage nftDetails={nft}/>
                  </div>
                ))
            }
        
            <button className='group absolute right-0 top-60 w-14 h-14 bg-white rounded-full transition-transform duration-300 hover:scale-105' onClick={handleNext}> 
                <svg className='w-14 h-14'>
                  <FontAwesomeIcon icon={solid('circle-chevron-right')} className='text-pink-500 group-hover:text-cyan-500'/>
              </svg>
            </button>

            <button className='group absolute left-0 top-60 w-14 h-14 bg-white rounded-full transition-transform duration-300 hover:scale-105' onClick={handlePrevious}> 
                <svg className='w-14 h-14'>
                  <FontAwesomeIcon icon={solid('circle-chevron-left')} className='text-pink-500 group-hover:text-cyan-500'/>
              </svg>
            </button>

            </div>
        </div>
    )
    
}