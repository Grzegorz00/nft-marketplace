import  React, { useEffect, useState, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { NotLoggedIn, CartNFT } from "../components/componentsIndex";

export default function Marketplace() {
  const { fetchMyOrListedOrCreatedNFTs, currentAccount } = useContext(NFTMarketplaceContext);
  const [myNFTs, setMyNFTs] = useState([])
  const [listedNFTs, setListedNFTs] = useState([])
  const [createdNFTs, setCreatedNFTs] = useState([])
  const [active, setactive] = useState("Owned")

  useEffect(()=> {
    try{
      fetchMyOrListedOrCreatedNFTs("FetchMyNFTs").then((items) => {
        setMyNFTs(items);
      });
    } catch (error){
      alert("Please reload browser")
      console.log("User (myNFTs) error: " + error)
    }
  },[])

  useEffect(()=> {
    try{
      fetchMyOrListedOrCreatedNFTs("FetchListedNFTs").then((items) => {
        setListedNFTs(items);
      });
    } catch (error){
      alert("Please reload browser")
      console.log("User (listedNFTs) error: " + error)
    }
  },[])

  useEffect(()=> {
    try{
      fetchMyOrListedOrCreatedNFTs("FetchCreatedNFTs").then((items) => {
        setCreatedNFTs(items);
      });
    } catch (error){
      alert("Please reload browser")
      console.log("User (createddNFTs) error: " + error)
    }
  },[])

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
                    <div classname="" key={i}>
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
    <div className='mx-14 py-4'>
      <nav class="px-2 border-b-2 rounded border-indigo-300 pb-1">
        <div class="container flex items-center">
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
        {active === "Created" && noListedNft()}
        {active === "Listed" && showMyNft( listedNFTs )}
      </div>

    </div>
  )
}