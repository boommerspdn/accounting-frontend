import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { fetchHomeData, fetchHomeMetadata } from "@/lib/data";
import { seoMetadata } from "@/lib/metadata";
import { cmsKeys } from "@/lib/query-keys";
import HomeContent from "./home-content";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchHomeMetadata();
  return seoMetadata(seo, { title: seo.title, description: seo.description });
}

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery({ queryKey: cmsKeys.home, queryFn: fetchHomeData });
  return <HydrationBoundary state={dehydrate(queryClient)}><HomeContent /></HydrationBoundary>;
}
