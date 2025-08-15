curl https://docs-demo.quiknode.pro/ \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_chainId","params":[],"id":1,"jsonrpc":"2.0"}'

curl https://rpc.devnet.linea.build \
  --header 'Content-Type: application/json' \
  --data '{
      "jsonrpc": "2.0",
      "method": "linea_estimateGas",
      "params": [
          {
              "from": "0xC3A8e1b76Cf0aF5cBD6981a034EA1B9c623cbE4c",
              "to": "0xC3A8e1b76Cf0aF5cBD6981a034EA1B9c623cbE4c",
              "data": "0x"
          }
      ],
      "id": 1
  }'

curl https://rpc.devnet.linea.build \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getBalance","params":["0xC257274276a4E539741Ca11b590B9447B26A8051", "latest"],"id":1,"jsonrpc":"2.0"}'

curl https://rpc.devnet.linea.build \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getTransactionReceipt","params":["0x6c8d21097f8146818f5702332d50c543e90f9b816c1b99274b49c97df8bcc43c"],"id":1,"jsonrpc":"2.0"}'
