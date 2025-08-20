/**

PRIVATE_KEY=<KEY...> /
RPC_URL="https://rpc.devnet.linea.build/" \
TO_ADDRESS="0xC257274276a4E539741Ca11b590B9447B26A8051" \
AMOUNT="0.01" \
npx ts-node send-eth.ts

*/

import { ethers } from "ethers";

async function sendETH() {
  const privateKey = process.env.PRIVATE_KEY;
  const rpcUrl = process.env.RPC_URL;
  const toAddress = process.env.TO_ADDRESS || "0xYourRecipientAddress";
  const amount = process.env.AMOUNT || "0"; // ETH amount

  if (!privateKey) {
    console.error("PRIVATE_KEY environment variable is required");
    process.exit(1);
  }

  if (!rpcUrl) {
    console.error("RPC_URL environment variable is required");
    process.exit(1);
  }

  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    console.log(`Sending ${amount} ETH from ${wallet.address} to ${toAddress}`);
    
    const tx = await wallet.sendTransaction({
      to: toAddress,
      value: ethers.parseEther(amount),
      // nonce: 2,
      type: 2,
      // maxPriorityFeePerGas: BigInt("0x6673708"),
      // maxFeePerGas: BigInt("0x6673708"),
      // gasLimit: BigInt("0x5208"),
      // chainId: 59139,
    });

    console.log(`Transaction sent: ${tx.hash}`);
    console.log("Waiting for confirmation...");

    const receipt = await tx.wait();
    console.log(`Transaction confirmed in block ${receipt?.blockNumber}`);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

sendETH();
