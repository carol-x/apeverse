// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10; 

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";  
import "./verseToken.sol";

contract VersePool {

    address payable admin; 
    uint public tokenPoolSize; 
    uint public apecoinPoolSize; 
    uint private swapRatio; 
    VerseToken public tokenERC20; 
    VerseToken public apecoinERC20; 
    mapping(address => uint) verseTokenStaker;
    mapping(address => uint) apeTokenStaker;

    event TokenStaked(uint amount, address sender, uint when); 
    event TokenSwapped(uint amount, address sender, uint when);

    receive() external payable {}

    constructor(address _verseToken, address _apeToken, uint _swapConstant) payable {
        admin = payable(msg.sender); 
        tokenERC20 = VerseToken(_verseToken);
        apecoinERC20 = VerseToken(_apeToken); 
        swapRatio = _swapConstant; 
        admin = payable(msg.sender); 

        // let the contract have control of both tokens 
        tokenERC20.approve(address(this), tokenERC20.totalSupply());
        apecoinERC20.approve(address(this), apecoinERC20.totalSupply());
        tokenERC20.increaseAllowance(address(this), tokenERC20.totalSupply());
        apecoinERC20.increaseAllowance(address(this), apecoinERC20.totalSupply());
    }

    modifier onlyAdmin() {
        payable(msg.sender) == admin;
        _;
    }

    function setRatio(uint256 _ratio) public onlyAdmin {
        swapRatio = _ratio;
    }

    function swapIntoVerseToken(uint256 _amount) public returns (uint256) {
        require(_amount > 0, "Swap amount must be greater then zero");
        require(apecoinERC20.balanceOf(msg.sender) >= _amount, "Not enough tokens!");

        uint256 swapAmount = _amount * swapRatio;
        require(
            swapAmount > 0,
            "exchange Amount must be greater then zero"
        );

        require(
            tokenERC20.balanceOf(address(this)) > swapAmount,
            "The swap does not have enough token!"
        );

        apecoinERC20.transferFrom(msg.sender, address(this), _amount);
        tokenERC20.approve(address(msg.sender), swapAmount);
        tokenERC20.transferFrom(
            address(this),
            address(msg.sender),
            swapAmount
        );
        tokenPoolSize -= _amount; 
        apecoinPoolSize += swapAmount; 
        return swapAmount;
    }

    function swapOutOfVerseToken(uint256 _amount) public returns (uint256) {
        require(_amount > 0, "Swap amount must be greater then zero");
        require(tokenERC20.balanceOf(msg.sender) >= _amount, "Not enough tokens!");

        uint256 swapAmount = _amount / swapRatio;
        require(
            swapAmount > 0,
            "The swap does not have enough token!"
        );

        require(
            apecoinERC20.balanceOf(address(this)) > swapAmount,
            "currently the exchange doesnt have enough XYZ Tokens, please retry later :=("
        );

        tokenERC20.transferFrom(msg.sender, address(this), _amount);
        apecoinERC20.approve(address(msg.sender), swapAmount);
        apecoinERC20.transferFrom(
            address(this),
            address(msg.sender),
            swapAmount
        );
        tokenPoolSize += _amount; 
        apecoinPoolSize -= swapAmount; 
        return swapAmount;
    }

    function stakeToken(bool isVerseToken, uint _amount) public payable {
        require(_amount > 0, "Payment has to be greater than 0!"); 
        
        if (isVerseToken) {
            require(tokenERC20.balanceOf(msg.sender) >= _amount, "Not enough tokens!");
            tokenERC20.transferFrom(msg.sender, address(this), _amount); 
            verseTokenStaker[msg.sender] = verseTokenStaker[msg.sender] + _amount;
            tokenPoolSize += _amount; 
        } else {
            require(apecoinERC20.balanceOf(msg.sender) >= _amount, "Not enough tokens!");
            apecoinERC20.transferFrom(msg.sender, address(this), _amount); 
            apeTokenStaker[msg.sender] = apeTokenStaker[msg.sender] + _amount;
            apecoinPoolSize += _amount; 
        }

        emit TokenStaked(_amount, msg.sender, block.timestamp); 
    }
}
