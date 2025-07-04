#!/bin/bash

# Kidney Disease Classification - Complete Project Startup Script

echo "🏥 Kidney Disease Classification System"
echo "======================================="
echo ""

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to start backend
start_backend() {
    echo "🔧 Starting FastAPI Backend..."
    cd Backend
    
    # Check if port 8080 is already in use
    if check_port 8080; then
        echo "⚠️  Port 8080 is already in use. Backend might already be running."
        echo "   Check http://localhost:8080/health"
    else
        echo "🚀 Starting backend on port 8080..."
        ./start_backend.sh &
        BACKEND_PID=$!
        echo "   Backend PID: $BACKEND_PID"
    fi
    
    cd ..
}

# Function to start frontend
start_frontend() {
    echo "🎨 Starting React Frontend..."
    cd Frontend
    
    # Check if port 5173 is already in use
    if check_port 5173; then
        echo "⚠️  Port 5173 is already in use. Frontend might already be running."
        echo "   Check http://localhost:5173"
    else
        echo "🚀 Starting frontend on port 5173..."
        ./start_frontend.sh &
        FRONTEND_PID=$!
        echo "   Frontend PID: $FRONTEND_PID"
    fi
    
    cd ..
}

# Function to wait for services
wait_for_services() {
    echo ""
    echo "⏳ Waiting for services to start..."
    sleep 5
    
    # Check backend
    echo "🔍 Checking backend health..."
    for i in {1..10}; do
        if curl -s http://localhost:8080/health > /dev/null 2>&1; then
            echo "✅ Backend is healthy at http://localhost:8080"
            break
        else
            echo "   Attempt $i/10: Backend not ready yet..."
            sleep 2
        fi
    done
    
    # Check frontend
    echo "🔍 Checking frontend..."
    for i in {1..10}; do
        if curl -s http://localhost:5173 > /dev/null 2>&1; then
            echo "✅ Frontend is ready at http://localhost:5173"
            break
        else
            echo "   Attempt $i/10: Frontend not ready yet..."
            sleep 2
        fi
    done
}

# Function to show status
show_status() {
    echo ""
    echo "🌟 Kidney Disease Classification System Status"
    echo "=============================================="
    echo ""
    
    if curl -s http://localhost:8080/health > /dev/null 2>&1; then
        echo "✅ Backend (FastAPI): http://localhost:8080"
        echo "   📚 API Docs: http://localhost:8080/docs"
        echo "   📖 ReDoc: http://localhost:8080/redoc"
    else
        echo "❌ Backend: Not running"
    fi
    
    if curl -s http://localhost:5173 > /dev/null 2>&1; then
        echo "✅ Frontend (React): http://localhost:5173"
    else
        echo "❌ Frontend: Not running"
    fi
    
    echo ""
    echo "🎯 Quick Start:"
    echo "   1. Open http://localhost:5173 in your browser"
    echo "   2. Upload a kidney CT scan image"
    echo "   3. Get AI-powered classification results"
    echo ""
    echo "🛑 To stop all services: Ctrl+C or run 'pkill -f uvicorn && pkill -f vite'"
}

# Main execution
echo "🚀 Starting complete system..."
echo ""

# Start services
start_backend
sleep 3
start_frontend

# Wait and check
wait_for_services

# Show final status
show_status

# Keep script running
echo ""
echo "📝 Logs will appear below. Press Ctrl+C to stop all services."
echo "=============================================================="

# Wait for user interrupt
trap 'echo ""; echo "🛑 Stopping services..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0' INT

# Keep the script running
while true; do
    sleep 1
done
