import os
from PIL import Image

def image_to_ascii(path, width=80):
    if not os.path.exists(path):
        return f"{path} not found"
    img = Image.open(path).convert('L')
    # Resize to width, height keeping aspect ratio
    aspect = img.height / img.width
    height = int(width * aspect * 0.5) # 0.5 factor because console characters are taller than wide
    img = img.resize((width, height))
    
    chars = " .:-=+*#%@"
    num_chars = len(chars)
    
    lines = []
    for y in range(height):
        line = ""
        for x in range(width):
            val = img.getpixel((x, y))
            char_idx = int((val / 255.0) * (num_chars - 1))
            line += chars[char_idx]
        lines.append(line)
        
    return "\n".join(lines)

assets_dir = "/Users/priyamrupapara/developer/bussiness 1/surge branding/surge-store/SURGE coming soon webpage/assets/images"
for f in ["IMG_3921.jpg", "IMG_3922.jpg", "IMG_3923.jpg", "IMG_3924.jpg"]:
    ascii_art = image_to_ascii(os.path.join(assets_dir, f), width=60)
    print(f"=== {f} ===")
    print(ascii_art[:1500]) # Print first 1500 chars
