const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Read environment variables from .env.local if present
function loadEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    });
  }
}

loadEnvLocal();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("Error: Missing Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)");
  process.exit(1);
}

// Map of local image relative paths to public_id in Cloudinary
const IMAGE_MAPPINGS = [
  { localPath: 'public/images/hero/IMG_2740.JPG.jpeg', folder: 'hotel-gandharva/hero', publicId: 'hotel-gandharva/hero/IMG_2740' },
  { localPath: 'public/images/logo/logo1.png', folder: 'hotel-gandharva/logo', publicId: 'hotel-gandharva/logo/logo1' },
  { localPath: 'public/images/logo/image.png', folder: 'hotel-gandharva/logo', publicId: 'hotel-gandharva/logo/image' },
  { localPath: 'public/images/logo/logo.png', folder: 'hotel-gandharva/logo', publicId: 'hotel-gandharva/logo/logo' },
  { localPath: 'public/images/logo/final-logo.jpg', folder: 'hotel-gandharva/logo', publicId: 'hotel-gandharva/logo/final-logo' },
  { localPath: 'public/images/about/IMG_8855.png', folder: 'hotel-gandharva/about', publicId: 'hotel-gandharva/about/IMG_8855' },
  { localPath: 'public/images/about/image.png', folder: 'hotel-gandharva/about', publicId: 'hotel-gandharva/about/image' },
  { localPath: 'public/images/menu/image copy.png', folder: 'hotel-gandharva/menu', publicId: 'hotel-gandharva/menu/image_copy' },
  { localPath: 'public/images/menu/image copy 2.png', folder: 'hotel-gandharva/menu', publicId: 'hotel-gandharva/menu/image_copy_2' },
  { localPath: 'public/images/menu/image copy 3.png', folder: 'hotel-gandharva/menu', publicId: 'hotel-gandharva/menu/image_copy_3' },
  { localPath: 'public/images/menu/image copy 4.png', folder: 'hotel-gandharva/menu', publicId: 'hotel-gandharva/menu/image_copy_4' },
  { localPath: 'public/images/menu/image copy 5.png', folder: 'hotel-gandharva/menu', publicId: 'hotel-gandharva/menu/image_copy_5' },
  { localPath: 'public/images/menu/image.png', folder: 'hotel-gandharva/menu', publicId: 'hotel-gandharva/menu/image' },
  { localPath: 'public/images/display_menu/02+.jpg.jpeg', folder: 'hotel-gandharva/display_menu', publicId: 'hotel-gandharva/display_menu/02_plus' },
  { localPath: 'public/images/display_menu/03+.jpg.jpeg', folder: 'hotel-gandharva/display_menu', publicId: 'hotel-gandharva/display_menu/03_plus' },
  { localPath: 'public/images/display_menu/04.jpg.jpeg', folder: 'hotel-gandharva/display_menu', publicId: 'hotel-gandharva/display_menu/04' },
  { localPath: 'public/images/display_menu/05.jpg.jpeg', folder: 'hotel-gandharva/display_menu', publicId: 'hotel-gandharva/display_menu/05' },
  { localPath: 'public/images/display_menu/06.jpg.jpeg', folder: 'hotel-gandharva/display_menu', publicId: 'hotel-gandharva/display_menu/06' },
  { localPath: 'public/images/display_menu/07.jpg.jpeg', folder: 'hotel-gandharva/display_menu', publicId: 'hotel-gandharva/display_menu/07' },
  { localPath: 'public/images/display_menu/DSC02160.JPG', folder: 'hotel-gandharva/display_menu', publicId: 'hotel-gandharva/display_menu/DSC02160' },
  { localPath: 'public/images/scroll_animation/DSC02114.JPG', folder: 'hotel-gandharva/scroll_animation', publicId: 'hotel-gandharva/scroll_animation/DSC02114' },
  { localPath: 'public/images/scroll_animation/DSC02160.JPG', folder: 'hotel-gandharva/scroll_animation', publicId: 'hotel-gandharva/scroll_animation/DSC02160' },
  { localPath: 'public/images/scroll_animation/IMG_2741.JPG (1).jpeg', folder: 'hotel-gandharva/scroll_animation', publicId: 'hotel-gandharva/scroll_animation/IMG_2741_1' },
  { localPath: 'public/images/scroll_animation/IMG_8855.png', folder: 'hotel-gandharva/scroll_animation', publicId: 'hotel-gandharva/scroll_animation/IMG_8855' },
  { localPath: 'public/images/scroll_animation/image.png', folder: 'hotel-gandharva/scroll_animation', publicId: 'hotel-gandharva/scroll_animation/image' },
];

async function uploadImage(item) {
  const filePath = path.join(process.cwd(), item.localPath);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return null;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  // Parameters in alphabetical order for signature calculation: folder, overwrite, public_id, timestamp
  const strToSign = `folder=${item.folder}&overwrite=true&public_id=${item.publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(strToSign).digest('hex');

  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = ext === '.png' ? 'image/png' : ext === '.svg' ? 'image/svg+xml' : 'image/jpeg';
  const blob = new Blob([fileBuffer], { type: mimeType });

  const formData = new FormData();
  formData.append('file', blob, path.basename(filePath));
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('folder', item.folder);
  formData.append('public_id', item.publicId);
  formData.append('overwrite', 'true');
  formData.append('signature', signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });

  const json = await response.json();
  if (json.secure_url) {
    const rawUrl = json.secure_url;
    const webpUrl = rawUrl.replace('/upload/', '/upload/f_auto,q_auto/');
    return {
      localPath: item.localPath,
      publicUrlPath: item.localPath.replace(/^public/, ''),
      publicId: json.public_id,
      format: json.format,
      bytes: json.bytes,
      width: json.width,
      height: json.height,
      rawUrl: rawUrl,
      webpUrl: webpUrl,
    };
  } else {
    console.error(`Failed to upload ${item.localPath}:`, json.error ? json.error.message : json);
    return null;
  }
}

async function runMigration() {
  console.log(`Starting Cloudinary migration for ${IMAGE_MAPPINGS.length} images...`);
  const results = {};
  
  for (const item of IMAGE_MAPPINGS) {
    process.stdout.write(`Uploading ${item.localPath} ... `);
    const res = await uploadImage(item);
    if (res) {
      console.log(`OK -> ${res.publicId}`);
      results[res.publicUrlPath] = res;
    } else {
      console.log(`FAILED`);
    }
  }

  const mapPath = path.join(process.cwd(), 'cloudinary-migration-map.json');
  fs.writeFileSync(mapPath, JSON.stringify(results, null, 2));
  console.log(`\nMigration completed! Mapping saved to ${mapPath}`);
  console.log(`Total images uploaded successfully: ${Object.keys(results).length}/${IMAGE_MAPPINGS.length}`);
}

runMigration();
