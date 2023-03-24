//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";  

/* Custom token of the apeverse */
contract VerseToken is ERC20 {
    uint totalSupply; // total supply of the apeverse custom token 

    /* ERC 20 constructor takes in 2 strings, feel free to change the first string to the name of your token name, and the second string to the corresponding symbol for your custom token name */
    constructor(string memory _tokenName, string memory _tokenID, uint _initSupply) ERC20(_tokenName, _tokenID) {
        totalSupply = _initSupply; 
        _mint(msg.sender, totalSupply);
    }
}
