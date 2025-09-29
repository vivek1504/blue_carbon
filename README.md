# 🌊 Carbon Credits - Blue Carbon Ecosystem

A comprehensive full-stack blockchain-based platform for managing blue carbon credits from mangrove, seagrass, salt marsh, and tidal wetland restoration projects.

## 🏗️ Architecture Overview

This project consists of multiple interconnected components:

```
├── app/                 # React Native mobile app (Expo)
├── Admin_Panel/        # Vite + React admin dashboard
├── backend/            # Express.js + Prisma backend API
├── blockchain/         # Hardhat smart contracts
└── README.md           # This file
```

### Technology Stack

- **Mobile Apps**: React Native + Expo + TypeScript
- **Admin Panel**: Vite + React + TypeScript + TailwindCSS
- **Backend**: Node.js + Express.js + Prisma + PostgreSQL
- **Blockchain**: Hardhat + Ethers.js + Solidity
- **Storage**: IPFS (Pinata) for file storage
- **Database**: PostgreSQL

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- Git
- Expo CLI (for mobile development)
- Yarn or npm

### 1. Clone and Setup

```bash
git clone <repository-url>
cd carbon
```

### 2. Environment Setup

Copy the example environment files and configure them:

```bash
# Backend
cp backend/.env.example backend/.env

# Admin Panel
cp Admin_Panel/.env.example Admin_Panel/.env

# Mobile App
cp app/.env.example app/.env

# CaelumX Mobile App
cp CaelumX-main/.env.example CaelumX-main/.env

# Blockchain
cp blockchain/.env.example blockchain/.env
```

Edit each `.env` file with your specific configuration values.

### 3. Database Setup

```bash
cd backend
npm install
npx prisma migrate dev
npx prisma generate
cd ..
```

### 4. Install Dependencies

```bash
# Backend
cd backend && npm install && cd ..

# Admin Panel
cd Admin_Panel && npm install && cd ..

# Mobile App
cd app && npm install && cd ..

# Blockchain
cd blockchain && npm install && cd ..
```

## 🏃‍♂️ Running the Applications

### Backend API Server

```bash
cd backend
npm run dev
# Server runs on http://localhost:3000
```

### Admin Panel

```bash
cd Admin_Panel
npm run dev
# Admin panel runs on http://localhost:5173
```

### Mobile App (Expo)

```bash
cd app
npm start
# Follow Expo CLI instructions to run on device/simulator
```

### Blockchain Development

```bash
cd blockchain
npx hardhat compile
npx hardhat node          # Start local blockchain
npx hardhat run scripts/deploy.ts --network localhost
```

## 📱 Components Description

### Mobile App (`/app`)
- **Technology**: React Native + Expo
- **Features**: Carbon credit tracking, project management
- **UI Library**: React Native Paper, UI Kitten, NativeWind

### Admin Panel (`/Admin_Panel`)
- **Technology**: Vite + React + TypeScript
- **Features**: Project management dashboard, analytics
- **Styling**: TailwindCSS
- **API**: Axios for backend communication

### Backend API (`/backend`)
- **Technology**: Node.js + Express.js + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Features**: 
  - NGO management
  - Project CRUD operations
  - File upload to IPFS (Pinata)
  - Blockchain integration
  - Metadata hashing

### Blockchain (`/blockchain`)
- **Technology**: Hardhat + Solidity
- **Features**: Blue carbon registry smart contracts
- **Network**: Local development, configurable for testnets/mainnet

## 🔧 Configuration

### Backend Environment Variables

```env
DATABASE_URL=postgresql://username:password@localhost:5432/carbon_db
DEPLOYER_KEY=your_private_key
REGISTRY_ADDRESS=deployed_contract_address
JWT=pinata_jwt_token
PORT=3000
```

### Mobile App Environment Variables

Mobile apps may require specific configuration for:
- API endpoints
- Blockchain network settings
- Third-party service keys

### Admin Panel Environment Variables

```env
VITE_API_URL=http://localhost:3000
```

## 📊 Database Schema

The system tracks:
- **NGOs**: Organizations managing carbon projects
- **Projects**: Blue carbon restoration initiatives
- **Types**: MANGROVE, SEAGRASS, SALTMARSH, TIDAL_WETLANDS
- **File Storage**: IPFS CIDs for project documentation
- **Blockchain Integration**: Transaction hashes and metadata

## 🔐 Security Features

- Environment variable configuration
- JWT token authentication with Pinata
- Blockchain transaction signing
- Secure file upload handling
- Database relationship integrity

## 🛠️ Development

### Code Structure

```
backend/
├── src/
│   ├── routes/          # API routes
│   ├── prisma/          # Database schema
│   └── uploads/         # Temporary file storage
├── artifacts/           # Blockchain contract artifacts
└── package.json

Admin_Panel/
├── src/                 # React components and pages
├── public/              # Static assets
└── vite.config.ts       # Vite configuration

app/
├── app/                 # Expo Router pages
├── components/          # Reusable components
└── package.json

### API Endpoints

- `POST /ngo` - Create NGO
- `POST /upload` - Upload project with files
- `GET /all` - Get all projects

### Smart Contract Integration

The backend integrates with a BlueCarbonRegistry smart contract for:
- Project registration on blockchain
- Metadata hash storage
- IPFS CID management

## 🚦 Production Deployment

### Backend Deployment

1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment

1. Build admin panel: `npm run build`
2. Deploy static files to CDN/hosting service
3. Configure API endpoints

### Mobile App Deployment

1. Configure app.json/expo.json
2. Build with EAS Build or Expo CLI
3. Deploy to App Store/Play Store

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
