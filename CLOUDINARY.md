# Cloudinary Media Integration

This document describes how MemoryPage handles user-uploaded images and how Cloudinary fits into the existing flow. Read this before changing upload-related code.

## Project flow (current)

MemoryPage is a Next.js app where users **create websites** from pre-built **templates** (not user-authored templates).

```
Templates gallery → Preview → Create wizard → Payment → Published site
                                    ↓
                          Website JSON saved to PostgreSQL
```

### Key concepts

| Concept | Location | Notes |
|---------|----------|-------|
| Template definitions | `src/templates/*/config.ts` | Code-defined; includes form field metadata (`sectionsMeta`) |
| Create wizard | `src/app/create/[templateId]/` | Step 1 customizes content; Step 3 pays |
| Form fields | `SectionCard.tsx` | Renders fields from `sectionsMeta` |
| Website data | `WebsiteData` in `src/types/index.ts` | JSON blob: `content.hero.en.heroImage`, etc. |
| Persistence | `Website.data` (Prisma JSON) | No schema change needed for image URLs |
| Published site | `src/app/w/[slug]/page.tsx` | Reads stored JSON and renders template sections |
| Dashboard edit | `src/app/dashboard/[siteId]/edit/` | PATCH `/api/websites/[siteId]` |

### Where images are used today

The **wedding-classic** template already supports image URLs in section components:

| Field | Section | Component |
|-------|---------|-----------|
| `heroImage` | Hero background | `wedding-classic/sections/Hero.tsx` |
| `groomImage`, `brideImage` | Story portraits | `wedding-classic/sections/Story.tsx` |
| `images` (string array) | Photo gallery | `wedding-classic/sections/Gallery.tsx` |

Previously there was **no upload UI**—only text fields. Images were never collected during creation.

## Cloudinary integration design

### Goals

1. Store all user-uploaded template media on one Cloudinary account
2. Reusable upload hook + UI component (used in create flow and dashboard edit)
3. Server-side upload (API secret never exposed to the browser)
4. Auto-convert to **WebP** with quality optimization to reduce storage and load time
5. Minimal changes—URLs still live in existing `WebsiteData.content` JSON

### Architecture

```
User picks file
      ↓
ImageUpload component (client)
      ↓
useImageUpload hook → POST /api/upload (FormData)
      ↓
lib/cloudinary.ts → Cloudinary upload_stream
      ↓
Returns secure_url (webp) → stored in WebsiteData.content
      ↓
Template sections render URL (with optional delivery transforms)
```

### Files added

| File | Purpose |
|------|---------|
| `src/lib/cloudinary.ts` | Server-only Cloudinary config + `uploadImage()` |
| `src/lib/cloudinary-url.ts` | `cloudinaryUrl()` — adds `f_webp,q_auto` for delivery |
| `src/hooks/useImageUpload.ts` | Reusable client hook: `upload(file)` → URL |
| `src/components/ImageUpload.tsx` | Single or multi-image picker with preview |
| `src/app/api/upload/route.ts` | Accepts image, uploads to `memorypage/` folder |

### Files modified

| File | Change |
|------|--------|
| `src/types/index.ts` | Add `"image"` and `"images"` field types |
| `src/templates/wedding-classic/config.ts` | Image fields in `sectionsMeta` |
| `src/app/create/.../SectionCard.tsx` | Render `ImageUpload` for image fields |
| `src/app/create/.../Step1Customize.tsx` | Support `string \| string[]` field values |
| `src/app/dashboard/.../EditWebsite.tsx` | Hero, story, gallery image uploads |
| `src/templates/wedding-classic/sections/*.tsx` | Use `cloudinaryUrl()` when displaying |
| `.env.example` | Cloudinary env vars |

### Environment variables

Add to `.env` (never commit real secrets):

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# Optional shorthand (Cloudinary SDK reads this automatically):
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is only used for display/transform helpers on the client. Upload credentials stay server-side.

### Upload settings

- **Folder:** `memorypage/` (all template uploads)
- **Format:** `webp` at upload time
- **Quality:** `auto:good`
- **Max size:** 10 MB per file (API route)
- **Accepted types:** `image/jpeg`, `image/png`, `image/webp`, `image/gif`

### Data shape (unchanged)

```json
{
  "content": {
    "hero": { "en": { "heroImage": "https://res.cloudinary.com/.../image.webp" } },
    "story": { "en": { "groomImage": "...", "brideImage": "..." } },
    "gallery": { "en": { "images": ["...", "..."] } }
  }
}
```

Saved via existing paths: `POST /api/payment/verify`, `POST /api/payment/dev-create`, `PATCH /api/websites/[siteId]`.

### Extending to other templates

1. Add image fields to the template's `sectionsMeta` in `config.ts`
2. Ensure the section component reads the field (e.g. `heroImage`)
3. No API or hook changes needed—`ImageUpload` is template-agnostic

### Security notes

- API secret is only used in `src/lib/cloudinary.ts` (server)
- Upload route validates file type and size
- Consider rate limiting / auth on `/api/upload` in production if abuse becomes an issue
