import type { LayoutData } from "@/app/types"

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue | undefined }

function stripUndefined(value: JsonValue | undefined): JsonValue | undefined {
  if (Array.isArray(value)) {
    return value
      .map((item) => stripUndefined(item))
      .filter((item): item is JsonValue => item !== undefined)
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, item]) => [key, stripUndefined(item)])
        .filter((entry): entry is [string, JsonValue] => entry[1] !== undefined)
    )
  }

  return value
}

export function JsonLd({ data }: { data: JsonValue }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(stripUndefined(data)),
      }}
    />
  )
}

export function siteUrl(path = "/") {
  const base = process.env.NEXT_PUBLIC_DOMAIN_URL || ""
  if (path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export function localBusinessJsonLd(layout: LayoutData | null) {
  const logo = layout?.logo?.url

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: layout?.name,
    url: siteUrl("/"),
    logo,
    image: logo,
    description:
      "รับทำบัญชีในประเทศไทย กรุงเทพ (Accounting Services in Thailand, Bangkok)",
    telephone: layout?.phone || undefined,
    address: layout?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: layout.address,
          addressLocality: "Bangkok",
          postalCode: "10330",
          addressCountry: "TH",
        }
      : undefined,
    openingHours: "Mo-Sa 08:00-18:00",
    sameAs: [layout?.facebook_link, layout?.line_link].filter(Boolean) as string[],
  } satisfies JsonValue
}

export function websiteJsonLd(layout: LayoutData | null) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: layout?.name,
    url: siteUrl("/"),
    inLanguage: "th",
  } satisfies JsonValue
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(item.path),
    })),
  } satisfies JsonValue
}
