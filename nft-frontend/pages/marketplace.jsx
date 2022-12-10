import { useEffect, useState, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"
import { Loader, CartNFT, SearchBar } from "../components/componentsIndex"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'


export default function Marketplace() {
  const { fetchNFTs } = useContext(NFTMarketplaceContext)
  const [nfts, setNfts] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])
  const [activeDrop, setActiveDrop] = useState(false)
  const [sort, setSort] = useState("noSorted")

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

  function showNfts(nfts){
    if(nfts.length == 0)
      return(<Loader/>)
    else
      return(
          <div className="flex justify-center pb-8">
            <div className="px-4" style={{ maxWidth: '1600px' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
                  nfts.map((nft, i) => (
                    <div className="" key={i}>
                      <CartNFT nftDetails={nft}/>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
      )
    }

    function sortList(sortType){
      if(sortType =="highToLow"){
        const sortedList = nfts.sort((a,b) => b.price - a.price)
        return(
          showNfts(sortedList)
        )
      }
      else{
      const sortedList = nfts.sort((a,b) => a.price - b.price)
        return(
          showNfts(sortedList)
        )
      }
    }

    const handleClick = (event, sortType) => {
      event.preventDefault();
      setActiveDrop(!activeDrop)
      setSort(sortType)
    }
    

  return (
    <div>
      <div className='flex justify-center py-4 text-2xl'>
        <SearchBar
          onHandleSearch={onHandleSearch}
          onClearSearch={onClearSearch}
        />

        <div className='group'>
          <button 
          className='rounded-2xl bg-white border-2 border-indigo-300 px-7 flex items-center text-indigo-300 group-hover:bg-indigo-50 group-hover:text-indigo-500 duration-50'
          onClick={() => setActiveDrop(!activeDrop)}>            
            Sort
            <svg className={`duration-50 w-4 h-5 ml-4 ${activeDrop ? 'rotate-180' : ' '}`}>
                <FontAwesomeIcon icon={solid('chevron-down')} className='text-indigo-300 group-hover:text-indigo-500'/>
            </svg>
          </button>
          <div className={`absolute grid bg-indigo-50 rounded-xl text-lg mt-1 p-2 border-indigo-300 border-2 text-indigo-500 ${activeDrop ? '' : 'hidden'}`}>
            <span className='px-2 py-1 border-b-2 border-indigo-300'>Price</span>
            <button className='px-2 py-1 border-b-2 border-indigo-300 hover:bg-white' onClick={(event) => handleClick(event, "lowToHigh")}> Low to High</button>
            <button className='px-2 py-1 hover:bg-white' onClick={(event) => handleClick(event, "highToLow")}> High to Low</button>
          </div>
        </div>

      </div>
        {sort === "noSorted" && showNfts( nfts )}
        {sort === "lowToHigh" && sortList("lowToHigh")}
        {sort === "highToLow" && sortList("highToLow")}
    </div>
  )
}