import { useEffect, useState, useContext } from 'react'
import { useRouter } from "next/router";
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { Loader, CartNFT } from "../components/componentsIndex";

export default function Marketplace() {
  const { fetchNFTs, buyNFT } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([])
  const router = useRouter();

  useEffect(()=> {
    try{
      fetchNFTs().then((items) => {
        setNfts(items);
      });
    } catch (error){
      alert("Please reload browser")
      console.log("Marketplace error: " + error)
    }
  },[])

  return (
    <div>
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