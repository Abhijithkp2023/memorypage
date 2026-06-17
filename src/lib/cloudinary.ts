import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UPLOAD_FOLDER = "memorypage";
const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export function validateImageFile(size: number, mimeType: string): string | null {
  if (size > MAX_BYTES) return "File must be under 10 MB";
  if (!ALLOWED_TYPES.has(mimeType)) return "Only JPEG, PNG, WebP, and GIF images are allowed";
  return null;
}

export async function uploadImage(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: UPLOAD_FOLDER,
          format: "webp",
          quality: "auto:good",
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result?.secure_url) {
            reject(error ?? new Error("Upload failed"));
            return;
          }
          resolve(result.secure_url);
        }
      )
      .end(buffer);
  });
}
