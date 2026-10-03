"use client";

import Header from "@/components/header";
import RichText from "@/components/rich-text";
import { fetchLiveAbout } from "@/lib/client-data";
import { cmsKeys } from "@/lib/query-keys";
import { getImageSrc } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export default function AboutUs() {
  const { data } = useQuery({ queryKey: cmsKeys.about, queryFn: fetchLiveAbout });
  if (!data) return null;
  return <>
    <Header title="เกี่ยวกับเรา" />
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-4">
      <div className="col-span-1 h-fit"><RichText data={data.about_body} className="text-xl space-y-4" /></div>
      <div className="relative h-[19rem] sm:h-[22rem]"><div className="hidden lg:block absolute w-[90%] aspect-[3/2] bg-custom-blue -top-20 ms-[10%] rounded-3xl" /><div className="absolute lg:-top-28 lg:ms-[2.25rem] w-full max-w-lg lg:max-w-none lg:w-[90%] aspect-[3/2] md:mx-auto md:inset-0"><div className="relative w-full h-full"><img src={getImageSrc(data.header_image.url)} alt={data.header_image.alternativeText || "Header Image"} className="rounded-3xl shadow-2xl object-cover w-full h-full" /></div></div></div>
      <div className="lg:col-span-2 md:-top-12 space-y-8"><div className="relative sm:w-fit"><h1 className="text-3xl md:text-5xl">{data.reason_title}</h1><div className="absolute bg-custom-yellow h-2 w-60 mt-2 right-0 sm:-right-24" /></div><RichText className="text-xl px-6 2xl:px-0" data={data.reason_body} /></div>
    </div>
  </>;
}
