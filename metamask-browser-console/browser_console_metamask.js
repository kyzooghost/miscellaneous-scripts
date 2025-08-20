
const transactionParameters = {
    // gasPrice: '0x174876E800', // 100 gwei gas price
    // gas: '0x30d40', // 200,000 gas limit
    to: '0xd668a2e001f3385b8bbc5a8682ac3c0d83c19122', // KingFrogs contract address
    from: ethereum.selectedAddress, // must match user's active address.
    data: "<INSERT_DESIRED_TX_DATA",
  };
  
  ethereum
  .request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
  })
  .then((txHash) => console.log(txHash))
  .catch((error) => console.error);