import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { NFTMarketplaceProvider } from "../context/NFTMarketplaceContext"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:9090/'
    })
  });

const MyApp = ({ Component, pageProps }) => (
    <>
        <Head>
            <title>NFT Marketplace</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet"/>
        </Head> 
        <div>
            <ApolloProvider client={client}>
                <NFTMarketplaceProvider>
                    <Navbar/>
                    <Component {...pageProps}/>
                </NFTMarketplaceProvider>
            </ApolloProvider>
        </div>
    </>
);
export default MyApp