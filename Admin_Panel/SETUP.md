# Admin Panel Setup Instructions

This guide will help you set up the React + Vite admin dashboard with TailwindCSS.

## Prerequisites

- Node.js (v18+ recommended)
- Git
- Backend API running (see backend/SETUP.md)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd Admin_Panel
npm install
```

### 2. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env
```

Edit the `.env` file with your specific values:

```env
# Backend API Configuration
VITE_API_URL="http://localhost:3000"

# Blockchain Configuration
VITE_ETHEREUM_RPC_URL="http://127.0.0.1:8545"
VITE_REGISTRY_CONTRACT_ADDRESS="your_deployed_contract_address"

# IPFS Gateway Configuration
VITE_IPFS_GATEWAY_URL="https://gateway.pinata.cloud/ipfs"

# Development Configuration
VITE_APP_NAME="Carbon Credits Admin Panel"
VITE_APP_VERSION="1.0.0"
```

### 3. Start the Development Server

```bash
npm run dev
```

The admin panel should start at `http://localhost:5173`

### 4. Verify Backend Connection

1. Open the admin panel in your browser
2. Check the browser console for any connection errors
3. Ensure the backend API is running at the URL specified in VITE_API_URL

## Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Project Structure

```
Admin_Panel/
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── styles/         # CSS and styling files
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # TailwindCSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json
```

## Features

The admin panel provides:

- **Dashboard Overview**: Summary of projects and statistics
- **Project Management**: View, create, and manage carbon credit projects
- **NGO Management**: Manage NGO organizations
- **File Management**: View and manage uploaded project files
- **Blockchain Integration**: View transaction status and contract interactions

## Development Guidelines

### Adding New Components

1. Create components in the `src/components/` directory
2. Use TypeScript for type safety
3. Follow the existing naming conventions
4. Use TailwindCSS for styling

### API Integration

The admin panel communicates with the backend API using Axios. Example:

```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example API call
export const fetchProjects = async () => {
  const response = await api.get('/all');
  return response.data;
};
```

### Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the frontend:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Common Issues & Solutions

### Backend Connection Failed
- Verify the backend is running at the correct URL
- Check CORS configuration in the backend
- Ensure VITE_API_URL is set correctly

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run tsc --noEmit
```

### Hot Module Replacement Not Working
```bash
# Restart the dev server
npm run dev
```

## Production Build

### Building for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Preview Production Build

```bash
npm run preview
```

### Environment Variables for Production

Create a `.env.production` file:

```env
VITE_API_URL="https://your-backend-api.com"
VITE_ETHEREUM_RPC_URL="https://your-ethereum-rpc.com"
VITE_REGISTRY_CONTRACT_ADDRESS="your_production_contract_address"
```

### Deployment Options

#### Static Hosting (Netlify, Vercel, GitHub Pages)
```bash
npm run build
# Deploy the dist/ folder
```

#### Docker
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## TailwindCSS Configuration

The project uses TailwindCSS for styling. Key configuration:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for the carbon credits theme
        carbon: {
          50: '#f0f9f0',
          500: '#22c55e',
          900: '#14532d',
        }
      }
    },
  },
  plugins: [],
}
```

## Testing

Add testing capabilities:

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm run test
```

## Performance Optimization

- Use React.lazy() for code splitting
- Optimize images in the public/ folder
- Use React.memo() for expensive components
- Implement proper error boundaries

## Browser Support

The admin panel supports:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+