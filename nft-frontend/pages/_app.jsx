import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import { NFTMarketplaceProvider } from "../context/NFTMarketplaceContext"

const MyApp = ({ Component, pageProps }) => (
    <>
        <Head>
            <title>NFT Marketplace</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+39+Text&display=swap" rel="stylesheet"/>
        </Head> 
        <div>
            <NFTMarketplaceProvider>
                <Navbar/>
                <Component {...pageProps}/>
            </NFTMarketplaceProvider>
        </div>
    </>
);
export default MyApp