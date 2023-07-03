# NFT Marketplace


## Description

        Web app for users to create, buy, and sell their assets in the form of NFT on the Ethereum blockchain.  

## Technologies Used

	The application is built using the following technologies:

		- Front-end: Next.js, Tailwind CSS  
		- Back-end: Node.js, GraphQL, 
		- Database: PostgreSQL 
		- Blockchain: Ethereum, Hardhat - development blockchain tool
		- Smart Contracts: Solidity

## Installation and Usage

		1.  Clone the repository: `git clone [repository-url]`
		2.  Navigate to the project directory: `cd nft-marketplace`
		3. Run Backend:
			4. Navigate to the backend directory: `cd nft-backend`
			5.  Run docker: `docker-compose up -d`
			6. Install dependencies: `npm i`
			7.  Start the development server: `npm start`
		4. Run blockchain dev environment
			5. Navigate to the fronted directory: `cd nft-frontend`
			6. Install dependencies: `npm i`
			7.  Start the hardhat development blockchain tool: `npx hardhat node`
		5. Run Frontend
			6. Deploy contract: `npx hardhat run scripts/deploy.js --network localhost`
			7.  Start the development environment for the project: `npm run dev`
			8. Open your browser and visit: `http://localhost:8080`
