import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function flattenAttributes(data: any): any {
  // Base case for recursion
  if (!data) return null;

  // Handling array data
  if (Array.isArray(data)) {
    return data.map(flattenAttributes);
  }

  let flattened: { [key: string]: any } = {};

  // Handling attributes
  if (data.attributes) {
    for (let key in data.attributes) {
      if (
        typeof data.attributes[key] === "object" &&
        data.attributes[key] !== null &&
        "data" in data.attributes[key]
      ) {
        flattened[key] = flattenAttributes(data.attributes[key].data);
      } else {
        flattened[key] = data.attributes[key];
      }
    }
  }

  // Copying non-attributes and non-data properties
  for (let key in data) {
    if (key !== "attributes" && key !== "data") {
      flattened[key] = data[key];
    }
  }

  // Handling nested data
  if (data.data) {
    flattened = { ...flattened, ...flattenAttributes(data.data) };
  }

  return flattened;
}

export function getImageSrc(url: string | undefined): string {
  if (!url) return "";
  const cmsUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!cmsUrl) return url;
  if (url.startsWith("/uploads/")) return `${cmsUrl}${url}`;
  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith("/uploads/") && ["localhost", "127.0.0.1"].includes(parsed.hostname)) {
      return `${cmsUrl}${parsed.pathname}${parsed.search}`;
    }
  } catch {
    // Keep non-URL values unchanged.
  }
  return url;
}
