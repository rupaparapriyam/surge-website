import os
from PIL import Image

def analyze_motion(prefix):
    frames_dir = "/Users/priyamrupapara/developer/bussiness 1/surge branding/surge-store/SURGE coming soon webpage/assets/images/video_frames"
    frames = sorted([f for f in os.listdir(frames_dir) if f.startswith(prefix)])
    
    print(f"Motion analysis for {prefix} ({len(frames)} frames):")
    for i, f in enumerate(frames):
        img = Image.open(os.path.join(frames_dir, f)).convert('RGB')
        # Get pixels with high intensity (indicating bright lines or circles on dark background)
        pixels = list(img.getdata())
        bright_pixels = [idx for idx, p in enumerate(pixels) if sum(p) > 200] # threshold for bright shapes
        if bright_pixels:
            min_y = min(bright_pixels) // img.width
            max_y = max(bright_pixels) // img.width
            min_x = min(idx % img.width for idx in bright_pixels)
            max_x = max(idx % img.width for idx in bright_pixels)
            print(f"  Frame {i+1} ({f}): Bounding Box of bright shapes: X:[{min_x}, {max_x}], Y:[{min_y}, {max_y}] (total={len(bright_pixels)})")
        else:
            print(f"  Frame {i+1} ({f}): No bright shapes found")

analyze_motion("v4021_")
analyze_motion("v4022_")
analyze_motion("v4023_")
