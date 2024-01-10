import qs from "qs";
import { flattenAttributes } from "./utils";

export async function pageFetcher(page: string) {
  try {
    const query = qs.stringify({
      populate: "*",
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${page}?${query}`,
      {
         next: {revalidate: 3000}
      }
    );
    const data = await response.json();
    const pageData = flattenAttributes(data.data);
    return pageData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch page data.");
  }
}

export async function serviceFetcher(page: string, params: string) {
  try {
    const query = qs.stringify({
      populate: "*",
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${page}?${query}&filters[slug][$eq]=${params}`,
      {
        next: {revalidate: 3000}
      }
    );
    const data = await response.json();
    const pageData = flattenAttributes(data.data);

    return pageData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch service data.");
  }
}

export async function serviceListFetcher(page: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${page}`,
      {
         next: {revalidate: 3000}
      }
    );
    const data = await response.json();
    const pageData = flattenAttributes(data.data);
    return pageData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch service list data.");
  }
}

export async function metaFetcher(
  page: string,
  slug: string | undefined | null
) {
  try {
    slug = "";
    if (slug) {
      slug = `&filters[slug][$eq]=${slug}`;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${page}?fields[0]=meta_title&fields[1]=meta_description${slug}`,
      {
         next: {revalidate: 3000}
      }
    );
    const data = await response.json();
    const pageData = flattenAttributes(data.data);
    return pageData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch page data.");
  }
}
