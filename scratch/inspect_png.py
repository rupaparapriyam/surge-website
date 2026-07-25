import os
from PIL import Image

downloads_dir = "/Users/priyamrupapara/Downloads"
images = ["IMG_3921.PNG", "IMG_3922.PNG", "IMG_3923.PNG", "IMG_3924.PNG", "IMG_3925.PNG", "IMG_3926.PNG", "IMG_3951.PNG", "IMG_3952.PNG"]

for img_name in images:
    path = os.path.join(downloads_dir, img_name)
    if os.path.exists(path):
        img = Image.open(path)
        print(f"{img_name}: size={img.size}, mode={img.mode}")
    else:
        print(f"{img_name} not found")
