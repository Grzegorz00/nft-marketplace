import '../styles/globals.css'

// Internal import
import { NFTMarketplaceProvider } from "../context/NFTMarketplaceContext"

const MyApp = ({ Component, pageProps }) => (
    <div>
        <NFTMarketplaceProvider>
            <Component {...pageProps}/>
        </NFTMarketplaceProvider>
    </div>
);

export default MyApp