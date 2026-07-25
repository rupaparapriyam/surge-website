import os
from PIL import Image

def analyze_image(path):
    if not os.path.exists(path):
        return f"{path} not found"
    img = Image.open(path)
    # Get basic pixel data
    pixels = list(img.getdata())
    width, height = img.size
    
    # Calculate average color
    r_sum, g_sum, b_sum = 0, 0, 0
    num_pixels = len(pixels)
    
    # Handle RGB vs RGBA vs Grayscale
    for p in pixels:
        if isinstance(p, tuple):
            r_sum += p[0]
            g_sum += p[1]
            b_sum += p[2]
        else:
            r_sum += p
            g_sum += p
            b_sum += p
            
    r_avg = r_sum / num_pixels
    g_avg = g_sum / num_pixels
    b_avg = b_sum / num_pixels
    
    return f"Size: {img.size}, Mode: {img.mode}, Average Color: ({r_avg:.2f}, {g_avg:.2f}, {b_avg:.2f})"

frames_dir = "/Users/priyamrupapara/developer/bussiness 1/surge branding/surge-store/SURGE coming soon webpage/assets/images/video_frames"
print("v4021_001:", analyze_image(os.path.join(frames_dir, "v4021_001.png")))
print("v4021_004:", analyze_image(os.path.join(frames_dir, "v4021_004.png")))
print("v4022_001:", analyze_image(os.path.join(frames_dir, "v4022_001.png")))
print("v4023_001:", analyze_image(os.path.join(frames_dir, "v4023_001.png")))
print("IMG_4020: ", analyze_image("/Users/priyamrupapara/developer/bussiness 1/surge branding/surge-store/SURGE coming soon webpage/assets/images/IMG_4020.jpg"))
