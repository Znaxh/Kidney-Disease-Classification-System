from fastapi import FastAPI
from pydantic import BaseModel
import os
from datetime import datetime

# Simple test app
app = FastAPI(title="Test API")

class HealthResponse(BaseModel):
    status: str
    message: str
    timestamp: str

@app.get("/")
async def root():
    return {"message": "Test API is working"}

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="healthy",
        message="Test API is running",
        timestamp=datetime.now().isoformat()
    )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
