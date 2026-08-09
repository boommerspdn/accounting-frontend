import { URL } from "url";
import qs from "qs";
import { cache } from "react";
import { NameSlug, LayoutData, HomePageData } from "../app/types";

export const fetchLayoutData = cache(async (): Promise<LayoutData> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

  const layoutQuery = qs.stringify(
    {
      populate: {
        logo: {
          fields: ["name", "url", "alternativeText"],
        },
      },
    },
    { encodeValuesOnly: true },
  );
  const layoutUrl = new URL(`/api/fastontime-layout?${layoutQuery}`, baseUrl);

  const layoutRes = await fetch(layoutUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!layoutRes.ok) {
    throw new Error("Failed to fetch layout data");
  }

  const layoutData = await layoutRes.json();

  const servicesQuery = qs.stringify(
    { fields: ["name", "slug"] },
    { encodeValuesOnly: true },
  );
  const servicesUrl = new URL(`/api/fastontime-services?${servicesQuery}`, baseUrl);

  const servicesRes = await fetch(servicesUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!servicesRes.ok) {
    throw new Error("Failed to fetch service names and slugs");
  }

  const servicesData = await servicesRes.json();
  const services: NameSlug[] = servicesData.data.filter(
    (service: NameSlug) => typeof service.slug === "string" && service.slug.length > 0,
  );

  const layout: LayoutData = {
    name: layoutData.data.name,
    address: layoutData.data.address,
    phone: layoutData.data.phone,
    email: layoutData.data.email,
    facebook_link: layoutData.data.facebook_link,
    line_link: layoutData.data.line_link,
    copyright: layoutData.data.copyright,
    logo: {
      url: layoutData.data.logo.url,
      alternativeText: layoutData.data.logo.alternativeText,
    },
    services,
  };

  return layout;
});

export const fetchHomeData = cache(async (): Promise<HomePageData> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

  const homeQuery = qs.stringify(
    {
      populate: {
        banner_image: { fields: ["url", "alternativeText"] },
        section_2_image: { fields: ["url", "alternativeText"] },
        promotion_ads: { fields: ["url", "alternativeText"] },
      },
    },
    { encodeValuesOnly: true },
  );
  const homeUrl = new URL(`/api/fastontime-home-page?${homeQuery}`, baseUrl);

  const homeRes = await fetch(homeUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!homeRes.ok) {
    throw new Error("Failed to fetch home data");
  }

  const homeData = await homeRes.json();

  const servicesQuery = qs.stringify(
    { fields: ["name", "slug", "description"] },
    { encodeValuesOnly: true },
  );
  const servicesUrl = new URL(`/api/fastontime-services?${servicesQuery}`, baseUrl);

  const servicesRes = await fetch(servicesUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!servicesRes.ok) {
    throw new Error("Failed to fetch service names and slugs");
  }

  const servicesData = await servicesRes.json();

  const homePageData: HomePageData = {
    ...homeData.data,
    services: servicesData.data,
  };

  return homePageData;
});

// fetch service by slug for service page
export const fetchServiceBySlug = cache(async (slug: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const query = qs.stringify(
    {
      filters: {
        slug: { $eq: slug },
      },
    },
    { encodeValuesOnly: true },
  );

  const url = new URL(`/api/fastontime-services?${query}`, baseUrl);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch service by slug");
  }

  const data = await res.json();
  return data.data[0];
});

export const fetchAboutData = cache(async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

  const aboutQuery = qs.stringify(
    {
      populate: {
        header_image: { fields: ["url", "alternativeText"] },
      },
    },
    { encodeValuesOnly: true },
  );
  const aboutUrl = new URL(`/api/fastontime-about-page?${aboutQuery}`, baseUrl);

  const aboutRes = await fetch(aboutUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!aboutRes.ok) {
    throw new Error("Failed to fetch about data");
  }

  const aboutData = await aboutRes.json();
  return aboutData.data;
});

export const fetchContactData = cache(async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

  const contactUrl = new URL(`/api/fastontime-contact-page`, baseUrl);

  const contactRes = await fetch(contactUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!contactRes.ok) {
    throw new Error("Failed to fetch contact data");
  }

  const contactData = await contactRes.json();
  return contactData.data;
});

export const fetchHomeMetadata = cache(
  async (): Promise<{ title: string; description: string }> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
    const query = qs.stringify(
      {
        fields: ["id"],
        populate: {
          seo: { fields: ["id", "title", "description"] },
        },
      },
      { encodeValuesOnly: true },
    );

    const url = new URL(`/api/fastontime-home-page?${query}`, baseUrl);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch home metadata");
    }

    const meta = await res.json();
    return meta.data.seo;
  },
);

export const fetchAboutMetadata = cache(
  async (): Promise<{ title: string; description: string }> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
    const query = qs.stringify(
      {
        fields: ["id"],
        populate: {
          seo: { fields: ["id", "title", "description"] },
        },
      },
      { encodeValuesOnly: true },
    );

    const url = new URL(`/api/fastontime-about-page?${query}`, baseUrl);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch about page metadata");
    }

    const meta = await res.json();
    return meta.data.seo;
  },
);

export const fetchContactMetadata = cache(
  async (): Promise<{ title: string; description: string }> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
    const query = qs.stringify(
      {
        fields: ["id"],
        populate: {
          seo: { fields: ["id", "title", "description"] },
        },
      },
      { encodeValuesOnly: true },
    );

    const url = new URL(`/api/fastontime-contact-page?${query}`, baseUrl);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch contact page metadata");
    }

    const meta = await res.json();
    return meta.data.seo;
  },
);

export const fetchServiceMetadata = cache(
  async (slug: string): Promise<{ title: string; description: string }> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
    const query = qs.stringify(
      {
        filters: {
          slug: { $eq: slug },
        },
        fields: ["id"],
        populate: {
          seo: { fields: ["id", "title", "description"] },
        },
      },
      { encodeValuesOnly: true },
    );

    const url = new URL(`/api/fastontime-services?${query}`, baseUrl);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch service metadata");
    }

    const meta = await res.json();
    return meta.data[0].seo;
  },
);
