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
        cache: "no-store",
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
