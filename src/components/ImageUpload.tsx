"use client";

import { useRef } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";
import { cloudinaryUrl } from "@/lib/cloudinary-url";

interface Props {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  maxCount?: number;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  multiple = false,
  maxCount = 12,
  label,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, uploading, error } = useImageUpload();

  const images = multiple
    ? Array.isArray(value)
      ? value
      : []
    : typeof value === "string" && value
      ? [value]
      : [];

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;

    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      const remaining = maxCount - current.length;
      const toUpload = Array.from(files).slice(0, remaining);

      const urls: string[] = [];
      for (const file of toUpload) {
        const url = await upload(file);
        if (url) urls.push(url);
      }
      if (urls.length) onChange([...current, ...urls]);
    } else {
      const url = await upload(files[0]);
      if (url) onChange(url);
    }

    if (inputRef.current) inputRef.current.value = "";
  }

  function removeAt(index: number) {
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      onChange(current.filter((_, i) => i !== index));
    } else {
      onChange("");
    }
  }

  const canAddMore = multiple ? images.length < maxCount : images.length === 0;

  return (
    <div>
      {label && <p className="text-xs text-stone-500 mb-1.5">{label}</p>}

      {images.length > 0 && (
        <div className={`mb-3 ${multiple ? "grid grid-cols-3 gap-2" : ""}`}>
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className={`relative rounded-xl overflow-hidden border border-stone-200 ${
                multiple ? "aspect-square" : "h-32"
              }`}
            >
              <img
                src={cloudinaryUrl(src, { width: multiple ? 300 : 600 })}
                alt=""
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
                aria-label="Remove image"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {canAddMore && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 border border-dashed border-stone-300 rounded-xl px-4 py-3 text-sm text-stone-500 hover:border-rose-300 hover:text-rose-500 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Uploading…
            </>
          ) : (
            <>
              <ImagePlus size={16} />
              {multiple ? `Add photos (${images.length}/${maxCount})` : "Upload image"}
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}
