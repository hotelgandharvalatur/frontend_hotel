export interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: string | number;
  format?: string;
  crop?: string;
}

/**
 * Returns an optimized Cloudinary image URL with automatic format (WebP),
 * automatic quality, and optional responsive dimension transformations.
 */
export function getCloudinaryUrl(publicId: string, options?: CloudinaryOptions): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (publicId.startsWith('http://') || publicId.startsWith('https://')) {
    return publicId;
  }

  const cleanId = publicId.replace(/^\/+/, '');
  const transformations: string[] = [];

  transformations.push(`f_${options?.format || 'auto'}`);
  transformations.push(`q_${options?.quality || 'auto'}`);

  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.crop) transformations.push(`c_${options.crop}`);

  const transformStr = transformations.join(',');
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformStr}/${cleanId}`;
}
