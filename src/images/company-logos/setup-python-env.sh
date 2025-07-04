#!/bin/bash

# Setup Python Environment for Advanced Background Removal
# Creates temporary venv that won't be committed to git

set -e

echo "🐍 Setting up Python environment for advanced background removal..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not found. Please install Python 3."
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$SCRIPT_DIR/temp-python-env"

echo "📁 Working directory: $SCRIPT_DIR"
echo "🗂️  Virtual environment: $VENV_DIR"

# Remove existing venv if it exists
if [ -d "$VENV_DIR" ]; then
    echo "🧹 Removing existing virtual environment..."
    rm -rf "$VENV_DIR"
fi

# Create new virtual environment
echo "📦 Creating new virtual environment..."
python3 -m venv "$VENV_DIR"

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source "$VENV_DIR/bin/activate"

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install required packages
echo "📚 Installing required packages..."
pip install pillow numpy

echo ""
echo "✅ Python environment setup complete!"
echo ""
echo "🚀 To run the advanced background remover:"
echo "   1. cd $(basename "$SCRIPT_DIR")"
echo "   2. source temp-python-env/bin/activate"
echo "   3. python3 advanced_bg_remover.py"
echo ""
echo "🧹 To clean up when done:"
echo "   rm -rf temp-python-env"
echo ""

# Create/update .gitignore to exclude the temp venv
GITIGNORE_FILE="$SCRIPT_DIR/.gitignore"
if [ ! -f "$GITIGNORE_FILE" ]; then
    echo "📝 Creating .gitignore..."
    cat > "$GITIGNORE_FILE" << EOF
# Temporary Python virtual environment
temp-python-env/
*.pyc
__pycache__/
.DS_Store

# Processed images (keep originals only)
processed-*/
EOF
else
    # Add to existing .gitignore if not already present
    if ! grep -q "temp-python-env/" "$GITIGNORE_FILE"; then
        echo "📝 Updating .gitignore..."
        echo "" >> "$GITIGNORE_FILE"
        echo "# Temporary Python virtual environment" >> "$GITIGNORE_FILE"
        echo "temp-python-env/" >> "$GITIGNORE_FILE"
    fi
fi

echo "🔒 Virtual environment excluded from git via .gitignore"
echo ""
echo "🎯 Ready to process images! The Python version offers:"
echo "   ✅ Superior edge detection and anti-aliasing handling"
echo "   ✅ More precise color threshold controls"
echo "   ✅ Better performance for large images"
echo "   ✅ Advanced statistics and debugging info" 