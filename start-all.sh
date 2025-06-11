#!/bin/bash

echo "🔧 Installing dependencies..."

# Install dependencies for AuthenticationService
echo "➡️ Backend/AuthenticationService"
cd Backend/AuthenticationService
npm install

# Install dependencies for GatewayService
echo "➡️ Backend/GatewayService"
cd ../GatewayService
npm install

# Install dependencies for Frontend
echo "➡️ Frontend"
cd ../../Frontend
npm install

cd ..

echo "🚀 Starting all services..."

# Start services in background
(cd Backend/AuthenticationService && node src/index.js) &
(cd Backend/GatewayService && node src/index.js) &
(cd Frontend && npm run dev) &
