import qs from "qs";

import type { HomePageData, LayoutData, NameSlug } from "@/app/types";

const apiUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337").replace(/\/$/, "");
const apiPrefix = process.env.NEXT_PUBLIC_CMS_API_PREFIX ?? "/api";

async function get<T>(path: string, query?: Record<string, unknown>): Promise<T> {
  const queryString = query
    ? `?${qs.stringify(query, { encodeValuesOnly: true })}`
    : "";
  const headers: HeadersInit = process.env.NEXT_PUBLIC_API_TOKEN
    ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` }
    : {};
  const response = await fetch(`${apiUrl}${apiPrefix}${path}${queryString}`, {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed (${response.status})`);
  }

  return response.json();
}

export async function fetchLiveLayout(): Promise<LayoutData> {
  const [layoutResponse, servicesResponse] = await Promise.all([
    get<{ data: any }>("/fastontime-layout", {
      populate: {
        logo: { fields: ["name", "url", "alternativeText"] },
        favicon: { fields: ["name", "url", "alternativeText"] },
      },
    }),
    get<{ data: NameSlug[] }>("/fastontime-services", {
      fields: ["name", "slug"],
    }),
  ]);

  const data = layoutResponse.data;
  return {
    name: data.name,
    address: data.address,
    phone: data.phone,
    email: data.email,
    facebook_link: data.facebook_link,
    line_link: data.line_link,
    copyright: data.copyright,
    logo: data.logo,
    favicon: data.favicon,
    services: servicesResponse.data.filter((service) => service.slug),
  };
}

export async function fetchLiveHome(): Promise<HomePageData> {
  const [homeResponse, servicesResponse] = await Promise.all([
    get<{ data: Omit<HomePageData, "services"> }>("/fastontime-home-page", {
      populate: {
        banner_image: { fields: ["url", "alternativeText"] },
        section_2_image: { fields: ["url", "alternativeText"] },
        promotion_ads: { fields: ["url", "alternativeText"] },
      },
    }),
    get<{ data: HomePageData["services"] }>("/fastontime-services", {
      fields: ["name", "slug", "description"],
    }),
  ]);

  return { ...homeResponse.data, services: servicesResponse.data };
}

export async function fetchLiveAbout() {
  const response = await get<{ data: any }>("/fastontime-about-page", {
    populate: { header_image: { fields: ["url", "alternativeText"] } },
  });
  return response.data;
}

export async function fetchLiveContact() {
  const response = await get<{ data: any }>("/fastontime-contact-page");
  return response.data;
}

export async function fetchLiveService(slug: string) {
  const response = await get<{ data: any[] }>("/fastontime-services", {
    filters: { slug: { $eq: slug } },
  });
  return response.data[0] ?? null;
}
