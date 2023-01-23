import  React, { useEffect, useState, useContext } from 'react'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { NotLoggedIn, DisplayNftGrid, SortButton, SearchBar, ResizeCard, UserBackgroundDropzone, UserAvatarDropzone } from "../components/componentsIndex";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Marketplace() {
  const { fetchMyOrListedOrCreatedNFTs, currentAccount } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])
  const [active, setactive] = useState("Owned")
  const [sort, setSort] = useState("");
  const [cardSize, setCardSize] = useState("lg")
  const [userName, setUserName] = useState("Unnamed")
  const [buttonUserName, setButtonUserName] = useState(userName)
  const [showTextField, setShowTextField] = useState(false);


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
    <div className='min-h-screen'>
      <div className='grid pb-28'>
          <UserBackgroundDropzone/>

          <div className='absolute transform pt-40 px-6'>
            <UserAvatarDropzone/>
          </div>
          <div className='flex group pt-2'>
            {showTextField ? (
              <div className='flex items-center border-indigo-300 border-2 ml-80 bg-indigo-50 rounded-full group pl-3'>
                <input
                  autoFocus
                  className='text-3xl mt-2 text-indigo-800 p-2 bg-transparent outline-none'
                  type="text"
                  value={userName}
                  onChange={(event) => {  
                    setUserName(event.target.value)
                    }}
                />
                <button className='flex items-center text-indigo-500 text-2xl bg-white rounded-full w-full h-full p-3 border-l-2 border-l-indigo-300 group-hover:bg-indigo-500 group-hover:text-white'
                  onClick={() => {
                    setShowTextField(false)
                    setButtonUserName(userName)
                    }}>
                  Change
                  <svg className='w-5 h-5 ml-3'>
                    <FontAwesomeIcon icon={solid('pencil')} className='text-indigo-500 group-hover:text-white'/>
                  </svg>
                </button>
              </div>
            ) : (
              <button
                className="text-3xl ml-80 mt-2 text-indigo-800 p-2 rounded-full group-hover:underline flex items-center group-hover:text-indigo-500"
                onMouseEnter={() => setButtonUserName('Change Name')}
                onMouseLeave={() => setButtonUserName(userName)}
                onClick={() => setShowTextField(true)}>
                {buttonUserName} 
                <svg className='w-5 h-5 ml-3 mt-2'>
                  <FontAwesomeIcon icon={solid('pencil')} className='text-transparent group-hover:text-indigo-500'/>
                </svg>
              </button>
      )}
          </div>
          <p className='text-lg ml-[19rem] text-indigo-700'> 0x71bE63f3384f5fb98995898A86B02Fb2426c5788 </p>
      </div>

      <div className='mx-14'>
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
              <ResizeCard setCardSize={setCardSize}/>
              <SortButton setSort={setSort}/>
            </div>
          </div>
        </nav>

        <div className='pt-5'>
          <DisplayNftGrid nftList={nfts} sortType={sort} cardSize={cardSize}/>
        </div>
      </div>
    </div>
  )
}