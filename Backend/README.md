# Kidney Disease Classification - Backend

Flask-based REST API for kidney disease classification using deep learning with TensorFlow/Keras.

## 🎯 Overview

The backend provides a complete machine learning pipeline for kidney CT scan image classification, including:
- CNN model training with VGG16 transfer learning
- REST API for image prediction
- MLflow experiment tracking
- DVC data version control
- Modular pipeline architecture

## 🏗️ Architecture

```
Backend/
├── src/cnnClassifier/              # Main package
│   ├── components/                 # ML components
│   │   ├── data_ingestion.py      # Data loading and preprocessing
│   │   ├── prepare_base_model.py  # VGG16 model preparation
│   │   ├── model_training.py      # Training logic
│   │   └── model_evaluation_mlflow.py # Evaluation with MLflow
│   ├── pipeline/                   # Training pipelines
│   │   ├── stage_01_data_ingestion.py
│   │   ├── stage_02_prepare_base_model.py
│   │   ├── stage_03_model_training.py
│   │   ├── stage_04_model_evaluation.py
│   │   └── prediction.py          # Inference pipeline
│   ├── config/                     # Configuration management
│   │   └── configuration.py       # Config loader
│   ├── entity/                     # Data classes
│   │   └── config_entity.py       # Configuration entities
│   └── utils/                      # Utility functions
│       └── common.py              # Common utilities
├── config/                         # Configuration files
│   └── config.yaml                # Main configuration
├── model/                          # Trained models
│   └── model.h5                   # Trained CNN model
├── templates/                      # HTML templates
│   └── index.html                 # Web interface
├── app.py                         # Flask application
├── main.py                        # Training pipeline entry point
├── params.yaml                    # Model parameters
├── dvc.yaml                       # DVC pipeline definition
└── requirements.txt               # Python dependencies
```

## 🚀 Quick Start

### 1. Environment Setup

```bash
# Create conda environment
conda create -n kidney-classification python=3.8 -y
conda activate kidney-classification

# Install dependencies
pip install -r requirements.txt
```

### 2. Configuration

Update configuration files as needed:
- `config/config.yaml` - Main configuration
- `params.yaml` - Model hyperparameters

### 3. Run Training Pipeline

```bash
# Run complete pipeline
python main.py

# Or run individual stages
python src/cnnClassifier/pipeline/stage_01_data_ingestion.py
python src/cnnClassifier/pipeline/stage_02_prepare_base_model.py
python src/cnnClassifier/pipeline/stage_03_model_training.py
python src/cnnClassifier/pipeline/stage_04_model_evaluation.py
```

### 4. Start API Server

```bash
python app.py
```

The API will be available at `http://localhost:8080`

## 🔌 API Endpoints

### Health Check
```http
GET /
```
Returns the web interface for testing.

### Image Prediction
```http
POST /predict
Content-Type: application/json

{
    "image": "base64_encoded_image_string"
}
```

**Response:**
```json
[{"image": "Normal"}]  // or "Tumor"
```

### Model Training
```http
GET /train
POST /train
```
Triggers the complete training pipeline.

## 🧠 Model Details

### Architecture
- **Base Model**: VGG16 (pre-trained on ImageNet)
- **Transfer Learning**: Fine-tuned for kidney classification
- **Input Size**: 224x224x3 (RGB images)
- **Classes**: 2 (Normal, Tumor)
- **Optimizer**: Adam with learning rate 0.01

### Training Parameters
```yaml
IMAGE_SIZE: [224, 224, 3]
BATCH_SIZE: 16
EPOCHS: 1
CLASSES: 2
WEIGHTS: imagenet
LEARNING_RATE: 0.01
AUGMENTATION: True
```

### Data Augmentation
- Rotation: ±40 degrees
- Horizontal flip
- Width/Height shift: ±20%
- Shear: ±20%
- Zoom: ±20%

## 📊 MLflow Integration

### Start MLflow UI
```bash
mlflow ui
```
Access at `http://localhost:5000`

### Remote Tracking (DagHub)
```bash
export MLFLOW_TRACKING_URI=https://dagshub.com/username/repo.mlflow
export MLFLOW_TRACKING_USERNAME=username
export MLFLOW_TRACKING_PASSWORD=token
```

## 📈 DVC Pipeline

### Initialize DVC
```bash
dvc init
```

### Run Pipeline
```bash
dvc repro
```

### View Pipeline DAG
```bash
dvc dag
```

## 🐳 Docker Support

### Build Image
```bash
docker build -t kidney-classification-backend .
```

### Run Container
```bash
docker run -p 8080:8080 kidney-classification-backend
```

## 🧪 Testing

### Unit Tests
```bash
python -m pytest tests/
```

### API Testing
```bash
# Test prediction endpoint
curl -X POST http://localhost:8080/predict \
  -H "Content-Type: application/json" \
  -d '{"image": "base64_encoded_image"}'
```

## 📁 Key Files

- **`app.py`**: Flask application with API endpoints
- **`main.py`**: Training pipeline orchestrator
- **`src/cnnClassifier/pipeline/prediction.py`**: Inference pipeline
- **`config/config.yaml`**: Main configuration file
- **`params.yaml`**: Model hyperparameters
- **`dvc.yaml`**: DVC pipeline definition

## 🔧 Configuration

### Model Parameters (`params.yaml`)
```yaml
AUGMENTATION: True
IMAGE_SIZE: [224, 224, 3]
BATCH_SIZE: 16
INCLUDE_TOP: False
EPOCHS: 1
CLASSES: 2
WEIGHTS: imagenet
LEARNING_RATE: 0.01
```

### Pipeline Configuration (`config/config.yaml`)
Contains paths and settings for:
- Data ingestion
- Model preparation
- Training configuration
- Evaluation settings

## 🚨 Troubleshooting

### Common Issues

1. **Memory Error during training**
   - Reduce batch size in `params.yaml`
   - Use smaller image size

2. **Model not found error**
   - Ensure training pipeline completed successfully
   - Check `model/model.h5` exists

3. **Import errors**
   - Verify all dependencies installed: `pip install -r requirements.txt`
   - Check Python path includes project root

## 📄 Dependencies

Key dependencies:
- **TensorFlow 2.12.0**: Deep learning framework
- **Flask**: Web framework
- **MLflow 2.2.2**: Experiment tracking
- **DVC**: Data version control
- **Flask-Cors**: Cross-origin resource sharing
- **Pandas**: Data manipulation
- **NumPy**: Numerical computing

See `requirements.txt` for complete list.

## 🤝 Contributing

1. Follow PEP 8 style guidelines
2. Add unit tests for new features
3. Update documentation
4. Test API endpoints thoroughly

## 📞 Support

For backend-specific issues, check:
1. Flask application logs
2. MLflow tracking UI
3. DVC pipeline status
4. Model training logs