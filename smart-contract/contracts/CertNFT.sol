// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CertNFT is ERC721URIStorage {
    string public baseURI;
    uint public currentTokenId;
    bool public canMint;

    address public owner;
    uint public mintPrice;
    address wallet;

    error CallNoPriceMint();
    error CallPriceMint();
    error EmptyBalance();
    error MintHasBeenPaused();
    error SendRequiredAmount(uint amount);

    constructor(string memory name, string memory symbol, uint _mintPrice, address _wallet) ERC721(name, symbol) {
        canMint = true;
        mintPrice = _mintPrice;
        owner = msg.sender;
        wallet = _wallet;
    }

    function NoPriceMint(string memory metadataURI) external {
        if (canMint == false) revert MintHasBeenPaused();
        if (mintPrice > 0) revert CallPriceMint();

        uint newTokenId = ++currentTokenId;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, metadataURI);
    }

    function priceMint(string memory metadataURI) external payable {
        if (canMint == false) revert MintHasBeenPaused();
        if (mintPrice == 0) revert CallNoPriceMint();

        if (msg.value < mintPrice) revert SendRequiredAmount(mintPrice);

        uint newTokenId = ++currentTokenId;
        
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, metadataURI);
        
        withdraw(); // will add a check later on before calling the withdraw function
    }

    function setMint() external onlyOwner {
        canMint = !canMint;
    }

    function withdraw() internal {
        uint amount = address(this).balance;
        if (amount == 0) revert EmptyBalance();

        (bool sent, ) = wallet.call{value: amount}("");
        require(sent, "Unabale to send mint earnings");
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseURI = newBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    receive() external payable {}

    modifier onlyOwner() {
        require(msg.sender == owner, "You can't perform this operation");
        _;
    }
}
