import '../styles/globals.css'
import { Navbar, Footer } from "../components/componentsIndex";

import Head from 'next/head'
import { NFTMarketplaceProvider } from "../context/NFTMarketplaceContext"

const MyApp = ({ Component, pageProps }) => (
    <>
        <Head>
            <title>NFT Marketplace</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet"/>
        </Head> 
        <div className="bg-gradient-to-b from-white via-indigo-100 to-white min-h-screen">
            <NFTMarketplaceProvider>
                <Navbar/>
                <Component {...pageProps}/>
                <Footer/>
            </NFTMarketplaceProvider>
        </div>
    </>
);
export default MyApp