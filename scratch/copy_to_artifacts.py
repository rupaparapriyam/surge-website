import os
import shutil

src_dir = "/Users/priyamrupapara/developer/bussiness 1/surge branding/surge-store/SURGE coming soon webpage/assets/images"
dest_dir = "/Users/priyamrupapara/.gemini/antigravity/brain/564c5cca-0c2b-47d0-b0ae-b20a5857b440"

os.makedirs(dest_dir, exist_ok=True)

files_to_copy = [
    "IMG_4020.jpg",
    "IMG_3921.jpg",
    "IMG_3922.jpg",
    "IMG_3923.jpg",
    "IMG_3924.jpg",
    "IMG_3953.jpg",
    "IMG_3954.jpg",
    "video_frames/v4021_002.png",
    "video_frames/v4022_002.png",
    "video_frames/v4023_002.png"
]

for f in files_to_copy:
    src_path = os.path.join(src_dir, f)
    dest_path = os.path.join(dest_dir, os.path.basename(f))
    if os.path.exists(src_path):
        shutil.copy(src_path, dest_path)
        print(f"Copied {f} to artifacts")
    else:
        print(f"{src_path} not found")
