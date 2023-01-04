import  React, { useEffect, useState, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { NotLoggedIn, DisplayNftGrid, SortButton, SearchBar, ResizeCart, UserBackgroundDropzone, UserAvatarDropzone } from "../components/componentsIndex";
import { GET_USER, CREATE_USER, UPDATE_NAME } from '../queries/users';

export default function Marketplace() {
  const { fetchMyOrListedOrCreatedNFTs, currentAccount } = useContext(NFTMarketplaceContext)
  const { loading, error, data } = useQuery(GET_USER, {variables: {address: currentAccount}})
  const [createUser] = useMutation(CREATE_USER)
  const [nfts, setNfts] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])
  const [active, setactive] = useState("Owned")
  const [sort, setSort] = useState("");
  const [cardSize, setCardSize] = useState("lg")

  if(!loading && !error){
    if(!data.user){
      console.log("New user")
      createUser({variables: {address: currentAccount, name: "Unnamed", backgroundUrl: "", avatarUrl: ""}})
    }
  }

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
  
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  if (currentAccount == "") return (<NotLoggedIn />)
  return (
    <div className='min-h-screen'>
      <div className='grid pb-28'>
          <UserBackgroundDropzone backgroundUrl={data.user.backgroundUrl}/>

          <div className='absolute transform pt-40 px-6'>
            <UserAvatarDropzone avatarUrl={data.user.avatarUrl}/>
          </div>
          <p className='text-xl ml-80 mt-2 text-indigo-800'>{data.user.name} </p>
          <p className='text-lg ml-[19rem] text-indigo-700'>{data.user.address} </p>
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
              <ResizeCart setCardSize={setCardSize}/>
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