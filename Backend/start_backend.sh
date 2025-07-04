#!/bin/bash

# Kidney Disease Classification - Backend Startup Script

echo "🚀 Starting Kidney Disease Classification Backend..."
echo "📍 Current directory: $(pwd)"

# Check if pyenv is available
if command -v pyenv &> /dev/null; then
    echo "✅ pyenv found"
    
    # Activate the environment
    echo "🔄 Activating pyenv environment 'myenv'..."
    eval "$(pyenv init -)"
    pyenv activate myenv
    
    # Check Python version
    echo "🐍 Python version: $(python --version)"
    
    # Install required packages if not already installed
    echo "📦 Installing/checking required packages..."
    pip install fastapi uvicorn python-multipart pydantic tensorflow pandas numpy python-box pyyaml ensure joblib types-pyyaml scipy gdown mlflow dvc notebook matplotlib seaborn tqdm
    
    # Install the local package
    echo "📦 Installing cnnClassifier package..."
    pip install -e .
    
    # Start the FastAPI server
    echo "🌟 Starting FastAPI server on http://localhost:8080"
    echo "📚 API Documentation available at http://localhost:8080/docs"
    echo "🔄 Alternative docs at http://localhost:8080/redoc"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "=================================="
    
    uvicorn app:app --host 0.0.0.0 --port 8080 --reload
    
else
    echo "❌ pyenv not found. Please install pyenv or run manually:"
    echo "   pyenv activate myenv"
    echo "   python app.py"
fi
