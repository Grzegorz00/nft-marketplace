import { useEffect, useState, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import NotLoggedIn from "../components/NotLoggedIn";
import CartNFT from '../components/CartNFT';

export default function Marketplace() {
  const { fetchMyOrListedNFTs, currentAccount } = useContext(NFTMarketplaceContext);
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
    <div className='grid grid-cols-1 place-items-center'>
      <h1 className="text-4xl text-pink-400 py-5">User</h1>
      <h1 className="text-2xl text-indigo-500 ">User info ...</h1>

      <div className="flex justify-center">
        <div className="px-4" style={{ maxWidth: '1600px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {
              myNFTs.map((nft, i) => (
                <div key={i}>
                <CartNFT
                name={nft.name}
                description={nft.description}
                price={nft.price}
                fileUrl={nft.fileUrl}
                type={"sell"}
                tokenId={nft.tokenId}
              />
              </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}