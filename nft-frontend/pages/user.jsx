import { useEffect, useState, useContext } from 'react'
import { useRouter } from "next/router";
import Image from 'next/image'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { NotLoggedIn, Loader } from "../components/componentsIndex";
import CartNFT from '../components/CartNFT';

export default function Marketplace() {
  const { fetchMyOrListedNFTs, currentAccount } = useContext(NFTMarketplaceContext);
  const [myNFTs, setMyNFTs] = useState([])
  const [listedNFTs, setListedNFTs] = useState([])

  useEffect(()=> {
    try{
      fetchMyOrListedNFTs("fetchMyNFTs").then((items) => {
        setMyNFTs(items);
      });
    } catch (error){
      alert("Please reload browser")
      console.log("User (myNFTs) error: " + error)
    }
  },[])

  useEffect(()=> {
    try{
      fetchMyOrListedNFTs("FetchItemsListed").then((items) => {
        setListedNFTs(items);
      });
    } catch (error){
      alert("Please reload browser")
      console.log("User (listedNFTs) error: " + error)
    }
  },[])
  
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