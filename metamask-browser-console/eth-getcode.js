// Run in browser console with Metamask connected
const address = "0xB72f8B32B1E0216E9A3a54475dac85158679d716"

const result = await ethereum.request({
  method: "eth_getCode",
  params: [address, "latest"]
});

console.log(result)
