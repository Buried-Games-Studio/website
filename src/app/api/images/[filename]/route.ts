import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  // 1. Get the requested filename (e.g., "logo.png")
  const { filename } = await params;

  // 2. Define where your images live (e.g., src/components/images)
  const filePath = path.join(process.cwd(), "src/components/images", filename);

  // 3. Check if file exists
  if (!fs.existsSync(filePath)) {
    return new NextResponse("Image not found", { status: 404 });
  }

  // 4. Read the file
  const fileBuffer = fs.readFileSync(filePath);

  // 5. Determine Content-Type (Simple mapping)
  const ext = path.extname(filePath).toLowerCase();
  const contentType = 
    ext === ".png" ? "image/png" :
    ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" :
    ext === ".webp" ? "image/webp" :
    ext === ".svg" ? "image/svg+xml" :
    "application/octet-stream";

  // 6. Return the image
  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}