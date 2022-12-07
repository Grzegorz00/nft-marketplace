import { useEffect, useState, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"
import { Loader, CartNFT, SearchBar } from "../components/componentsIndex"

export default function Marketplace() {
  const { fetchNFTs } = useContext(NFTMarketplaceContext)
  const [nfts, setNfts] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])

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
  return (
    <div>
      <div className='flex justify-center py-4 text-2xl'>
        <SearchBar
          onHandleSearch={onHandleSearch}
          onClearSearch={onClearSearch}
        />
      </div>
      { nfts.length == 0 ? <Loader /> :
        <div className="flex justify-center">
          <div className="px-4" style={{ maxWidth: '1600px' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {
                nfts.map((nft, i) => (
                  <div key={i}>
                    <CartNFT nftDetails = {nft}/>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}