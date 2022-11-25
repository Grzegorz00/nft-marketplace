import { useEffect, useState, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { useRouter } from "next/router";
import Image from 'next/image'

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
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <Image src={nft.fileUrl} width={500} height={500} alt='NFT'/>
                <div className="p-4">
                  <p className="text-2xl font-semibold">{nft.name}</p>
                  <p className="text-gray-400">{nft.description}</p>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
                  <button className="button w-full" onClick={() => buyNFT(nft, router)}>Buy</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}