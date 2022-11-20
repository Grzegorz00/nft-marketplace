import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Head from 'next/head'


const MyApp = ({ Component, pageProps }) => (
    <>
        <Head>
            <title>NFT Marketplace</title>
        </Head>
        <div>
            <Navbar/>
            <Component {...pageProps}/>
        </div>
    </>
);
export default MyApp