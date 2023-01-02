import  React, { useEffect, useState, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { NotLoggedIn, DisplayNftGrid, SortButton, SearchBar, ResizeCart, UserBackgroundDropzone, UserAvatarDropzone } from "../components/componentsIndex";

export default function Marketplace() {
  const { fetchMyOrListedOrCreatedNFTs, currentAccount } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])
  const [active, setactive] = useState("Owned")
  const [sort, setSort] = useState("");
  const [cardSize, setCardSize] = useState("lg")


  useEffect(()=> {
    try{
      if(active == "Owned"){
        fetchMyOrListedOrCreatedNFTs("FetchMyNFTs").then((items) =>{ 
          setNfts(items) 
          setNftsCopy(items)})
      } else if(active == "Listed"){
        fetchMyOrListedOrCreatedNFTs("FetchListedNFTs").then((items) =>{ 
          setNfts(items) 
          setNftsCopy(items)})
      } else if(active == "Created"){
      fetchMyOrListedOrCreatedNFTs("FetchCreatedNFTs").then((items) =>{ 
        setNfts(items) 
        setNftsCopy(items)})
      }
    } catch (error){
      alert("Please reload browser")
      console.log("User error: " + error)
    }
  },[active])
  

  if (currentAccount == "") return (<NotLoggedIn />)
  return (
    <>
      <div className='grid pb-28'>
          <UserBackgroundDropzone/>

          <div className='absolute transform pt-40 px-6'>
            <UserAvatarDropzone/>
          </div>
          
          <p className='text-3xl ml-80 mt-2 text-indigo-800'> Unnamed </p>
          <p className='text-lg ml-[19rem] text-indigo-700'> 0x71bE63f3384f5fb98995898A86B02Fb2426c5788 </p>
      </div>

      <div className='mx-14 py-10'>
        <nav className="px-2 border-b-2 rounded border-indigo-300 pb-1">
          <div className="flex items-center justify-between">
            <div>
              <div className='space-x-5 text-2xl text-indigo-500'>
                <button
                  autoFocus
                  className={active == "Owned" ? "userNavActive" : "userNav"}
                  onClick={() => setactive("Owned")}> Owned
                </button>
                <button 
                   className={active == "Listed" ? "userNavActive" : "userNav"}
                  onClick={() => setactive("Listed")}> Listed
                </button>
                <button 
                   className={active == "Created" ? "userNavActive" : "userNav"}
                  onClick={() => setactive("Created")}> Created
                </button>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <SearchBar nfts={nfts} setNfts={setNfts} nftsCopy={nftsCopy} />
              <ResizeCart setCardSize={setCardSize}/>
              <SortButton setSort={setSort}/>
            </div>
          </div>
        </nav>

        <div className='pt-5'>
          <DisplayNftGrid nftList={nfts} sortType={sort} cardSize={cardSize}/>
        </div>

      </div>
    </>
  )
}