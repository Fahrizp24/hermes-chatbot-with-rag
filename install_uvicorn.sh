#!/bin/bash
set -e
echo "Installing uvicorn..."
.venv/bin/pip3 install uvicorn
echo "Verifying uvicorn installation..."
.venv/bin/python3 -c "import uvicorn; print('uvicorn imported successfully')"
echo "All packages ready!"