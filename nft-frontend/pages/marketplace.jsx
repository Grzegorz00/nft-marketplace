import { useEffect, useState, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"
import { SearchBar, DisplayNftGrid, SortButton } from "../components/componentsIndex"


export default function Marketplace() {
  const { fetchNFTs } = useContext(NFTMarketplaceContext)
  const [nfts, setNfts] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])
  const [sort, setSort] = useState("");

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

  return (
    <div>
      <div className='flex justify-center py-4 text-2xl'>
        <SearchBar nfts={nfts} setNfts={setNfts} nftsCopy={nftsCopy} />
        <SortButton setSort={setSort}/>
      </div>
        <DisplayNftGrid nftList={nfts} sortType={sort}/>
    </div>
  )
}