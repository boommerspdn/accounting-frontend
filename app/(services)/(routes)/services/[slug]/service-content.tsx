"use client";

import Header from "@/components/header";
import RichText from "@/components/rich-text";
import { fetchLiveLayout, fetchLiveService } from "@/lib/client-data";
import { cmsKeys } from "@/lib/query-keys";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function ServiceContent({ slug }: { slug: string }) {
  const service = useQuery({ queryKey: cmsKeys.service(slug), queryFn: () => fetchLiveService(slug) });
  const layout = useQuery({ queryKey: cmsKeys.layout, queryFn: fetchLiveLayout });
  if (!service.data) return <div className="container py-12">Service not found.</div>;
  return <>
    <Header title={service.data.name} />
    <div className="container relative flex flex-row gap-2">
      <div className="sticky top-[80px] hidden h-full w-[280px] text-xl md:flex md:shrink-0 md:flex-col md:gap-3">{layout.data?.services.map((item) => <Link key={item.slug} href={`/services/${item.slug}`} className={cn("text-muted-foreground hover:text-black/80", item.slug === slug ? "text-black" : "")}>{item.name}</Link>)}</div>
      <div className="grid grid-cols-5 gap-y-8 gap-x-16 w-full"><h1 className="text-3xl sm:text-4xl md:text-5xl col-span-5">{service.data.title}</h1><div className="col-span-5 space-y-6"><RichText className="flex flex-col gap-4 text-xl tracking-wide" data={service.data.body} /></div></div>
    </div>
  </>;
}
