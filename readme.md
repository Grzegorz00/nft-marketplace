# How to run


```shell
# open new terminal
# go to nft-backend
    cd nft-backend
    docker-compose up -d
    npm i
    npm start

# open new terminal
# go to nft-frontend
    cd nft-frontend
    npm i
    npx hardhat node

# open new terminal
# go to nft-frontend
    cd nft-frontend
	npx hardhat run scripts/deploy.js --network localhost
	npm run dev
```