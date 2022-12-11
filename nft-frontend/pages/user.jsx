import  React, { useEffect, useState, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { NotLoggedIn, DisplayNftGrid, SortButton, SearchBar } from "../components/componentsIndex";

export default function Marketplace() {
  const { fetchMyOrListedOrCreatedNFTs, currentAccount } = useContext(NFTMarketplaceContext);
  const [myNFTs, setMyNFTs] = useState([])
  const [listedNFTs, setListedNFTs] = useState([])
  const [createdNFTs, setCreatedNFTs] = useState([])
  const [active, setactive] = useState("Owned")
  const [sort, setSort] = useState("");

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

  if (currentAccount == "") return (<NotLoggedIn />)
  return (
    <div className='mx-14 py-10'>
      <nav className="px-2 border-b-2 rounded border-indigo-300 pb-1">
        <div className="flex items-center justify-between">
          <div>
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
          {active === "Owned" && <SearchBar nfts={myNFTs} setNfts={setMyNFTs} nftsCopy={myNFTs} />}
          {active === "Listed" && <SearchBar nfts={myNFTs} setNfts={setListedNFTs} nftsCopy={listedNFTs} />}
          {active === "Created" && <SearchBar nfts={myNFTs} setNfts={setCreatedNFTs} nftsCopy={createdNFTs} />}
          <SortButton setSort={setSort}/>
        </div>
      </nav>

      <div className='pt-5'>
        {active === "Owned" && <DisplayNftGrid nftList={myNFTs} sortType={sort} />}
        {active === "Listed" && <DisplayNftGrid nftList={listedNFTs} sortType={sort} />}
        {active === "Created" && <DisplayNftGrid nftList={createdNFTs} sortType={sort} />}
      </div>

    </div>
  )
}