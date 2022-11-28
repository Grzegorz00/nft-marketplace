import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { CartNFT } from "../components/componentsIndex"

export default function DetailsNFT(props) {
    const router = useRouter();
    const [nft, setNft] = useState({
        image: "",
        tokenId: "",
        name: "",
        owner: "",
        price: "",
        seller: "",
      });
    useEffect(() => {
        if (!router.isReady) return;
        setNft(router.query);
    }, [router.isReady]);

    return (
        <div>
            <CartNFT 
                nftDetails={nft}
                type="create"
            />
            <h1 className="flex justify-center mt-10 text-3xl">Name: {nft.name}</h1>
        </div>
    )
}
