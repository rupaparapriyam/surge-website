import os
from PIL import Image, ImageFilter

def analyze_shapes(path):
    if not os.path.exists(path):
        return f"{path} not found"
    img = Image.open(path).convert('L')
    # Resize for quick processing
    img = img.resize((100, 100))
    # Apply edge detection
    edges = img.filter(ImageFilter.FIND_EDGES)
    pixels = list(edges.getdata())
    edge_density = sum(p for p in pixels) / len(pixels)
    return f"Edge Density (0-255): {edge_density:.2f}"

frames_dir = "/Users/priyamrupapara/developer/bussiness 1/surge branding/surge-store/SURGE coming soon webpage/assets/images/video_frames"
print("v4021_001 edges:", analyze_shapes(os.path.join(frames_dir, "v4021_001.png")))
print("v4022_001 edges:", analyze_shapes(os.path.join(frames_dir, "v4022_001.png")))
print("v4023_001 edges:", analyze_shapes(os.path.join(frames_dir, "v4023_001.png")))
print("IMG_4020 edges: ", analyze_shapes("/Users/priyamrupapara/developer/bussiness 1/surge branding/surge-store/SURGE coming soon webpage/assets/images/IMG_4020.jpg"))
