#!/bin/bash

# Kidney Disease Classification - Frontend Startup Script

echo "🚀 Starting Kidney Disease Classification Frontend..."
echo "📍 Current directory: $(pwd)"

# Check if Node.js is available
if command -v node &> /dev/null; then
    echo "✅ Node.js found: $(node --version)"
    echo "✅ npm found: $(npm --version)"
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing dependencies..."
        npm install
    else
        echo "📦 Dependencies already installed"
    fi
    
    # Check if backend is running
    echo "🔍 Checking if backend is running on port 8080..."
    if curl -s http://localhost:8080/health > /dev/null 2>&1; then
        echo "✅ Backend is running and accessible"
    else
        echo "⚠️  Backend not detected on port 8080"
        echo "   Please start the backend first by running:"
        echo "   cd ../Backend && ./start_backend.sh"
        echo ""
        echo "   Or manually:"
        echo "   pyenv activate myenv"
        echo "   cd Backend"
        echo "   python app.py"
        echo ""
    fi
    
    # Start the development server
    echo "🌟 Starting React development server..."
    echo "🌐 Frontend will be available at http://localhost:5173"
    echo "🔗 Make sure backend is running at http://localhost:8080"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "=================================="
    
    npm run dev
    
else
    echo "❌ Node.js not found. Please install Node.js first:"
    echo "   https://nodejs.org/"
fi
