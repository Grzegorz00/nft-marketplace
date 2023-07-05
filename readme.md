# NFT Marketplace
![image](https://github.com/Grzegorz00/nft-marketplace/assets/49844467/afeb00f9-8d79-4aef-82f0-a153208af24d)

## Description

	Web app for users to create, buy, and sell their assets, and art (photos, videos, gifs, etc.)
 	in the form of NFT on the Ethereum blockchain.  

## Technologies Used

	The application is built using the following technologies:

		- Front-end:         Next.js, Tailwind CSS  
		- Back-end:          Node.js, GraphQL
		- Database:          PostgreSQL 
		- Blockchain:        Ethereum, Hardhat - development blockchain tool
		- Smart Contracts:   Solidity

## Installation and Usage

		1. Clone the repository: `git clone [repository-url]`
		2. Navigate to the project directory: `cd nft-marketplace`
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
			8. Open your browser and visit: `http://localhost:3000`

## How the app looks like

![ezgif com-crop (1)](https://github.com/Grzegorz00/nft-marketplace/assets/49844467/9fb6c6d5-ae11-49a0-a54a-143bed767466)

![ezgif com-crop (2)](https://github.com/Grzegorz00/nft-marketplace/assets/49844467/2aff5604-a1d4-4ee9-915a-dfbb2e9aac52)

![ezgif com-crop (3)](https://github.com/Grzegorz00/nft-marketplace/assets/49844467/e84577bc-e306-4752-aabc-8f939c6e68dc)

![ezgif com-gif-maker](https://github.com/Grzegorz00/nft-marketplace/assets/49844467/89325059-f45a-4bb0-ba81-7a0fbe8204d9)

![ezgif com-crop (4)](https://github.com/Grzegorz00/nft-marketplace/assets/49844467/17dbe324-2289-4ffa-90ad-74f6ff08bd3d)
