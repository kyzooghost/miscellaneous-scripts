const ethers = require("ethers");
const privKey = INSERT_PRIVATE_KEY;
const api = INSERT_RPC_ENDPOINT //42-44s

// Set up Provider instance
const provider = new ethers.providers.JsonRpcProvider(api, "homestead"); 

// Set-up wallet
const wallet = new ethers.Wallet(privKey, provider);

// NFT contract address
const address = "0xBD4455dA5929D5639EE098ABFaa3241e9ae111Af";

const abi = [
    {
        inputs:[],
        name:"mintEnabled",
        outputs:[{"internalType":"bool","name":"","type":"bool"}],
        stateMutability:"view",
        type:"function"
    }    
];

// Set-up contract
const nftcontract = new ethers.Contract(address, abi, provider);

// Set-up connected contract
const nftcontract_connected = nftcontract.connect(wallet);

// Anonymous async function that will execute
(async () => {
    
    // Create 'block' event listener
    provider.on("block", async (blockNumber) => {
      
        // Collect block timestamp
        const mintEnabled = (await nftcontract_connected.mintEnabled());
        console.log("Block: ", blockNumber, ", mintEnabled: ", mintEnabled)
      
    })
})();