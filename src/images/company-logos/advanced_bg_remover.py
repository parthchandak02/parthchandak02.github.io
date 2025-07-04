#!/usr/bin/env python3

import os
import sys
from pathlib import Path
import numpy as np
from PIL import Image

"""
Advanced Background Remover (Python)

Superior to JavaScript version for complex color filtering
Keeps white text, removes black text and backgrounds

Features:
- More precise color detection
- Advanced anti-aliasing handling  
- Better edge preservation
- Configurable thresholds
"""

# Configuration
INPUT_DIR = Path(__file__).parent / 'originals'
OUTPUT_DIR = Path(__file__).parent / 'processed-python'
WHITE_THRESHOLD = 200
BLACK_THRESHOLD = 50
ALPHA_THRESHOLD = 128

def install_dependencies():
    """Install required packages if not available"""
    required_packages = ['pillow', 'numpy']
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print(f"📦 Installing missing packages: {', '.join(missing_packages)}")
        import subprocess
        for package in missing_packages:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        print("✅ Dependencies installed successfully!")

def is_white_text(r, g, b):
    """Check if pixel represents white text"""
    return r > WHITE_THRESHOLD and g > WHITE_THRESHOLD and b > WHITE_THRESHOLD

def is_black_text(r, g, b):
    """Check if pixel represents black text"""
    return r < BLACK_THRESHOLD and g < BLACK_THRESHOLD and b < BLACK_THRESHOLD

def is_edge_pixel(data, x, y, width, height):
    """Check if pixel is on the edge of text (for anti-aliasing)"""
    if x == 0 or y == 0 or x == width-1 or y == height-1:
        return False
    
    # Check surrounding pixels for contrast
    current_idx = (y * width + x) * 4
    current_brightness = (data[current_idx] + data[current_idx+1] + data[current_idx+2]) / 3
    
    # Check 3x3 neighborhood
    for dy in [-1, 0, 1]:
        for dx in [-1, 0, 1]:
            if dx == 0 and dy == 0:
                continue
            
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height:
                neighbor_idx = (ny * width + nx) * 4
                neighbor_brightness = (data[neighbor_idx] + data[neighbor_idx+1] + data[neighbor_idx+2]) / 3
                
                # High contrast indicates edge
                if abs(current_brightness - neighbor_brightness) > 100:
                    return True
    
    return False

def process_image_advanced(input_path, output_path):
    """Process single image with advanced color filtering"""
    print(f"📐 Processing {input_path.name}: ", end="")
    
    # Load image
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size
    print(f"{width}x{height}px")
    
    # Convert to numpy array for faster processing
    data = np.array(img)
    
    # Create output array (copy of original)
    output_data = data.copy()
    
    # Statistics
    white_pixels = 0
    black_pixels = 0
    removed_pixels = 0
    edge_pixels = 0
    
    # Process each pixel
    for y in range(height):
        for x in range(width):
            r, g, b, a = data[y, x]
            
            # Skip already transparent pixels
            if a < ALPHA_THRESHOLD:
                continue
            
            # Flatten array for edge detection
            flat_data = data.flatten()
            
            if is_white_text(r, g, b):
                # Keep white text
                white_pixels += 1
            elif is_black_text(r, g, b):
                # Remove black text
                output_data[y, x] = [0, 0, 0, 0]
                black_pixels += 1
                removed_pixels += 1
            elif is_edge_pixel(flat_data, x, y, width, height):
                # Handle anti-aliased edges more carefully
                # If it's near white text, keep it with reduced opacity
                brightness = (r + g + b) / 3
                if brightness > 100:  # Grayish pixels near white text
                    output_data[y, x] = [r, g, b, int(a * 0.7)]  # Reduce opacity
                    edge_pixels += 1
                else:
                    output_data[y, x] = [0, 0, 0, 0]
                    removed_pixels += 1
            else:
                # Remove background/other colors
                output_data[y, x] = [0, 0, 0, 0]
                removed_pixels += 1
    
    # Convert back to PIL Image and save
    result_img = Image.fromarray(output_data, 'RGBA')
    result_img.save(output_path, 'PNG', optimize=True)
    
    # Statistics
    output_size = output_path.stat().st_size / 1024
    print(f"   ✅ → processed-python/{output_path.name} ({output_size:.1f}KB)")
    print(f"      📊 White pixels kept: {white_pixels:,}")
    print(f"      🎨 Edge pixels preserved: {edge_pixels:,}")
    print(f"      🗑️  Black/background removed: {removed_pixels:,}")

def main():
    print("🐍 Advanced Background Remover (Python) - Superior Color Filtering\n")
    
    # Install dependencies if needed
    try:
        install_dependencies()
    except Exception as e:
        print(f"❌ Failed to install dependencies: {e}")
        return
    
    # Create output directory
    OUTPUT_DIR.mkdir(exist_ok=True)
    print(f"✅ Output directory: {OUTPUT_DIR}")
    
    # Find PNG files
    png_files = list(INPUT_DIR.glob('*.png'))
    png_files = [f for f in png_files if not f.name.startswith('.')]
    
    if not png_files:
        print(f"❌ No PNG files found in {INPUT_DIR}")
        return
    
    print(f"\n📁 Found {len(png_files)} images to process:")
    for file in png_files:
        size_kb = file.stat().st_size / 1024
        print(f"   - {file.name} ({size_kb:.1f}KB)")
    
    print(f"\n🔄 Processing {len(png_files)} images with advanced Python filtering...\n")
    
    # Process each image
    for input_file in png_files:
        try:
            output_file = OUTPUT_DIR / input_file.name
            process_image_advanced(input_file, output_file)
        except Exception as e:
            print(f"   ❌ Error processing {input_file.name}: {e}")
    
    # Final summary
    processed_files = list(OUTPUT_DIR.glob('*.png'))
    print(f"\n🎉 Advanced processing complete!")
    print(f"📁 Input: {INPUT_DIR}")
    print(f"📁 Output: {OUTPUT_DIR}")
    print(f"\n📋 Processed images ({len(processed_files)}):")
    
    for file in processed_files:
        size_kb = file.stat().st_size / 1024
        print(f"   ✓ {file.name} ({size_kb:.1f}KB)")
    
    print(f"\n🎯 Python Result: Superior edge handling and color precision!")

if __name__ == "__main__":
    main() 