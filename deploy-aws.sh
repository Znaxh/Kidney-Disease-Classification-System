#!/bin/bash

# AWS Deployment Script for Kidney Disease Classification

echo "🚀 Deploying Kidney Disease Classification to AWS"
echo "================================================="

# Configuration
AWS_REGION="us-east-1"
ECR_REPO_BACKEND="kidney-classification-backend"
ECR_REPO_FRONTEND="kidney-classification-frontend"
ECS_CLUSTER="kidney-classification-cluster"
ECS_SERVICE_BACKEND="kidney-backend-service"
ECS_SERVICE_FRONTEND="kidney-frontend-service"

# Get AWS Account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

if [ -z "$AWS_ACCOUNT_ID" ]; then
    echo "❌ Error: Unable to get AWS Account ID. Please configure AWS CLI."
    exit 1
fi

echo "✅ AWS Account ID: $AWS_ACCOUNT_ID"
echo "✅ Region: $AWS_REGION"

# Function to create ECR repository
create_ecr_repo() {
    local repo_name=$1
    echo "📦 Creating ECR repository: $repo_name"
    
    aws ecr describe-repositories --repository-names $repo_name --region $AWS_REGION > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        aws ecr create-repository --repository-name $repo_name --region $AWS_REGION
        echo "✅ Created ECR repository: $repo_name"
    else
        echo "✅ ECR repository already exists: $repo_name"
    fi
}

# Function to build and push Docker image
build_and_push() {
    local context_dir=$1
    local repo_name=$2
    local dockerfile_path=$3
    
    echo "🔨 Building and pushing $repo_name..."
    
    # Get login token
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
    
    # Build image
    docker build -t $repo_name $context_dir -f $dockerfile_path
    
    # Tag image
    docker tag $repo_name:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$repo_name:latest
    
    # Push image
    docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$repo_name:latest
    
    echo "✅ Successfully pushed $repo_name"
}

# Create ECR repositories
create_ecr_repo $ECR_REPO_BACKEND
create_ecr_repo $ECR_REPO_FRONTEND

# Build and push backend
build_and_push "./Backend" $ECR_REPO_BACKEND "./Backend/Dockerfile"

# Build and push frontend
build_and_push "./Frontend" $ECR_REPO_FRONTEND "./Frontend/Dockerfile"

echo ""
echo "🎉 Deployment completed!"
echo "========================================"
echo "Backend Image: $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_BACKEND:latest"
echo "Frontend Image: $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_FRONTEND:latest"
echo ""
echo "Next steps:"
echo "1. Create ECS cluster: $ECS_CLUSTER"
echo "2. Create task definitions using the above images"
echo "3. Create ECS services"
echo "4. Set up Application Load Balancer"
echo "5. Configure domain and SSL certificate"
