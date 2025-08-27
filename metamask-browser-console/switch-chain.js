await window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0xaa36a7' }], // hex string; 0x1 = Ethereum mainnet
});

// Use https://chainlist.org/
