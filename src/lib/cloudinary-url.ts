/** Add WebP + auto quality transforms to Cloudinary delivery URLs. */
export function cloudinaryUrl(url: string, opts?: { width?: number }): string {
  if (!url?.includes("res.cloudinary.com")) return url;

  const transforms = ["f_webp", "q_auto"];
  if (opts?.width) transforms.push(`w_${opts.width}`);

  return url.replace("/upload/", `/upload/${transforms.join(",")}/`);
}
