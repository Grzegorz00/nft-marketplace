import {useState } from 'react'
import Image from "next/image"
import Link from "next/link";
import { TransactWindow } from './componentsIndex';

export default function CartNFTHomePage({nftDetails}){
    const [showWindow, setWidnow] = useState(false)

    return(
        <div className="h-115 max-w-[27.625rem]">
            <div className="group">
                <Link href={typeof(nftDetails.sold) === "undefined" ? "" : { pathname: "/nft", query: nftDetails}}>
                    <div className='relative transition-transform duration-300 group-hover:scale-105 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/70'>
                        <Image src={nftDetails.fileUrl}
                            className='h-115 max-w-[27.625rem] object-cover object-top'
                            width={500} height={500} alt='NFT'/>
                        <h1 className='text-xl text-white font-custom absolute bottom-1 left-2'>{nftDetails.name}</h1>
                    </div>
                </Link>
                <TransactWindow showWindow={showWindow} nft={nftDetails} onClose={() => setWidnow(false)}/>
            </div> 
        </div> 
    )
}