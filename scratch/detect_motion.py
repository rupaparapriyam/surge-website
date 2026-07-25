import os
import math
from PIL import Image

def detect_motion_direction(prefix):
    frames_dir = "/Users/priyamrupapara/developer/bussiness 1/surge branding/surge-store/SURGE coming soon webpage/assets/images/video_frames"
    frames = sorted([f for f in os.listdir(frames_dir) if f.startswith(prefix)])
    
    if len(frames) < 2:
        return "Insufficient frames"
        
    width, height = Image.open(os.path.join(frames_dir, frames[0])).size
    num_pixels = width * height
    
    avg_diff = [0.0] * num_pixels
    
    for i in range(len(frames) - 1):
        img1 = Image.open(os.path.join(frames_dir, frames[i])).convert('L')
        img2 = Image.open(os.path.join(frames_dir, frames[i+1])).convert('L')
        
        p1 = list(img1.getdata())
        p2 = list(img2.getdata())
        
        for idx in range(num_pixels):
            avg_diff[idx] += abs(p1[idx] - p2[idx]) / (len(frames) - 1)
            
    # Calculate horizontal projection (average motion per column)
    h_proj = [0.0] * width
    for x in range(width):
        col_sum = sum(avg_diff[y * width + x] for y in range(height))
        h_proj[x] = col_sum / height
        
    # Calculate vertical projection (average motion per row)
    v_proj = [0.0] * height
    for y in range(height):
        row_sum = sum(avg_diff[y * width + x] for x in range(width))
        v_proj[y] = row_sum / width
        
    # Variance of horizontal and vertical projections
    h_mean = sum(h_proj) / width
    h_var = sum((x - h_mean) ** 2 for x in h_proj) / width
    
    v_mean = sum(v_proj) / height
    v_var = sum((y - v_mean) ** 2 for y in v_proj) / height
    
    # Check correlation with radius from center (cy, cx)
    cy, cx = height / 2.0, width / 2.0
    r_coords = []
    m_values = []
    
    for y in range(height):
        for x in range(width):
            r = math.sqrt((x - cx)**2 + (y - cy)**2)
            r_coords.append(r)
            m_values.append(avg_diff[y * width + x])
            
    r_mean = sum(r_coords) / len(r_coords)
    m_mean = sum(m_values) / len(m_values)
    
    num_corr = sum((r - r_mean) * (m - m_mean) for r, m in zip(r_coords, m_values))
    den_r = sum((r - r_mean) ** 2 for r in r_coords)
    den_m = sum((m - m_mean) ** 2 for m in m_values)
    
    r_corr = num_corr / math.sqrt(den_r * den_m) if den_r * den_m > 0 else 0.0
    
    return f"H-variance: {h_var:.2f}, V-variance: {v_var:.2f}, Radius-correlation: {r_corr:.3f}"

print("v4021:", detect_motion_direction("v4021_"))
print("v4022:", detect_motion_direction("v4022_"))
print("v4023:", detect_motion_direction("v4023_"))
