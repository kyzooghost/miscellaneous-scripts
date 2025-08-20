// Run in browser console with Metamask connected
const txParams = {
  to: "0x450839F9882A910F6D4FC8Bd243405b99C27806f", // Replace
  from: ethereum.selectedAddress,
  data: "0x8da5cb5b" // Replace
}

const result = await ethereum.request({
  method: "eth_call",
  params: [txParams]
});

console.log(result)
