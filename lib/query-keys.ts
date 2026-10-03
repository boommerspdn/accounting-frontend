export const cmsKeys = {
  layout: ["fastontime", "layout"] as const,
  home: ["fastontime", "home"] as const,
  about: ["fastontime", "about"] as const,
  contact: ["fastontime", "contact"] as const,
  service: (slug: string) => ["fastontime", "service", slug] as const,
};
