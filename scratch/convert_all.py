import os
import subprocess

def convert_heic_to_jpg(heic_path, out_path):
    if not os.path.exists(heic_path):
        return f"{heic_path} not found"
    try:
        subprocess.run(["sips", "-s", "format", "jpeg", heic_path, "--out", out_path], check=True)
        return f"Converted {heic_path} to {out_path}"
    except Exception as e:
        return f"Error converting {heic_path}: {e}"

def convert_png_to_jpg(png_path, out_path):
    if not os.path.exists(png_path):
        return f"{png_path} not found"
    try:
        subprocess.run(["sips", "-s", "format", "jpeg", png_path, "--out", out_path], check=True)
        return f"Converted {png_path} to {out_path}"
    except Exception as e:
        return f"Error converting {png_path}: {e}"

downloads_dir = "/Users/priyamrupapara/Downloads"
out_dir = "/Users/priyamrupapara/developer/bussiness 1/surge branding/surge-store/SURGE coming soon webpage/assets/images"

os.makedirs(out_dir, exist_ok=True)

# Convert first 4 images
print(convert_png_to_jpg(os.path.join(downloads_dir, "IMG_3921.PNG"), os.path.join(out_dir, "IMG_3921.jpg")))
print(convert_png_to_jpg(os.path.join(downloads_dir, "IMG_3922.PNG"), os.path.join(out_dir, "IMG_3922.jpg")))
print(convert_png_to_jpg(os.path.join(downloads_dir, "IMG_3923.PNG"), os.path.join(out_dir, "IMG_3923.jpg")))
print(convert_png_to_jpg(os.path.join(downloads_dir, "IMG_3924.PNG"), os.path.join(out_dir, "IMG_3924.jpg")))
print(convert_heic_to_jpg(os.path.join(downloads_dir, "IMG_3953.HEIC"), os.path.join(out_dir, "IMG_3953.jpg")))
print(convert_heic_to_jpg(os.path.join(downloads_dir, "IMG_3954.HEIC"), os.path.join(out_dir, "IMG_3954.jpg")))
