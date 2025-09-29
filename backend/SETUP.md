# Backend Setup Instructions

This guide will help you set up the Node.js Express backend with Prisma and PostgreSQL.

## Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database (local or cloud)
- Git

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env
```

Edit the `.env` file with your specific values:

```env
# Database Configuration
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/carbon_credits_db"

# Blockchain Configuration
DEPLOYER_KEY="your_ethereum_private_key"
REGISTRY_ADDRESS="your_deployed_contract_address"

# IPFS Storage (Pinata)
JWT="your_pinata_jwt_token"

# Server Configuration
PORT=3000
NODE_ENV="development"
```

### 3. Database Setup

#### Option A: Local PostgreSQL

1. Install PostgreSQL on your system
2. Create a new database:
```sql
CREATE DATABASE carbon_credits_db;
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE carbon_credits_db TO your_username;
```

#### Option B: Cloud PostgreSQL (recommended)
- Use services like Supabase, Railway, or Neon
- Copy the connection string to your `.env` file

### 4. Prisma Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

### 5. Verify Database Schema

```bash
# View your database in Prisma Studio
npx prisma studio
```

This will open a web interface at `http://localhost:5555`

### 6. Get Pinata JWT Token

1. Sign up at [Pinata](https://pinata.cloud/)
2. Go to API Keys section
3. Create a new JWT token
4. Add it to your `.env` file

### 7. Start the Development Server

```bash
npm run dev
```

The server should start at `http://localhost:3000`

## API Endpoints

Once running, you can test these endpoints:

- `GET /` - Health check
- `POST /ngo` - Create NGO
- `POST /upload` - Upload project with files
- `GET /all` - Get all projects

## Testing the API

```bash
# Test health check
curl http://localhost:3000

# Create an NGO
curl -X POST http://localhost:3000/ngo \
  -H "Content-Type: application/json" \
  -d '{"name": "Test NGO", "email": "test@example.com"}'
```

## Common Issues & Solutions

### Database Connection Issues
- Verify PostgreSQL is running
- Check your DATABASE_URL format
- Ensure database exists and user has permissions

### Prisma Migration Errors
```bash
# Reset the database (WARNING: This will delete all data)
npx prisma migrate reset

# Force push schema changes
npx prisma db push
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run Prisma Studio
npx prisma studio

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset
```

## Project Structure

```
backend/
├── src/
│   ├── routes/
│   │   ├── project.ts    # Project-related routes
│   │   └── nccr.ts       # Additional routes
│   └── index.ts          # Main server file
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
├── uploads/              # Temporary file uploads
├── artifacts/            # Blockchain contract artifacts
├── .env.example          # Environment variables template
├── package.json
└── tsconfig.json
```

## Production Deployment

### Environment Variables
Ensure all production environment variables are set:
- Use production database URL
- Set NODE_ENV to "production"
- Use secure private keys
- Configure CORS origins

### Database Migration
```bash
npx prisma migrate deploy
```

### Process Management
Consider using PM2 or similar for process management:
```bash
npm install -g pm2
pm2 start npm --name "carbon-backend" -- start
```