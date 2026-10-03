"use client";

import { fetchLiveHome } from "@/lib/client-data";
import { cmsKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import FirstSection from "./components/first-section";
import HeroBanner from "./components/hero-banner";
import HeroSection from "./components/hero-section";
import SecondSection from "./components/second-section";
import ThirdSection from "./components/third-section";

export default function Home() {
  const { data } = useQuery({ queryKey: cmsKeys.home, queryFn: fetchLiveHome });
  if (!data) return null;

  return <div className="flex flex-col">
    <HeroBanner url={data.banner_image.url} alt={data.banner_image.alternativeText} title={data.banner_text} description={data.banner_description} button={data.banner_button} />
    <HeroSection left={{ title: data.banner_section_title_1, description: data.banner_section_description_1 }} center={{ title: data.banner_section_title_2, description: data.banner_section_description_2 }} right={{ title: data.banner_section_title_3, description: data.banner_section_description_3 }} />
    <FirstSection title={data.section_1_title} description={data.section_1_description} services={data.services} />
    <SecondSection title={data.section_2_title} description={data.section_2_body} image_url={data.section_2_image.url} alt={data.section_2_image.alternativeText} />
    <ThirdSection title={data.section_3_title} description={data.section_3_body} button={data.section_3_button} path={data.section_3_button_url} />
  </div>;
}
