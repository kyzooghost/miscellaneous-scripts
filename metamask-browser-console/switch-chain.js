await window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0xaa36a7' }], // hex string; 0x1 = Ethereum mainnet
});

// Use https://chainlist.org/

// 0xaa36a7 - Ethereum Sepolia
// 0xe705 - Linea Sepolia
// 0xe708 - Linea
