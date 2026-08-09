import type { MetadataRoute } from "next"

import { fetchLayoutData } from "@/lib/data"
import { siteUrl } from "@/lib/structured-data"

export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const layout = await fetchLayoutData()
  const staticRoutes = ["/", "/about-us", "/contact-us"]
  const serviceRoutes = layout.services.map((service) => `/services/${service.slug}`)

  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: siteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services/") ? 0.8 : 0.7,
  }))
}
