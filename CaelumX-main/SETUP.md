# CaelumX Mobile App Setup Instructions

This guide will help you set up the CaelumX React Native app with blockchain features and wallet connectivity.

## Prerequisites

- Node.js (v18+ recommended)
- Git
- Expo CLI or Expo Development Build
- iOS Simulator (macOS) or Android Emulator
- Physical device with Expo Go app (optional)
- Backend API running (see backend/SETUP.md)
- Local blockchain node (Hardhat) running

## Step-by-Step Setup

### 1. Install Expo CLI

```bash
# Install Expo CLI globally
npm install -g @expo/cli
```

### 2. Install Dependencies

```bash
cd CaelumX-main
npm install
```

### 3. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env
```

Edit the `.env` file with your specific values:

```env
# Backend API Configuration
EXPO_PUBLIC_API_URL="http://localhost:3000"

# Blockchain Configuration
EXPO_PUBLIC_ETHEREUM_RPC_URL="http://127.0.0.1:8545"
EXPO_PUBLIC_REGISTRY_CONTRACT_ADDRESS="your_deployed_contract_address"

# WalletConnect Configuration
EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID="your_walletconnect_project_id"

# Clerk Authentication (if used)
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"

# IPFS Configuration
EXPO_PUBLIC_IPFS_GATEWAY_URL="https://gateway.pinata.cloud/ipfs"

# App Configuration
EXPO_PUBLIC_APP_NAME="CaelumX"
EXPO_PUBLIC_APP_VERSION="1.0.0"
EXPO_PUBLIC_ENV="development"

# Network Configuration
EXPO_PUBLIC_CHAIN_ID="31337"  # Local hardhat network
EXPO_PUBLIC_NETWORK_NAME="Localhost"
```

### 4. WalletConnect Setup

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy the Project ID to your `.env` file

### 5. Clerk Authentication Setup (Optional)

If using Clerk for authentication:

1. Sign up at [Clerk](https://clerk.com/)
2. Create a new application
3. Copy the publishable key to your `.env` file

### 6. Start the Development Server

```bash
npm start
# or
expo start
```

### 7. Run on Device/Simulator

#### For iOS Simulator (macOS only)
1. Press `i` in the terminal
2. The app will open in iOS Simulator

#### For Android Emulator
1. Start your Android emulator
2. Press `a` in the terminal

#### For Physical Device
1. Install Expo Go app
2. Scan the QR code

**Note**: Use your computer's IP address instead of `localhost` for device testing:
```env
EXPO_PUBLIC_API_URL="http://192.168.1.100:3000"
EXPO_PUBLIC_ETHEREUM_RPC_URL="http://192.168.1.100:8545"
```

## Available Scripts

```bash
# Start development server
npm start
expo start

# Platform-specific start
npm run android
npm run ios
npm run web

# Clear cache
expo start --clear

# Reset project (if needed)
npm run reset-project

# Lint code
npm run lint
```

## Project Structure

```
CaelumX-main/
├── app/                 # Expo Router pages
│   ├── (tabs)/         # Tab navigation
│   ├── +html.tsx       # HTML template
│   └── _layout.tsx     # Root layout
├── components/         # React Native components
├── hooks/             # Custom React hooks
├── constants/         # App constants
├── assets/           # Images, fonts
├── scripts/          # Utility scripts
├── app.json          # Expo configuration
├── expo.json         # Expo configuration
└── package.json
```

## Key Features

CaelumX includes advanced blockchain features:

- **Wallet Integration**: WalletConnect for external wallet connection
- **Blockchain Interaction**: Direct smart contract interaction
- **Crypto Integration**: Ethers.js for blockchain operations
- **Authentication**: Clerk-based user authentication
- **IPFS Integration**: Decentralized file storage
- **Multi-chain Support**: Configurable for different networks

## Blockchain Integration

### Smart Contract Interaction

```typescript
import { ethers } from 'ethers';

const contractAddress = process.env.EXPO_PUBLIC_REGISTRY_CONTRACT_ADDRESS;
const rpcUrl = process.env.EXPO_PUBLIC_ETHEREUM_RPC_URL;

const provider = new ethers.JsonRpcProvider(rpcUrl);
const contract = new ethers.Contract(contractAddress, abi, provider);

// Example: Read from contract
const result = await contract.someMethod();

// Example: Write to contract (requires wallet)
const signer = provider.getSigner();
const contractWithSigner = contract.connect(signer);
const tx = await contractWithSigner.someWriteMethod();
await tx.wait();
```

### WalletConnect Integration

```typescript
import { WalletConnectModal } from '@walletconnect/modal-react-native';

const projectId = process.env.EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID;

const walletConnectModal = new WalletConnectModal({
  projectId,
  metadata: {
    name: 'CaelumX',
    description: 'Carbon Credits DApp',
    url: 'https://caelumx.com',
    icons: ['https://caelumx.com/icon.png']
  }
});

// Open wallet connection modal
await walletConnectModal.openModal();
```

## Development Guidelines

### Environment Variables

All environment variables must use the `EXPO_PUBLIC_` prefix:

```typescript
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const chainId = process.env.EXPO_PUBLIC_CHAIN_ID;
```

### Blockchain Development

1. Ensure Hardhat local node is running
2. Deploy contracts to local network
3. Update contract addresses in `.env`
4. Test blockchain interactions in app

### Authentication Flow

```typescript
import { useAuth } from '@clerk/clerk-expo';

function AuthenticatedScreen() {
  const { isSignedIn, user, signOut } = useAuth();
  
  if (!isSignedIn) {
    return <SignInScreen />;
  }
  
  return (
    <View>
      <Text>Welcome {user.firstName}!</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
```

## Common Issues & Solutions

### WalletConnect Connection Issues

```bash
# Clear WalletConnect cache
rm -rf node_modules/.cache
expo start --clear
```

### Blockchain Network Issues

Ensure your local Hardhat node is running:

```bash
cd blockchain
npx hardhat node
```

### Ethers.js React Native Issues

CaelumX uses Ethers v5 which has better React Native support:

```typescript
// Use ethers v5 syntax
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);
```

### Clerk Authentication Issues

Ensure your Clerk publishable key is correct and the domain is configured:

```typescript
import { ClerkProvider } from '@clerk/clerk-expo';

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      {/* Your app */}
    </ClerkProvider>
  );
}
```

## Testing

### Unit Testing

```bash
# Run tests
npm test

# Test blockchain functionality
npm run test:blockchain
```

### Integration Testing

```bash
# Test with local blockchain
npm run test:integration
```

## Production Build

### Configure for Production

Update environment variables for production networks:

```env
# Production blockchain network
EXPO_PUBLIC_ETHEREUM_RPC_URL="https://mainnet.infura.io/v3/YOUR_KEY"
EXPO_PUBLIC_CHAIN_ID="1"
EXPO_PUBLIC_NETWORK_NAME="Mainnet"

# Production contract addresses
EXPO_PUBLIC_REGISTRY_CONTRACT_ADDRESS="0x..."
```

### Build with EAS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for production
eas build --platform all --profile production
```

### App Store Configuration

Update `app.json` for production:

```json
{
  "expo": {
    "name": "CaelumX",
    "slug": "caelumx-carbon-credits",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "bundleIdentifier": "com.caelumx.carboncredits"
    },
    "android": {
      "package": "com.caelumx.carboncredits"
    }
  }
}
```

## Security Considerations

### Private Key Management

Never hardcode private keys in the app:

```typescript
// ❌ DON'T DO THIS
const privateKey = "0x1234...";

// ✅ DO THIS - Use wallet connections
const signer = await provider.getSigner();
```

### Environment Variables

Keep sensitive data in environment variables and never commit `.env` files:

```bash
# Add to .gitignore
.env
.env.local
.env.production
```

## Performance Optimization

### Bundle Size

Monitor and optimize bundle size:

```bash
# Analyze bundle
npx expo-bundle-analyzer

# Use selective imports
import { Button } from '@ui-kitten/components';
// Instead of: import * as UI from '@ui-kitten/components';
```

### Blockchain Calls

Optimize blockchain interactions:

```typescript
// Cache contract instances
const contractInstance = useMemo(() => 
  new ethers.Contract(address, abi, provider), 
  [address, provider]
);

// Batch multiple calls
const [balance, owner] = await Promise.all([
  contract.balanceOf(address),
  contract.owner()
]);
```

## Troubleshooting

### Common Error Messages

**"Network Error"**: Check your RPC URL and network connection
**"Contract not deployed"**: Ensure contracts are deployed to the correct network
**"WalletConnect timeout"**: Clear cache and restart development server
**"Clerk authentication failed"**: Verify your publishable key and network connection

### Debug Mode

Enable debug mode for detailed logging:

```env
EXPO_PUBLIC_DEBUG="true"
```

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [WalletConnect React Native](https://docs.walletconnect.com/2.0/reactnative/overview)
- [Ethers.js Documentation](https://docs.ethers.org/v5/)
- [Clerk React Native](https://clerk.com/docs/quickstarts/react-native)
- [UI Kitten Documentation](https://akveo.github.io/react-native-ui-kitten/)