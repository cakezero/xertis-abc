// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;


contract Wallet {
    address public owner;

    error EmptyBalance();

    constructor() {
        owner = msg.sender;
    }

    function withdraw() onlyOwner external {
        uint amount = address(this).balance;
        if (amount == 0) revert EmptyBalance();

        (bool sent, ) = owner.call{value: amount}("");
        require(sent, "Unabale to send mint earnings");
    }

    receive() external payable {}

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner can perform this operation");
        _;
    }
}