# Mobile App Setup Instructions

This guide will help you set up the React Native mobile app using Expo.

## Prerequisites

- Node.js (v18+ recommended)
- Git
- Expo CLI or Expo Development Build
- iOS Simulator (macOS) or Android Emulator
- Physical device with Expo Go app (optional)
- Backend API running (see backend/SETUP.md)

## Step-by-Step Setup

### 1. Install Expo CLI

```bash
# Install Expo CLI globally
npm install -g @expo/cli

# Or use npx without global installation
npx create-expo-app --help
```

### 2. Install Dependencies

```bash
cd app
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

# IPFS Configuration
EXPO_PUBLIC_IPFS_GATEWAY_URL="https://gateway.pinata.cloud/ipfs"

# App Configuration
EXPO_PUBLIC_APP_NAME="Carbon Credits Tracker"
EXPO_PUBLIC_APP_VERSION="1.0.0"
EXPO_PUBLIC_ENV="development"
```

**Note**: For iOS Simulator to access localhost, use your computer's IP address instead of `localhost`:
```env
EXPO_PUBLIC_API_URL="http://192.168.1.100:3000"
```

### 4. Start the Development Server

```bash
npm start
# or
expo start
```

This will open the Expo Developer Tools in your browser.

### 5. Run on Device/Simulator

#### Option A: Expo Go (Recommended for Development)
1. Install Expo Go app on your mobile device
2. Scan the QR code from the terminal or browser
3. The app will load on your device

#### Option B: iOS Simulator (macOS only)
1. Press `i` in the terminal
2. The app will open in iOS Simulator

#### Option C: Android Emulator
1. Start your Android emulator
2. Press `a` in the terminal
3. The app will install and run on the emulator

## Available Scripts

```bash
# Start development server
npm start
expo start

# Start with specific platform
npm run android
npm run ios
npm run web

# Clear cache and restart
expo start --clear

# Run tests
npm test

# Build for production
expo build:android
expo build:ios
```

## Project Structure

```
app/
├── app/                 # Expo Router pages (file-based routing)
│   ├── (tabs)/         # Tab navigation pages
│   ├── +html.tsx       # HTML template
│   ├── +not-found.tsx  # 404 page
│   └── _layout.tsx     # Root layout
├── components/         # Reusable React Native components
├── hooks/             # Custom React hooks
├── constants/         # App constants and theme
├── assets/           # Images, fonts, etc.
├── app.json          # Expo configuration
├── package.json
└── tsconfig.json
```

## Key Features

The mobile app includes:

- **Carbon Credit Tracking**: View and track carbon credits
- **Project Management**: Browse carbon offset projects
- **Native UI Components**: React Native Paper, UI Kitten
- **Date Pickers**: Native date selection
- **Responsive Design**: Works on phones and tablets
- **Offline Support**: Basic offline capabilities

## Development Guidelines

### Using Environment Variables

Access environment variables in your code:

```typescript
const API_URL = process.env.EXPO_PUBLIC_API_URL;

// For API calls
const response = await fetch(`${API_URL}/projects`);
```

### Navigation with Expo Router

Expo Router provides file-based routing:

```typescript
// Navigate programmatically
import { router } from 'expo-router';

const handlePress = () => {
  router.push('/profile');
};

// Link component
import { Link } from 'expo-router';

<Link href="/profile">Go to Profile</Link>
```

### API Integration

Example API service:

```typescript
// services/api.ts
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const apiService = {
  async fetchProjects() {
    const response = await fetch(`${API_BASE_URL}/all`);
    return response.json();
  },
  
  async createNGO(data: NGOData) {
    const response = await fetch(`${API_BASE_URL}/ngo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
};
```

## Common Issues & Solutions

### Metro Bundler Issues

```bash
# Clear Metro cache
expo start --clear

# Reset Metro cache manually
rm -rf node_modules/.cache
npm start
```

### iOS Simulator Not Connecting to Backend

Use your computer's IP address instead of `localhost`:

```bash
# Find your IP address
ifconfig | grep "inet " | grep -v 127.0.0.1

# Update .env file
EXPO_PUBLIC_API_URL="http://192.168.1.XXX:3000"
```

### Android Emulator Network Issues

Enable network bridge in Android emulator settings or use adb port forwarding:

```bash
adb reverse tcp:3000 tcp:3000
```

### Package Compatibility Issues

```bash
# Check for outdated packages
npx expo doctor

# Update Expo SDK
npx expo upgrade

# Fix peer dependency issues
npx expo install --fix
```

## UI Libraries

The app uses several UI libraries:

### React Native Paper
```typescript
import { Button, Card, Title } from 'react-native-paper';

<Card>
  <Card.Content>
    <Title>Carbon Credits</Title>
    <Button mode="contained">View Details</Button>
  </Card.Content>
</Card>
```

### UI Kitten
```typescript
import { Layout, Text, Button } from '@ui-kitten/components';

<Layout style={{ flex: 1, padding: 16 }}>
  <Text category="h1">Welcome</Text>
  <Button>Get Started</Button>
</Layout>
```

### NativeWind (TailwindCSS for React Native)
```typescript
import { View, Text } from 'react-native';

<View className="flex-1 bg-green-50 p-4">
  <Text className="text-2xl font-bold text-green-800">
    Carbon Credits
  </Text>
</View>
```

## Testing

### Unit Testing with Jest

```bash
# Install testing dependencies
npm install -D jest @testing-library/react-native

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

### E2E Testing with Maestro

```bash
# Install Maestro
curl -Ls "https://get.maestro.mobile.dev" | bash

# Run E2E tests
maestro test .maestro/
```

## Production Build

### Build with EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Build with Classic Build

```bash
# Build APK for Android
expo build:android -t apk

# Build for iOS
expo build:ios
```

## Deployment

### Expo Application Services (EAS)

```bash
# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

### Over-the-Air (OTA) Updates

```bash
# Publish updates
expo publish

# Or with EAS Update
eas update
```

## Performance Optimization

### Bundle Size Optimization

```bash
# Analyze bundle size
npx expo-bundle-analyzer

# Enable Hermes for Android (in app.json)
{
  "expo": {
    "android": {
      "enableHermes": true
    }
  }
}
```

### Image Optimization

```bash
# Install expo-image for better performance
expo install expo-image

# Use in components
import { Image } from 'expo-image';

<Image 
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
/>
```

## Platform-Specific Code

```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
  },
});

// Platform-specific files
// component.ios.tsx
// component.android.tsx
```

## Debugging

### React Native Debugger

```bash
# Install React Native Debugger
# Enable Remote Debugging in Expo Developer Menu
# Connect to http://localhost:8081/debugger-ui/
```

### Flipper Integration

```bash
# Install Flipper desktop app
# Add Flipper plugins for network, Redux, etc.
```

## Device Support

- **iOS**: iOS 11.0+
- **Android**: Android 5.0+ (API level 21+)
- **Tablets**: Full tablet support
- **Web**: Limited web support via Expo for Web