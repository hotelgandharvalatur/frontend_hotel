import { NextResponse } from "next/server";

export const revalidate = 900; // Cache response for 15 minutes server-side

export interface InstagramMediaItem {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp?: string;
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID || "17841452673254195";

  if (!token) {
    console.warn("[Instagram API] INSTAGRAM_ACCESS_TOKEN environment variable is not configured.");
    return NextResponse.json({
      success: false,
      reason: "missing_token",
      data: [],
    });
  }

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  
  // Try User-ID endpoint first, then fall back to /me/media
  const urls = [
    `https://graph.instagram.com/v22.0/${userId}/media?fields=${fields}&access_token=${token}&limit=12`,
    `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}&limit=12`,
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        next: { revalidate: 900 },
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        console.error(`[Instagram API] Error ${response.status}:`, errorJson?.error?.message || response.statusText);
        continue;
      }

      const json = await response.json();
      const rawData = json?.data || [];

      // Format and sanitize media items (never return secret access tokens)
      const data: InstagramMediaItem[] = rawData
        .filter((item: any) => item && item.id && (item.media_url || item.thumbnail_url))
        .map((item: any) => ({
          id: item.id,
          caption: item.caption || "",
          media_type: item.media_type || "IMAGE",
          media_url: item.media_url || item.thumbnail_url || "",
          thumbnail_url: item.thumbnail_url || item.media_url || "",
          permalink: item.permalink || "https://www.instagram.com/gandharvapureveg_latur",
          timestamp: item.timestamp || "",
        }));

      if (data.length > 0) {
        return NextResponse.json({
          success: true,
          data: data.slice(0, 12),
        });
      }
    } catch (err) {
      console.error("[Instagram API] Request failed:", err instanceof Error ? err.message : err);
    }
  }

  // Graceful fallback response if API calls failed
  return NextResponse.json({
    success: false,
    reason: "api_unavailable",
    data: [],
  });
}
