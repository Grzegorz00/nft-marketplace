import React from "react"
import { useState, useEffect } from "react"
import { Loader, CardNFT } from "../components/componentsIndex"

export default function DisplayNftGrid({nftList, sortType, cardSize}){
    const [sortedList, setSortedList] = useState([]);
  
    const sortList = () => {
        let newList = [...nftList]

        if (sortType === 'High to Low') {
          newList.sort((a, b) => b.price - a.price);
        } else if (sortType === 'Low to High') {
          newList.sort((a, b) => a.price - b.price);
        } else if (sortType === 'A-Z') {
          newList.sort((a, b) => {    
            return a.name.localeCompare(b.name);
          }) 
        } else if (sortType === 'Z-A') {
          newList.sort((a, b) => {
            return a.name.localeCompare(b.name);
          }).reverse()
        }
        return newList;
      };
    
      useEffect(() => {
        setSortedList(sortList());
      }, [nftList, sortType]);

    if(nftList.length == 0)
      return(<Loader/>)
    else
        return(
            <div className="flex justify-start pb-8">
                <div className="px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pt-4 resize-none">
                    {
                        sortedList.map((nft, i) => (
                        <div className="" key={i}>
                            <CardNFT nftDetails={nft} cardSize={cardSize}/>
                        </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        )
}