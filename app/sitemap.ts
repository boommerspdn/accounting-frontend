import { MetadataRoute } from "next";
import { fetchLayoutData } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use a fallback to avoid "undefined" in the XML if the env var is missing during build
  const baseUrl = (
    process.env.NEXT_PUBLIC_DOMAIN_URL || "https://fastontime.co.th"
  ).replace(/\/$/, "");

  const layout = await fetchLayoutData();
  const services = layout.services.filter((service: any) => service.slug);

  const currentDate = new Date();

  const serviceUrls = services.map((service: any) => ({
    url: `${baseUrl}/services/${service.slug}/`, // Added trailing slash
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  return [
    {
      url: `${baseUrl}/`, // Home always needs a slash
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/contact-us/`, // Added trailing slash
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us/`, // Added trailing slash
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...serviceUrls,
  ];
}
