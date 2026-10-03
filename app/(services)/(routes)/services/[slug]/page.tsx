import { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { fetchLayoutData, fetchServiceBySlug, fetchServiceMetadata } from "@/lib/data";
import { seoMetadata } from "@/lib/metadata";
import { cmsKeys } from "@/lib/query-keys";
import ServiceContent from "./service-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { slug } = await params;
  const seo = await fetchServiceMetadata(slug);

  return {
    ...seoMetadata(
      seo,
      {
        title: seo.title,
        description: seo.description,
      },
      { path: `/services/${slug}` }
    ),
  };
}

export async function generateStaticParams() {
  const layoutData = await fetchLayoutData();

  return layoutData.services.map((service) => ({ slug: service.slug }));
}

const ServicePage = async ({ params }: Props) => {
  const { slug } = await params;
  const queryClient = new QueryClient();
  await queryClient.fetchQuery({ queryKey: cmsKeys.service(slug), queryFn: () => fetchServiceBySlug(slug) });
  return <HydrationBoundary state={dehydrate(queryClient)}><ServiceContent slug={slug} /></HydrationBoundary>;
};

export default ServicePage;
