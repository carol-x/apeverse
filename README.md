# apeverse
Customized OP rollup with apeverse utils including basic token, swap, and gaming functions. 

To start the game, go to `phaser` and run `npm install -g liteserver`, then start the web game with `liteserver`. 

Contracts are deployed in the custom Optimism L2 rollup. As a backup, the contracts are also deployed on Optimism Goerli. The contract addresses are as follows: 

- Custom verse token BNN (Banana): 0x09807229B0D53b7FE1d0E846bCd876E435A09840
- Placeholder apetoken APE: 0x0760458a5445663625da632d20C7401BE0659dDa
- Swap pool: 0xc2FD89697A285FB28a310935554A74D065081d92
- Governance contract with verse token: 0xA5A47025953AE0978C6C8906F9E47db021B74D0A

In order to host the L2 rollup, you need three terminals to run the node, geth, and sequencer through `op-geth`, `op-node`, and `op-batcher`. You can bridge some eth to our custom roll up through calling `cat Proxy__OVM_L1StandardBridge.json.json | grep \"address\":` and transfer some Goerli test ETH to the adress. More info can be found in [OP stack doc](https://stack.optimism.io/docs/build/getting-started/#run-op-geth). 
