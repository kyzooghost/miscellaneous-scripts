// Run in browser console with Metamask connected
const txParams = {
  to: '0x33bf916373159A8c1b54b025202517BfDbB7863D' // Replace
  from: ethereum.selectedAddress,
  data: 0x0000 // Replace
}

const result = await ethereum.request({
  method: "eth_call",
  params: [txParams]
});

console.log(result)
