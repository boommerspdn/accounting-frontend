import { URL } from "url";
import qs from "qs";
import { NameSlug, LayoutData, HomePageData } from "../app/types";

export async function fetchLayoutData(): Promise<LayoutData> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

  // Fetch layout data
  const layoutQuery = qs.stringify(
    {
      populate: {
        logo: {
          fields: ["name", "url", "alternativeText"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const layoutUrl = new URL(`/api/layout?${layoutQuery}`, baseUrl);

  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  console.log("API TOKEN:", process.env.NEXT_PUBLIC_API_TOKEN);

  const layoutRes = await fetch(layoutUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "force-cache",
  });

  if (!layoutRes.ok) {
    throw new Error("Failed to fetch layout data");
  }

  const layoutData = await layoutRes.json();

  const servicesQuery = qs.stringify(
    {
      fields: ["name", "slug"],
    },
    {
      encodeValuesOnly: true,
    },
  );
  const servicesUrl = new URL(`/api/services?${servicesQuery}`, baseUrl);

  const servicesRes = await fetch(servicesUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "force-cache",
  });

  if (!servicesRes.ok) {
    throw new Error("Failed to fetch service names and slugs");
  }

  const servicesData = await servicesRes.json();

  const services: NameSlug[] = servicesData.data;

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
    services: services,
  };

  return layout;
}

export async function fetchHomeData(): Promise<HomePageData> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

  // Fetch home data
  const homeQuery = qs.stringify(
    {
      populate: {
        banner_image: { fields: ["url", "alternativeText"] },
        section_2_image: { fields: ["url", "alternativeText"] },
        promotion_ads: { fields: ["url", "alternativeText"] },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const homeUrl = new URL(`/api/home-page?${homeQuery}`, baseUrl);

  const homeRes = await fetch(homeUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "force-cache",
  });

  if (!homeRes.ok) {
    throw new Error("Failed to fetch home data");
  }

  const homeData = await homeRes.json();

  const servicesQuery = qs.stringify(
    {
      fields: ["name", "slug", "description"],
    },
    {
      encodeValuesOnly: true,
    },
  );
  const servicesUrl = new URL(`/api/services?${servicesQuery}`, baseUrl);

  const servicesRes = await fetch(servicesUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "force-cache",
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
}

// fetch service by slug for service page
export async function fetchServiceBySlug(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = new URL(`/api/services?${query}`, baseUrl);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch service by slug");
  }

  const data = await res.json();

  return data.data[0];
}

export async function fetchAboutData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

  // Fetch about data
  const aboutQuery = qs.stringify(
    {
      populate: {
        header_image: { fields: ["url", "alternativeText"] },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const aboutUrl = new URL(`/api/about-page?${aboutQuery}`, baseUrl);

  const aboutRes = await fetch(aboutUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "force-cache",
  });

  if (!aboutRes.ok) {
    throw new Error("Failed to fetch about data");
  }

  const aboutData = await aboutRes.json();

  return aboutData.data;
}

export async function fetchContactData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

  // Fetch contact data
  const contactUrl = new URL(`/api/contact-page`, baseUrl);

  const contactRes = await fetch(contactUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "force-cache",
  });

  if (!contactRes.ok) {
    throw new Error("Failed to fetch contact data");
  }

  const contactData = await contactRes.json();

  return contactData.data;
}

export async function fetchHomeMetadata(): Promise<{
  title: string;
  description: string;
}> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const query = qs.stringify(
    {
      fields: ["id"],
      populate: {
        seo: {
          fields: ["id", "title", "description"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = new URL(`/api/home-page?${query}`, baseUrl);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch service by slug");
  }

  const meta = await res.json();

  return meta.data.seo;
}
