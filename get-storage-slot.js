const slot = "0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103";
const proxyAddress = "0x33bf916373159A8c1b54b025202517BfDbB7863D";

const result = await ethereum.request({
  method: "eth_getStorageAt",
  params: [proxyAddress, slot, "latest"]
});

console.log(result)
