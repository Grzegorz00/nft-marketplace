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

  const handleSort = value => {
    setSort(value)
  };

  return (
    <div>
      <div className='flex justify-center py-4 text-2xl'>
        <SearchBar
          onHandleSearch={onHandleSearch}
          onClearSearch={onClearSearch}
        />

        <SortButton handleSort={handleSort}/>

      </div>
        <DisplayNftGrid nftList={nfts} sortType={sort}/>
    </div>
  )
}