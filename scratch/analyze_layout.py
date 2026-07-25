import os
from PIL import Image

def analyze_layout(path):
    if not os.path.exists(path):
        return f"{path} not found"
    img = Image.open(path).convert('RGB')
    width, height = img.size
    
    # Analyze 3 horizontal regions (top, middle, bottom)
    h_third = height // 3
    w_half = width // 2
    
    regions = {
        "Top-Left": (0, 0, w_half, h_third),
        "Top-Right": (w_half, 0, width, h_third),
        "Mid-Left": (0, h_third, w_half, 2*h_third),
        "Mid-Right": (w_half, h_third, width, 2*h_third),
        "Bot-Left": (0, 2*h_third, w_half, height),
        "Bot-Right": (w_half, 2*h_third, width, height)
    }
    
    results = []
    for name, box in regions.items():
        cropped = img.crop(box)
        pixels = list(cropped.getdata())
        avg_color = tuple(sum(col) // len(pixels) for col in zip(*pixels))
        results.append(f"{name}: {avg_color}")
        
    return f"Size: {img.size}\n  " + "\n  ".join(results)

dest_dir = "/Users/priyamrupapara/developer/bussiness 1/surge branding/surge-store/SURGE coming soon webpage/assets/images"
for f in ["IMG_3921.jpg", "IMG_3922.jpg", "IMG_3923.jpg", "IMG_3924.jpg", "IMG_4020.jpg"]:
    print(f"--- {f} ---")
    print(analyze_layout(os.path.join(dest_dir, f)))
