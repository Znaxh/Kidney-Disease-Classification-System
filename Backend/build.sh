#!/bin/bash
# Railway build script

echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Installing local package..."
pip install -e .

echo "Build completed successfully!"
