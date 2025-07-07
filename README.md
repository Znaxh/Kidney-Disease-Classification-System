# Kidney Disease Classification System

A comprehensive deep learning application for classifying kidney CT scan images to detect tumors. This project uses CNN (Convolutional Neural Network) with transfer learning, MLflow for experiment tracking, and DVC for data version control.

## 🎯 Project Overview

This application analyzes kidney CT scan images and classifies them into two categories:
- **Normal**: Healthy kidney tissue
- **Tumor**: Kidney tissue with tumor presence

The system consists of:
- **Backend**: Flask API with TensorFlow/Keras CNN model
- **Frontend**: React.js web interface with Vite and TailwindCSS
- **ML Pipeline**: Complete MLOps pipeline with MLflow and DVC

## 🏗️ Architecture

```
├── Backend/          # Flask API and ML pipeline
├── Frontend/         # React.js web application
├── model/           # Trained CNN model
├── artifacts/       # Training artifacts and data
└── config/          # Configuration files
```

## 🚀 Features

- **Image Classification**: Upload kidney CT scans for tumor detection
- **Real-time Prediction**: Instant classification results via REST API
- **Model Training**: Complete ML pipeline for retraining models
- **Experiment Tracking**: MLflow integration for model versioning
- **Data Versioning**: DVC for dataset management
- **Responsive UI**: Modern React interface with TailwindCSS

## 🛠️ Technologies Used

### Backend
- **TensorFlow/Keras**: Deep learning framework
- **Flask**: Web framework for API
- **MLflow**: Experiment tracking and model registry
- **DVC**: Data version control
- **VGG16**: Pre-trained model for transfer learning

### Frontend
- **React.js**: Frontend framework
- **Vite**: Build tool and development server
- **TailwindCSS**: Utility-first CSS framework

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- Git
- Conda (recommended)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/znaxh/Kidney-Disease-Classification.git
cd Kidney-Disease-Classification
```

### 2. Backend Setup

```bash
# Create conda environment
conda create -n kidney-classification python=3.8 -y
conda activate kidney-classification

# Install dependencies
cd Backend
pip install -r requirements.txt

# Run the Flask API
python app.py
```

The backend API will be available at `http://localhost:8080`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`


## 🔄 ML Pipeline Workflow

The machine learning pipeline consists of four main stages:

1. **Data Ingestion**: Download and prepare kidney CT scan dataset
2. **Base Model Preparation**: Setup VGG16 transfer learning model
3. **Model Training**: Train the CNN with data augmentation
4. **Model Evaluation**: Evaluate model performance and log metrics

### Running the Complete Pipeline

```bash
# Run the full training pipeline
python main.py

# Or run individual stages
python src/cnnClassifier/pipeline/stage_01_data_ingestion.py
python src/cnnClassifier/pipeline/stage_02_prepare_base_model.py
python src/cnnClassifier/pipeline/stage_03_model_training.py
python src/cnnClassifier/pipeline/stage_04_model_evaluation.py
```

## 📊 MLflow Integration

Track experiments and model performance with MLflow:

```bash
# Start MLflow UI
mlflow ui

# Access at http://localhost:5000
```

### DagHub Integration (Optional)

For remote experiment tracking:

```bash
export MLFLOW_TRACKING_URI=https://dagshub.com/your-username/Kidney-Disease-Classification.mlflow
export MLFLOW_TRACKING_USERNAME=your-username
export MLFLOW_TRACKING_PASSWORD=your-token
```

## 📈 DVC (Data Version Control)

Manage datasets and model versions:

```bash
# Initialize DVC
dvc init

# Reproduce the pipeline
dvc repro

# View pipeline DAG
dvc dag
```

## 🧪 API Endpoints

### Backend API (Flask)

- **GET** `/` - Health check and web interface
- **POST** `/predict` - Image classification endpoint
- **GET/POST** `/train` - Trigger model training

### Example API Usage

```python
import requests
import base64

# Encode image to base64
with open("kidney_scan.jpg", "rb") as image_file:
    encoded_image = base64.b64encode(image_file.read()).decode()

# Make prediction request
response = requests.post(
    "http://localhost:8080/predict",
    json={"image": encoded_image}
)

result = response.json()
print(f"Prediction: {result[0]['image']}")  # 'Normal' or 'Tumor'
```


## 🐳 Docker Deployment

### Build and Run with Docker

```bash
# Build the backend image
cd Backend
docker build -t kidney-classification-backend .

# Run the container
docker run -p 8080:8080 kidney-classification-backend

## 🧪 Testing

### Backend Tests
```bash
cd Backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd Frontend
npm test
```

## 📁 Project Structure

```
Kidney-Disease-Classification/
├── Backend/
│   ├── src/cnnClassifier/          # Main package
│   │   ├── components/             # ML components
│   │   ├── pipeline/               # Training pipelines
│   │   ├── config/                 # Configuration management
│   │   └── utils/                  # Utility functions
│   ├── config/                     # Config files
│   ├── model/                      # Trained models
│   ├── templates/                  # HTML templates
│   ├── app.py                      # Flask application
│   ├── main.py                     # Training pipeline
│   └── requirements.txt            # Python dependencies
├── Frontend/
│   ├── src/                        # React source code
│   ├── public/                     # Static assets
│   ├── package.json                # Node.js dependencies
│   └── vite.config.js              # Vite configuration
└── README.md                       # Project documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](Backend/LICENSE) file for details.

## 🙏 Acknowledgments

- VGG16 model from TensorFlow/Keras
- MLflow for experiment tracking
- DVC for data version control
- React and Vite for frontend development

## 📞 Support

For support and questions, please open an issue in the GitHub repository.
