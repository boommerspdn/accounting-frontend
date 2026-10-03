import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { fetchAboutData, fetchAboutMetadata } from "@/lib/data";
import { seoMetadata } from "@/lib/metadata";
import { cmsKeys } from "@/lib/query-keys";
import AboutContent from "./about-content";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchAboutMetadata();
  return seoMetadata(seo, { title: seo.title, description: seo.description }, { path: "/about-us" });
}

export default async function AboutPage() {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery({ queryKey: cmsKeys.about, queryFn: fetchAboutData });
  return <HydrationBoundary state={dehydrate(queryClient)}><AboutContent /></HydrationBoundary>;
}
