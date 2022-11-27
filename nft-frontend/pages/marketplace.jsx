import { useEffect, useState, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { useRouter } from "next/router";
import CartNFT from '../components/CartNFT';

export default function Marketplace() {
  const { fetchNFTs, buyNFT } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const router = useRouter();

  useEffect(()=> {
    fetchNFTs().then((items) => {
      setNfts(items);
    });
    setLoadingState('loaded') 
  },[])

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>)
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i}>
              <CartNFT
                name={nft.name}
                description={nft.description}
                price={nft.price}
                fileUrl={nft.fileUrl}
                nft={nft}
                type={"buy"}
              />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}