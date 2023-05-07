claim_frog(2)

async function claim_frog (INSERT_FROG_ID_HERE) {

    const hex_converted_id = (INSERT_FROG_ID_HERE).toString(16).padStart(4, '0');

    const transactionParameters = {
        gasPrice: '0x174876E800', // 100 gwei gas price
        gas: '0x30d40', // 200,000 gas limit
        to: '0xd668a2e001f3385b8bbc5a8682ac3c0d83c19122', // KingFrogs contract address
        from: ethereum.selectedAddress, // must match user's active address.
        data: `0x04d25fb900000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000${hex_converted_id}`,
      };
      
      ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error);
}