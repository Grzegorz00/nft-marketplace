import { useEffect, useState, useContext } from 'react'
import { useRouter } from "next/router";
import Image from 'next/image'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { NotLoggedIn, Loader } from "../components/componentsIndex";

export default function Marketplace() {
  const { fetchMyOrListedNFTs, createSale, currentAccount } = useContext(NFTMarketplaceContext);
  const [myNFTs, setMyNFTs] = useState([])
  const [listedNFTs, setListedNFTs] = useState([])

  useEffect(() => {
    fetchMyOrListedNFTs("fetchMyNFTs").then((items) => {
      setMyNFTs(items);
    });
  }, []);

  useEffect(() => {
    fetchMyOrListedNFTs("FetchItemsListed").then((items) => {
      setListedNFTs(items);
    });
  }, []);
  
  if (currentAccount == "") return (<NotLoggedIn />)
  return (
    <div>
        <div className='grid grid-cols-1 place-items-center'>
          <h1 className="text-4xl text-pink-400 py-5">User</h1>
          <h1 className="text-2xl text-indigo-500 ">User info ...</h1>
          { myNFTs.length == 0 ? <Loader /> :
            <div className="flex justify-center">
              <div className="px-4" style={{ maxWidth: '1600px' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                  {
                    myNFTs.map((nft, i) => (
                      <div key={i} className="border shadow rounded-xl overflow-hidden">
                        <Image src={nft.fileUrl} width={500} height={500} alt='NFT'/>
                        <div className="p-4">
                          <p className="text-2xl font-semibold">{nft.name}</p>
                          <p className="text-gray-400">{nft.description}</p>
                        </div>
                        <div className="p-4 bg-black">
                          <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
                          <button className="button bg-pink-500 w-full" onClick={() => createSale(nft.fileUrl, nft.price + 1, true, nft.tokenId)}>Sell</button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          }
        </div>
    </div>
  )
}