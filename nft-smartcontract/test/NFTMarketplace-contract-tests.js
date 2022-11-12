/* test/NFTMarketplace-contract-tests.js */
describe("NFTMarket:", function() {
  it("Should create and run transactions", async function() {
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace")
    const nftMarketplace = await NFTMarketplace.deploy()
    await nftMarketplace.deployed()

    let listingFee = await nftMarketplace.getListingFee()
    listingFee = listingFee.toString()

    const auctionPrice = ethers.utils.parseUnits('2', 'ether')

    await nftMarketplace.createToken("https://www.example1.com", auctionPrice, { value: listingFee })
    await nftMarketplace.createToken("https://www.example2.com", auctionPrice, { value: listingFee })

    const [_, buyerAddress] = await ethers.getSigners()

    await nftMarketplace.connect(buyerAddress).createMarketSale(1, { value: auctionPrice })
    await nftMarketplace.connect(buyerAddress).resellToken(1, auctionPrice, { value: listingFee })

    nfts = await nftMarketplace.fetchMarketItems()

    nfts = await Promise.all(nfts.map(async n => {
      const tokenUri = await nftMarketplace.tokenURI(n.tokenId)
      return getShortDescription(n, tokenUri)
    }))
    console.log('nfts: ', nfts)
  })
})

function getShortDescription(n, tokenUri) {
  let nft = {
    price: n.price.toString(),
    tokenId: n.tokenId.toString(),
    seller: n.seller,
    owner: n.owner,
    tokenUri
  }
  return nft
}