import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { fetchContactData, fetchContactMetadata } from "@/lib/data";
import { seoMetadata } from "@/lib/metadata";
import { cmsKeys } from "@/lib/query-keys";
import ContactContent from "./contact-content";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchContactMetadata();
  return seoMetadata(seo, { title: seo.title, description: seo.description }, { path: "/contact-us" });
}

export default async function ContactPage() {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery({ queryKey: cmsKeys.contact, queryFn: fetchContactData });
  return <HydrationBoundary state={dehydrate(queryClient)}><ContactContent /></HydrationBoundary>;
}
