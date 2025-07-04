from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
import asyncio
import time
from typing import Dict, Any, Optional
from cnnClassifier.utils.common import decodeImage
from cnnClassifier.pipeline.prediction import PredictionPipeline
import base64

# Set environment variables
os.putenv('LANG', 'en_US.UTF-8')
os.putenv('LC_ALL', 'en_US.UTF-8')

# Initialize FastAPI app
app = FastAPI(
    title="Kidney Disease Classification API",
    description="AI-powered kidney disease classification from CT scan images using CNN",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React dev server
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "*"  # Allow all origins for development
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class ImageRequest(BaseModel):
    image: str

class PredictionResponse(BaseModel):
    prediction: str
    confidence: Optional[float] = None
    processing_time: float
    status: str = "success"

class TrainingResponse(BaseModel):
    message: str
    status: str

class HealthResponse(BaseModel):
    status: str
    message: str
    timestamp: str

class ClientApp:
    def __init__(self):
        self.filename = "inputImage.jpg"
        self.classifier = PredictionPipeline(self.filename)

# Initialize the client app
clApp = ClientApp()

@app.get("/", response_model=Dict[str, str])
async def root():
    """
    Root endpoint with API information
    """
    return {
        "message": "Kidney Disease Classification API",
        "status": "running",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint
    """
    from datetime import datetime
    return HealthResponse(
        status="healthy",
        message="Kidney Disease Classification API is running",
        timestamp=datetime.now().isoformat()
    )

async def run_training():
    """
    Async function to run training pipeline
    """
    try:
        process = await asyncio.create_subprocess_exec(
            "python", "main.py",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()

        if process.returncode == 0:
            return {"status": "success", "message": "Training completed successfully!"}
        else:
            return {"status": "error", "message": f"Training failed: {stderr.decode()}"}
    except Exception as e:
        return {"status": "error", "message": f"Training error: {str(e)}"}

@app.post("/train", response_model=TrainingResponse)
async def train_model(background_tasks: BackgroundTasks):
    """
    Trigger model training pipeline
    """
    try:
        # Add training task to background
        background_tasks.add_task(run_training)
        return TrainingResponse(
            message="Training started in background. Check logs for progress.",
            status="started"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start training: {str(e)}")

@app.post("/predict", response_model=PredictionResponse)
async def predict_image(request: ImageRequest):
    """
    Predict kidney disease from uploaded image
    """
    try:
        start_time = time.time()

        # Decode and save image
        decodeImage(request.image, clApp.filename)

        # Make prediction
        result = clApp.classifier.predict()

        processing_time = time.time() - start_time

        # Extract prediction from result
        prediction = result[0]["image"] if result and len(result) > 0 else "Unknown"

        return PredictionResponse(
            prediction=prediction,
            processing_time=round(processing_time, 2),
            status="success"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.get("/model-info")
async def get_model_info():
    """
    Get information about the current model
    """
    return {
        "model_type": "CNN with VGG16 Transfer Learning",
        "input_size": "224x224x3",
        "classes": ["Normal", "Tumor"],
        "framework": "TensorFlow/Keras",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=False)


