import  React, { useEffect, useState, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { NotLoggedIn, CartNFT } from "../components/componentsIndex";
import { GET_USER } from '../queries/users';

export default function Marketplace() {
  const { fetchMyOrListedOrCreatedNFTs, currentAccount } = useContext(NFTMarketplaceContext);
  const [myNFTs, setMyNFTs] = useState([])
  const [listedNFTs, setListedNFTs] = useState([])
  const [createdNFTs, setCreatedNFTs] = useState([])
  const [active, setactive] = useState("Owned")
  const { loading, error, data } = useQuery(GET_USER, {variables: {address: currentAccount}});

  useEffect(()=> {
    try{
      fetchMyOrListedOrCreatedNFTs("FetchMyNFTs").then((items) => setMyNFTs(items))
      fetchMyOrListedOrCreatedNFTs("FetchListedNFTs").then((items) => setListedNFTs(items))
      fetchMyOrListedOrCreatedNFTs("FetchCreatedNFTs").then((items) => setCreatedNFTs(items))
    } catch (error){
      alert("Please reload browser")
      console.log("User error: " + error)
    }
  },[])

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  function noListedNft(){
    return(
      <div className="pt-8">
      <div className="px-4 border-2 w-full rounded-2xl border-indigo-200 h-120 items-center flex justify-center">
        <h1 className='text-transparent bg-clip-text gradient text-6xl'>No Nfts to display</h1>
      </div>
    </div>
    )
  }

  function showMyNft(nftList){
    if(nftList.length == 0)
      return(noListedNft())
    else
      return(
          <div className="pt-8">
            <div className="px-4 border-2 w-full rounded-2xl border-indigo-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-4 pt-5 pb-5">
                {
                  nftList.map((nft, i) => (
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

  if (currentAccount == "") return (<NotLoggedIn />)
  return (
    <div className='mx-14 py-10'>
      <p>User name: {data.user.name}</p>
      <nav className="px-2 border-b-2 rounded border-indigo-300 pb-1">
        <div className="container flex items-center">
          <div className='space-x-5 text-2xl text-indigo-500'>
           <button 
              autoFocus
              className="userNav focus:outline-none"
              onClick={() => setactive("Owned")}> Owned
            </button>
            <button 
              className="userNav"
              onClick={() => setactive("Listed")}> Listed
            </button>
            <button 
              className="userNav"
              onClick={() => setactive("Created")}> Created
            </button>
          </div>
        </div>
      </nav>

      <div>
        {active === "Owned" && showMyNft( myNFTs )}
        {active === "Listed" && showMyNft( listedNFTs )}
        {active === "Created" && showMyNft( createdNFTs )}
      </div>

    </div>
  )
}