import  React, { useEffect, useState, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { NotLoggedIn, DisplayNftGrid, SortButton, SearchBar, ResizeCart, UserBackgroundDropzone, UserAvatarDropzone } from "../components/componentsIndex";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { GET_USER, CREATE_USER, UPDATE_NAME } from '../queries/users';

export default function Marketplace() {
  const { fetchMyOrListedOrCreatedNFTs, currentAccount } = useContext(NFTMarketplaceContext)
  const { loading, error, data } = useQuery(GET_USER, {variables: {address: currentAccount}})
  const [updateName] = useMutation(UPDATE_NAME)
  const [createUser] = useMutation(CREATE_USER)
  const [nfts, setNfts] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])
  const [active, setactive] = useState("Owned")
  const [sort, setSort] = useState("");
  const [cardSize, setCardSize] = useState("lg")
  const [userName, setUserName] = useState("")
  const [buttonUserName, setButtonUserName] = useState("")
  const [showTextField, setShowTextField] = useState(false);

  useEffect(() => {
    if(!loading && !error){
      if(!data.user){
        createUser({variables: {address: currentAccount, name: "Unnamed", backgroundUrl: "", avatarUrl: ""}})
      }else{
        setUserName(data.user.name)
        setButtonUserName(userName)
      }
    }
  }, data);

  const changeName = () => {
    updateName({variables: {address: currentAccount, name: userName}})
    setButtonUserName(userName)
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
  
  // if(data.user){

    return (
      <div className='min-h-screen'>
        <div className='grid pb-28'>
        {data.user && <UserBackgroundDropzone backgroundUrl={data.user.backgroundUrl}/>}  
            <div className='absolute transform pt-40 px-6'>
            {data.user && <UserAvatarDropzone avatarUrl={data.user.avatarUrl}/>}
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
                      changeName()
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
            <p className='text-lg ml-[19rem] text-indigo-700'> {data.user && data.user.address}</p>
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
  // }
}