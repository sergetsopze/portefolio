import { NextRequest } from "next/server";
import { snippet, stripHtml, withTimeout } from "@/lib/jobs/normalize";
import { labelFromUrl } from "@/lib/jobs/origin";

function meta(html: string, property: string) {
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`,
      "i",
    ),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return stripHtml(match[1]);
  }
  return "";
}

function isPublicHttpUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "::1" ||
      host.endsWith(".local") ||
      host.startsWith("10.") ||
      host.startsWith("192.168.") ||
      host.startsWith("172.16.")
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")?.trim() || "";
  if (!url || !isPublicHttpUrl(url)) {
    return Response.json({ error: "URL publique invalide." }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; OpportunitesBot/1.0; +https://localhost)",
        Accept: "text/html",
      },
      redirect: "follow",
      signal: withTimeout(8_000),
    });

    if (!response.ok) {
      return Response.json({
        title: "",
        description: "",
        sourceLabel: labelFromUrl(url),
      });
    }

    const html = (await response.text()).slice(0, 80_000);
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);

    return Response.json({
      title: meta(html, "og:title") || titleMatch?.[1]?.trim() || "",
      description: snippet(
        meta(html, "og:description") || meta(html, "description") || "",
      ),
      sourceLabel: labelFromUrl(url, meta(html, "og:site_name") || "Ajout manuel"),
    });
  } catch {
    return Response.json({
      title: "",
      description: "",
      sourceLabel: labelFromUrl(url),
    });
  }
}
