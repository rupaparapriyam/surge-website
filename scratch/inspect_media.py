import os
from PIL import Image

image_path = "/Users/priyamrupapara/developer/bussiness 1/surge branding/surge-store/SURGE coming soon webpage/assets/images/IMG_4020.jpg"
if os.path.exists(image_path):
    img = Image.open(image_path)
    print(f"IMG_4020.jpg: size={img.size}, mode={img.mode}")
else:
    print("IMG_4020.jpg does not exist")

frames_dir = "/Users/priyamrupapara/developer/bussiness 1/surge branding/surge-store/SURGE coming soon webpage/assets/images/video_frames"
if os.path.exists(frames_dir):
    files = sorted(os.listdir(frames_dir))
    print(f"Found {len(files)} files in video_frames:")
    for f in files[:10]:
        fp = os.path.join(frames_dir, f)
        img = Image.open(fp)
        print(f"  {f}: size={img.size}, mode={img.mode}")
else:
    print("video_frames directory does not exist")
