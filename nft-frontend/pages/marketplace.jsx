import { useEffect, useState, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"
import { SearchBar, DisplayNftGrid, SortButton, ResizeCart } from "../components/componentsIndex"


export default function Marketplace() {
  const { fetchNFTs } = useContext(NFTMarketplaceContext)
  const [nfts, setNfts] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])
  const [sort, setSort] = useState("");
  const [cardSize, setCardSize] = useState("lg")

  useEffect(()=> {
    try{
      fetchNFTs().then((items) => {
        setNfts(items)
        setNftsCopy(items)
      })
    } catch (error){
      alert("Please reload browser")
      console.log("Marketplace error: " + error)
    }
  },[])

  return(
    <>
      <div className='bg-gray-100 shadow-lg'>
        <div className='mx-10 flex justify-between pb-4 py-5 border-t-2 border-indigo-200'>
          <div>
            <SearchBar nfts={nfts} setNfts={setNfts} nftsCopy={nftsCopy} />
          </div>

          <div className='flex space-x-3'>
            <ResizeCart setCardSize={setCardSize}/>
            <SortButton setSort={setSort}/>
          </div>
        </div>
      </div>

      <div className='mx-8 mt-5'>
          <DisplayNftGrid nftList={nfts} sortType={sort} cardSize={cardSize}/>
      </div>

    </>
  )
}

