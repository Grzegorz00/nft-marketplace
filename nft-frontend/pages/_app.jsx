import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import { NFTMarketplaceProvider } from "../context/NFTMarketplaceContext"

const MyApp = ({ Component, pageProps }) => (
    <>
        <Head>
            <title>NFT Marketplace</title>
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