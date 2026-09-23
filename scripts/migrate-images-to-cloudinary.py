import os
import sys
import json
import time
import hashlib
import io
import urllib.request
import urllib.parse
from PIL import Image

def load_env_local():
    env_path = os.path.join(os.getcwd(), '.env.local')
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    key = key.strip()
                    val = val.strip().strip('"').strip("'")
                    os.environ[key] = val

load_env_local()

cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME')
api_key = os.environ.get('CLOUDINARY_API_KEY')
api_secret = os.environ.get('CLOUDINARY_API_SECRET')

if not cloud_name or not api_key or not api_secret:
    print("Error: Missing Cloudinary credentials in .env.local")
    sys.exit(1)

IMAGE_MAPPINGS = [
    {"localPath": "public/images/hero/IMG_2740.JPG.jpeg", "publicId": "hotel-gandharva/hero/IMG_2740"},
    {"localPath": "public/images/logo/logo1.png", "publicId": "hotel-gandharva/logo/logo1"},
    {"localPath": "public/images/logo/image.png", "publicId": "hotel-gandharva/logo/image"},
    {"localPath": "public/images/logo/logo.png", "publicId": "hotel-gandharva/logo/logo"},
    {"localPath": "public/images/logo/final-logo.jpg", "publicId": "hotel-gandharva/logo/final-logo"},
    {"localPath": "public/images/about/IMG_8855.png", "publicId": "hotel-gandharva/about/IMG_8855"},
    {"localPath": "public/images/about/image.png", "publicId": "hotel-gandharva/about/image"},
    {"localPath": "public/images/menu/image copy.png", "publicId": "hotel-gandharva/menu/image_copy"},
    {"localPath": "public/images/menu/image copy 2.png", "publicId": "hotel-gandharva/menu/image_copy_2"},
    {"localPath": "public/images/menu/image copy 3.png", "publicId": "hotel-gandharva/menu/image_copy_3"},
    {"localPath": "public/images/menu/image copy 4.png", "publicId": "hotel-gandharva/menu/image_copy_4"},
    {"localPath": "public/images/menu/image copy 5.png", "publicId": "hotel-gandharva/menu/image_copy_5"},
    {"localPath": "public/images/menu/image.png", "publicId": "hotel-gandharva/menu/image"},
    {"localPath": "public/images/display_menu/02+.jpg.jpeg", "publicId": "hotel-gandharva/display_menu/02_plus"},
    {"localPath": "public/images/display_menu/03+.jpg.jpeg", "publicId": "hotel-gandharva/display_menu/03_plus"},
    {"localPath": "public/images/display_menu/04.jpg.jpeg", "publicId": "hotel-gandharva/display_menu/04"},
    {"localPath": "public/images/display_menu/05.jpg.jpeg", "publicId": "hotel-gandharva/display_menu/05"},
    {"localPath": "public/images/display_menu/06.jpg.jpeg", "publicId": "hotel-gandharva/display_menu/06"},
    {"localPath": "public/images/display_menu/07.jpg.jpeg", "publicId": "hotel-gandharva/display_menu/07"},
    {"localPath": "public/images/display_menu/DSC02160.JPG", "publicId": "hotel-gandharva/display_menu/DSC02160"},
    {"localPath": "public/images/scroll_animation/DSC02114.JPG", "publicId": "hotel-gandharva/scroll_animation/DSC02114"},
    {"localPath": "public/images/scroll_animation/DSC02160.JPG", "publicId": "hotel-gandharva/scroll_animation/DSC02160"},
    {"localPath": "public/images/scroll_animation/IMG_2741.JPG (1).jpeg", "publicId": "hotel-gandharva/scroll_animation/IMG_2741_1"},
    {"localPath": "public/images/scroll_animation/IMG_8855.png", "publicId": "hotel-gandharva/scroll_animation/IMG_8855"},
    {"localPath": "public/images/scroll_animation/image.png", "publicId": "hotel-gandharva/scroll_animation/image"},
]

def prepare_file_bytes(file_path):
    size = os.path.getsize(file_path)
    # 10MB limit is 10,485,760 bytes.
    if size <= 9500000:
        with open(file_path, 'rb') as f:
            return f.read(), os.path.basename(file_path)
    
    print(f"File {file_path} is {size} bytes (> 9.5MB). Optimizing before upload...")
    with Image.open(file_path) as im:
        im = im.convert("RGB")
        w, h = im.size
        max_dim = 3840
        if w > max_dim or h > max_dim:
            if w > h:
                new_w = max_dim
                new_h = int(h * (max_dim / w))
            else:
                new_h = max_dim
                new_w = int(w * (max_dim / h))
            im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        buf = io.BytesIO()
        im.save(buf, format="JPEG", quality=90, optimize=True)
        buf.seek(0)
        optimized_bytes = buf.read()
        print(f"Optimized to {len(optimized_bytes)} bytes.")
        fname = os.path.splitext(os.path.basename(file_path))[0] + ".jpg"
        return optimized_bytes, fname

def upload_image(item):
    file_path = os.path.join(os.getcwd(), item["localPath"])
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return None

    file_bytes, filename = prepare_file_bytes(file_path)

    timestamp = str(int(time.time()))
    public_id = item["publicId"]

    # Parameters in alphabetical order: overwrite, public_id, timestamp
    str_to_sign = f"overwrite=true&public_id={public_id}&timestamp={timestamp}{api_secret}"
    signature = hashlib.sha1(str_to_sign.encode('utf-8')).hexdigest()

    boundary = '----WebKitFormBoundary' + hashlib.md5(str(time.time()).encode()).hexdigest()
    
    body = []
    def add_field(name, val):
        body.append(f'--{boundary}'.encode())
        body.append(f'Content-Disposition: form-data; name="{name}"'.encode())
        body.append(b'')
        body.append(str(val).encode())

    add_field('api_key', api_key)
    add_field('timestamp', timestamp)
    add_field('public_id', public_id)
    add_field('overwrite', 'true')
    add_field('signature', signature)

    body.append(f'--{boundary}'.encode())
    body.append(f'Content-Disposition: form-data; name="file"; filename="{filename}"'.encode())
    body.append(b'Content-Type: image/jpeg' if filename.endswith('.jpg') or filename.endswith('.jpeg') else b'Content-Type: image/png')
    body.append(b'')
    body.append(file_bytes)
    body.append(f'--{boundary}--'.encode())
    body.append(b'')

    payload = b'\r\n'.join(body)

    url = f"https://api.cloudinary.com/v1_1/{cloud_name}/image/upload"
    req = urllib.request.Request(url, data=payload, headers={
        'Content-Type': f'multipart/form-data; boundary={boundary}',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    })

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            raw_url = data["secure_url"]
            # Construct standard WebP / auto URL
            url_parts = raw_url.split('/upload/')
            webp_url = url_parts[0] + '/upload/f_auto,q_auto/' + url_parts[1]
            return {
                "localPath": item["localPath"],
                "publicUrlPath": "/" + item["localPath"].replace("public/", ""),
                "publicId": data["public_id"],
                "format": data["format"],
                "bytes": data["bytes"],
                "width": data["width"],
                "height": data["height"],
                "rawUrl": raw_url,
                "webpUrl": webp_url
            }
    except urllib.error.HTTPError as e:
        print(f"HTTPError {e.code} uploading {item['localPath']}: {e.read().decode('utf-8')}")
        return None
    except Exception as e:
        print(f"Error uploading {item['localPath']}: {e}")
        return None

def main():
    print(f"Starting Cloudinary upload for {len(IMAGE_MAPPINGS)} images...")
    results = {}
    success_count = 0

    for item in IMAGE_MAPPINGS:
        print(f"Uploading {item['localPath']} -> {item['publicId']} ... ", end="", flush=True)
        res = upload_image(item)
        if res:
            print(f"OK ({res['publicId']})")
            results[res["publicUrlPath"]] = res
            success_count += 1
        else:
            print("FAILED")

    map_path = os.path.join(os.getcwd(), 'cloudinary-migration-map.json')
    with open(map_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)

    print(f"\nMigration script completed! Uploaded {success_count}/{len(IMAGE_MAPPINGS)} images.")
    print(f"Saved mapping to {map_path}")

if __name__ == '__main__':
    main()
