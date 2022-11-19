import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function CreateNFT() {
  return (
    <div>
        <Navbar/>
        <div className="flex justify-center">
        <div className="w-1/2 flex flex-col pb-12">
            <input 
            placeholder="Asset Name"
            className="mt-8 border rounded p-4"/>
            <textarea
            placeholder="Asset Description"
            className="mt-2 border rounded p-4"/>
            <input
            placeholder="Asset Price in Eth"
            className="mt-2 border rounded p-4"/>
            <input
            type="file"
            name="Asset"
            className="my-4"/>
            <button className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Create NFT
            </button>
            </div>
        </div>
    </div>
  )
}
