import type { Metadata } from "next";

export const SITE_NAME = "Fast on Time Accounting";
export const DEFAULT_SITE_DESCRIPTION =
  "รับทำบัญชีในประเทศไทย กรุงเทพ ปิดงบการเงิน บัญชีรายเดือน และจดทะเบียนนิติบุคคล";

const SITE_URL =
  process.env.NEXT_PUBLIC_DOMAIN_URL?.replace(/\/$/, "") ||
  "http://localhost:3001";

function clean(value?: string | null) {
  return typeof value === "string" ? value.trim() : "";
}

export function sitePath(path = "/") {
  if (path === "/") return "/";

  const normalized = path.startsWith("/") ? path : `/${path}`;
  const lastSegment = normalized.split("/").pop() ?? "";
  if (lastSegment.includes(".")) return normalized;

  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

export function siteUrl(path = "/") {
  return `${SITE_URL}${sitePath(path)}`;
}

export function mediaUrl(url?: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (url.startsWith("/uploads/") && apiUrl) return `${apiUrl}${url}`;

  return siteUrl(url);
}

export function seoMetadata(
  seo: { title?: string | null; description?: string | null } | null | undefined,
  fallback: { title: string; description?: string | null; icon?: string | null },
  options: { path?: string; image?: string | null; type?: "website" | "article" } = {}
): Metadata {
  const title = clean(seo?.title) || fallback.title;
  const description =
    clean(seo?.description) ||
    clean(fallback.description) ||
    DEFAULT_SITE_DESCRIPTION;
  const canonical = siteUrl(options.path);
  const image = mediaUrl(options.image) || siteUrl("/opengraph-image.webp");
  const icon = mediaUrl(fallback.icon);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    ...(icon
      ? {
          icons: {
            icon,
            shortcut: icon,
            apple: icon,
          },
        }
      : {}),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "th_TH",
      type: options.type ?? "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
