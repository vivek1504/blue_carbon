# Blockchain Setup Instructions

This guide will help you set up the Hardhat development environment and deploy the blue carbon smart contracts.

## Prerequisites

- Node.js (v18+ recommended)
- Git
- Basic understanding of Ethereum and smart contracts

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd blockchain
npm install
```

### 2. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env
```

Edit the `.env` file with your specific values:

```env
# Private Keys (NEVER commit real private keys!)
DEPLOYER_PRIVATE_KEY="your_private_key_here_for_deployment"
OWNER_PRIVATE_KEY="your_owner_private_key_here"

# Network Configuration - Mainnet/Testnet RPCs
ETHEREUM_RPC_URL="https://eth-mainnet.alchemyapi.io/v2/your_api_key"
SEPOLIA_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/your_api_key"

# API Keys for Blockchain Services
ALCHEMY_API_KEY="your_alchemy_api_key"
ETHERSCAN_API_KEY="your_etherscan_api_key"

# Contract Deployment Configuration
GAS_PRICE="20000000000"  # 20 gwei
GAS_LIMIT="6000000"

# Hardhat Network Configuration
HARDHAT_CHAIN_ID="31337"
HARDHAT_RPC_URL="http://127.0.0.1:8545"
```

### 3. Generate Development Private Keys

For development, generate test private keys:

```bash
# Generate a new wallet (for development only)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add the generated key to your `.env` file with `0x` prefix:
```env
DEPLOYER_PRIVATE_KEY="0xYOUR_GENERATED_KEY_HERE"
```

### 4. Start Local Blockchain Node

```bash
# Start Hardhat local node
npx hardhat node
```

This will start a local Ethereum node at `http://127.0.0.1:8545` with 20 pre-funded accounts.

### 5. Compile Smart Contracts

In a new terminal:

```bash
# Compile contracts
npx hardhat compile
```

This creates the `artifacts/` directory with compiled contract ABIs and bytecode.

### 6. Deploy Contracts to Local Network

```bash
# Deploy to local network
npx hardhat run scripts/deploy.ts --network localhost
```

Save the deployed contract addresses for use in other components.

## Available Scripts

```bash
# Compile contracts
npx hardhat compile

# Start local blockchain node
npx hardhat node

# Deploy contracts
npx hardhat run scripts/deploy.ts --network <network>

# Run tests
npx hardhat test

# Clean artifacts
npx hardhat clean

# Get help
npx hardhat help

# Verify contracts (for testnets/mainnet)
npx hardhat verify --network <network> <address> <constructor-args>
```

## Project Structure

```
blockchain/
├── contracts/              # Solidity smart contracts
│   ├── BlueCarbonRegistry.sol
│   └── CarbonCreditToken.sol
├── scripts/                # Deployment scripts
│   └── deploy.ts
├── test/                   # Contract tests
├── artifacts/              # Compiled contracts (generated)
├── cache/                  # Hardhat cache (generated)
├── typechain-types/        # TypeScript types (generated)
├── hardhat.config.js       # Hardhat configuration
├── .env.example            # Environment template
└── package.json
```

## Smart Contracts Overview

### BlueCarbonRegistry.sol
Main registry contract for managing blue carbon projects:
- Project creation and management
- IPFS CID storage
- Metadata hash validation
- Access control

### CarbonCreditToken.sol (if present)
ERC-20 token for carbon credits:
- Minting carbon credits
- Transfer restrictions
- Burnability for offset claims

## Development Workflow

### 1. Local Development

```bash
# Terminal 1: Start local node
npx hardhat node

# Terminal 2: Deploy contracts
npx hardhat run scripts/deploy.ts --network localhost

# Terminal 3: Start backend with deployed addresses
cd ../backend
# Update REGISTRY_ADDRESS in .env
npm run dev
```

### 2. Contract Interaction

Example interaction script:

```typescript
// scripts/interact.ts
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  // Get deployed contract
  const registryAddress = "YOUR_DEPLOYED_ADDRESS";
  const Registry = await ethers.getContractFactory("BlueCarbonRegistry");
  const registry = Registry.attach(registryAddress);
  
  // Example interaction
  const projectHash = ethers.utils.formatBytes32String("test-project");
  const ipfsCids = ["QmTest123", "QmTest456"];
  
  const tx = await registry.createProject(projectHash, ipfsCids);
  await tx.wait();
  
  console.log("Project created:", tx.hash);
}

main().catch(console.error);
```

Run the interaction script:
```bash
npx hardhat run scripts/interact.ts --network localhost
```

## Testing

### Writing Tests

```typescript
// test/BlueCarbonRegistry.test.ts
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BlueCarbonRegistry", function () {
  let registry: any;
  let owner: any;
  
  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    
    const Registry = await ethers.getContractFactory("BlueCarbonRegistry");
    registry = await Registry.deploy();
    await registry.deployed();
  });
  
  it("Should create a project", async function () {
    const projectHash = ethers.utils.formatBytes32String("test");
    const ipfsCids = ["QmTest123"];
    
    await expect(registry.createProject(projectHash, ipfsCids))
      .to.emit(registry, "ProjectCreated");
  });
});
```

### Running Tests

```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/BlueCarbonRegistry.test.ts

# Run tests with gas reporting
REPORT_GAS=true npx hardhat test

# Run tests with coverage
npx hardhat coverage
```

## Deployment to Testnets

### 1. Configure Network

Update `hardhat.config.js`:

```javascript
networks: {
  sepolia: {
    url: process.env.SEPOLIA_RPC_URL,
    accounts: [process.env.DEPLOYER_PRIVATE_KEY]
  },
  mainnet: {
    url: process.env.ETHEREUM_RPC_URL,
    accounts: [process.env.DEPLOYER_PRIVATE_KEY]
  }
}
```

### 2. Deploy to Testnet

```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.ts --network sepolia
```

### 3. Verify Contracts

```bash
# Verify on Etherscan
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

## Security Considerations

### Private Key Management

```bash
# Never commit private keys to version control
echo ".env" >> .gitignore

# Use hardware wallets for mainnet deployments
# Consider using Gnosis Safe for multisig deployments
```

### Contract Security

```solidity
// Use OpenZeppelin contracts
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Implement proper access control
modifier onlyOwner() {
    require(msg.sender == owner, "Not authorized");
    _;
}

// Use SafeMath for arithmetic operations (Solidity <0.8.0)
// Built-in overflow protection in Solidity 0.8.0+
```

### Gas Optimization

```solidity
// Pack struct variables efficiently
struct Project {
    uint128 credits;    // Instead of uint256
    uint128 timestamp;  // Pack into single storage slot
    address owner;      // 20 bytes
    bool active;        // 1 byte - packed with address
}

// Use events for data storage when possible
event ProjectCreated(
    bytes32 indexed projectHash,
    string[] ipfsCids
);
```

## Common Issues & Solutions

### Compilation Errors

```bash
# Clear cache and recompile
npx hardhat clean
npx hardhat compile

# Update Solidity version in hardhat.config.js
solidity: {
  version: "0.8.19",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
```

### Network Connection Issues

```bash
# Check RPC URL is accessible
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' \
  YOUR_RPC_URL

# Verify private key format (should start with 0x)
DEPLOYER_PRIVATE_KEY="0xYOUR_PRIVATE_KEY"
```

### Gas Estimation Errors

```javascript
// Manually set gas limit
const tx = await contract.someMethod({
  gasLimit: 500000,
  gasPrice: ethers.utils.parseUnits('20', 'gwei')
});
```

## Production Deployment Checklist

- [ ] Security audit completed
- [ ] All tests passing
- [ ] Gas optimization implemented
- [ ] Documentation updated
- [ ] Testnet deployment successful
- [ ] Contract verification working
- [ ] Frontend integration tested
- [ ] Backup deployment strategy ready

## Monitoring & Maintenance

### Contract Events Monitoring

```typescript
// Monitor contract events
const filter = registry.filters.ProjectCreated();
registry.on(filter, (projectHash, ipfsCids, event) => {
  console.log('New project created:', projectHash);
});
```

### Gas Price Monitoring

```bash
# Install eth-gas-reporter
npm install --save-dev eth-gas-reporter

# Add to hardhat.config.js
gasReporter: {
  enabled: true,
  currency: 'USD',
  gasPrice: 20
}
```

## Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Ethereum Development Documentation](https://ethereum.org/en/developers/docs/)
- [Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)