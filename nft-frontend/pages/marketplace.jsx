import { useEffect, useState, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"
import { SearchBar, DisplayNftGrid, SortButton, ResizeCard } from "../components/componentsIndex"

var isLoaded = false

export default function Marketplace() {
  const { fetchNFTs } = useContext(NFTMarketplaceContext)
  const [nfts, setNfts] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])
  const [sort, setSort] = useState("");
  const [cardSize, setCardSize] = useState("lg")
  

  useEffect(()=> {
    if(isLoaded)
      return
      
    try{
      fetchNFTs().then((items) => {
        setNfts(items)
        setNftsCopy(items)
        isLoaded = true
      })
    } catch (error){
      alert("Please reload browser")
      console.log("Marketplace error: " + error)
    }
    return () => isLoaded = false
  },[])

  return(
    <div className='min-h-screen'>
      <div className='bg-gray-100 shadow-lg'>
        <div className='mx-10 flex justify-between pb-4 py-3 border-t-2 border-indigo-200'>
          <div>
            <SearchBar nfts={nfts} setNfts={setNfts} nftsCopy={nftsCopy} />
          </div>

          <div className='flex space-x-3 items-center'>
            <ResizeCard setCardSize={setCardSize}/>
            <SortButton setSort={setSort}/>
          </div>
        </div>
      </div>

      <div className='mx-8 mt-5'>
          <DisplayNftGrid nftList={nfts} sortType={sort} cardSize={cardSize}/>
      </div>

    </div>
  )
}