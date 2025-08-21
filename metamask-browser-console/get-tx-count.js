// Run in browser console with Metamask connected
const address = "0x228466F2C715CbEC05dEAbfAc040ce3619d7CF0B"

const result = await ethereum.request({
  method: "eth_getTransactionCount",
  params: [address, "latest"]
});

console.log(result)
