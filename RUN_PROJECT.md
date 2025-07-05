# 🚀 KidneyAI - Disease Classification System

## 🌐 Live Application

The application is now deployed and accessible online:

- **Frontend (Main App)**: https://kidney-ai.vercel.app

## 🏠 Local Development

### Backend Setup (FastAPI)
```bash
cd Backend

# Activate your Python environment
pyenv activate myenv  # or your preferred environment

# Install dependencies
pip install -r requirements.txt

# Install the local package
pip install -e .

# Start the server
python app.py
# OR
uvicorn app:app --host 0.0.0.0 --port 8080 --reload
```

### Frontend Setup (React + Vite)
```bash
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Manual Setup (If Scripts Don't Work)

### Backend Setup
```bash
# Activate your pyenv environment
pyenv activate myenv

# Navigate to backend
cd Backend

# Install dependencies
pip install fastapi uvicorn python-multipart pydantic tensorflow pandas numpy python-box pyyaml ensure joblib

# Install the local package
pip install -e .

# Start the server
python app.py
# OR
uvicorn app:app --host 0.0.0.0 --port 8080 --reload
```

### Frontend Setup
```bash
# Navigate to frontend
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## �️ Clean Project Structure

```
Kidney-Disease-Classification/
├── Backend/                 # FastAPI backend server
│   ├── src/cnnClassifier/  # ML pipeline source code
│   ├── model/              # Trained ML model (model.h5)
│   ├── config/             # Configuration files
│   ├── artifacts/          # Training artifacts
│   ├── app.py              # Main FastAPI application
│   ├── requirements.txt    # Python dependencies
│   ├── Procfile           # Railway deployment config
│   └── railway.json       # Railway settings
├── Frontend/               # React.js frontend
│   ├── src/                # React components and logic
│   │   ├── hooks/          # Custom React hooks
│   │   ├── App.jsx         # Main application
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   │   ├── kidney-icon.svg # Custom app icon
│   │   └── manifest.json   # PWA manifest
│   ├── package.json        # Dependencies
│   └── vercel.json         # Vercel deployment config
└── RUN_PROJECT.md          # This file
```

## �🌐 Access the Application

Once both services are running:

- **Frontend (Main App)**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/docs
- **Alternative API Docs**: http://localhost:8080/redoc

## 🎯 How to Use

1. **Open the Frontend**: Go to http://localhost:5173
2. **Upload Image**: Drag & drop or click to upload a kidney CT scan
3. **Get Results**: The AI will analyze and classify the image
4. **View Details**: See technical details and recommendations

## 🔧 Troubleshooting

### Backend Issues
- **Module not found**: Make sure you activated `pyenv activate myenv`
- **Port 8080 in use**: Kill existing process with `pkill -f uvicorn`
- **TensorFlow issues**: Ensure you're using Python 3.8-3.11 in your pyenv

### Frontend Issues
- **Port 5173 in use**: Kill existing process with `pkill -f vite`
- **Dependencies missing**: Run `npm install` in Frontend directory
- **API connection failed**: Ensure backend is running on port 8080

### General Issues
- **CORS errors**: Backend is configured to allow frontend connections
- **File upload fails**: Check file size (max 10MB) and format (JPG, PNG)

## 🛑 Stopping the Services

### If using start_project.sh
- Press `Ctrl+C` in the terminal

### Manual stop
```bash
# Stop all services
pkill -f uvicorn
pkill -f vite

# Or find and kill specific processes
lsof -ti:8080 | xargs kill
lsof -ti:5173 | xargs kill
```

## 📁 Project Structure

```
Kidney-Disease-Classification/
├── Backend/                 # FastAPI backend
│   ├── app.py              # Main FastAPI application
│   ├── start_backend.sh    # Backend startup script
│   └── src/cnnClassifier/  # ML pipeline code
├── Frontend/               # React frontend
│   ├── src/App.jsx        # Main React component
│   ├── start_frontend.sh  # Frontend startup script
│   └── package.json       # Node.js dependencies
└── start_project.sh       # Master startup script
```

## 🎨 Features

- **Modern UI**: Beautiful, responsive React interface
- **Drag & Drop**: Easy image upload
- **Real-time Analysis**: Instant AI classification
- **Professional Design**: Medical-grade interface
- **API Documentation**: Interactive Swagger docs
- **Cross-platform**: Works on Windows, Mac, Linux

## 🔗 API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `POST /predict` - Image classification
- `POST /train` - Start model training
- `GET /model-info` - Model information
- `GET /docs` - Interactive API documentation

Enjoy using the Kidney Disease Classification System! 🏥✨
