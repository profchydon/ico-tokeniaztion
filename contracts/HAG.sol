pragma solidity ^0.6.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract HAG is ERC20, ERC20Detailed {
    constructor(uint256 initialSupply) ERC20Detailed("HaggleX Token", "HAG", 0) public {
        _mint(msg.sender, initialSupply);
    }
}