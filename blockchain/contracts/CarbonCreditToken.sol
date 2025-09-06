// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCreditToken is ERC20, Ownable {
    address public registry; // BlueCarbonRegistry

    constructor() ERC20("Carbon Credit Token", "CCT") Ownable(msg.sender) {
        _mint(msg.sender, 1000 * 1e18); // optional premint to deployer
    }

    /// @notice Set registry contract (only once ideally)
    function setRegistry(address _registry) external onlyOwner {
        require(_registry != address(0), "Invalid address");
        registry = _registry;
    }

    /// @notice Mint credits (only registry can call)
    function mint(address to, uint256 amount) external {
        require(msg.sender == registry, "Not authorized");
        _mint(to, amount);
    }

    /// @notice Retire credits permanently (burn)
    function retire(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
