// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10; 

import "./IERC20.sol"; 

contract VersePool {
    using SafeMath  for uint;

    address payable admin; 
    uint public tokenPoolSize; 
    uint public apecoinPoolSize; 
    uint private swapRatio; 
    IERC20 public tokenERC20; 
    IERC20 public apecoinERC20; 
    mapping(address => uint) stakerList;

    event TokenStaked(uint amount, address sender, uint when); 
    event TokenSwapped(uint amount, address sender, uint when);

    receive() external payable {}

    constructor(address _tokenAddress, uint _swapConstant) payable {
        admin = payable(msg.sender); 
        tokenERC20 = IERC20(_tokenAddress); 
        swapConstant = _swapConstant; 

        // let the contract have control of both tokens 
        tokenERC20.approve(address(this), tokenERC20.totalSupply());
        apecoinERC20.approve(address(this), apecoinERC20.totalSupply());
    }

    modifier onlyAdmin() {
        payable(msg.sender) == admin;
        _;
    }

    function stakeToken() public payable {
        require(msg.value > 0, "Payment has to be greater than 0!"); 
        require(msg.sender.balance > msg.value, "You don't have enough token to pay");

        payable(this).transfer(msg.value); 
        emit TokenStaked(msg.value, msg.sender, block.timestamp); 

        tokenPoolSize += msg.value; 
        stakerList[msg.sender] = stakerList[msg.sender] + msg.value; 
    }

    function swapToken() public payable {
        // basic x+y=k swap function 
        uint 
    }
}