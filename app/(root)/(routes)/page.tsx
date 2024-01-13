import type { Metadata, ResolvingMetadata } from "next";
import { metaFetcher, pageFetcher, serviceListFetcher } from "@/lib/data";
import { MetaTag, Services } from "@/lib/definitions";
import HeroBanner from "./components/hero-banner";
import HeroSection from "./components/hero-section";
import FirstSection from "./components/first-section";
import SecondSection from "./components/second-section";
import ThirdSection from "./components/third-section";

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetaTag = await metaFetcher("home-page", null);

  return {
    title: meta.meta_title,
    description: meta.meta_description,
  };
}

export default async function Home() {
  const homeData = await pageFetcher("home-page");
  const services: Services = await serviceListFetcher("services");

  return (
    <div className="flex flex-col">
      <HeroBanner
        url={homeData.banner_image.name}
        alt={homeData.banner_image.alternativeText}
        title={homeData.banner_text}
        description={homeData.banner_description}
        button={homeData.banner_button}
      />
      <HeroSection
        left={{
          title: homeData.banner_section_title_1,
          description: homeData.banner_section_description_1,
        }}
        center={{
          title: homeData.banner_section_title_2,
          description: homeData.banner_section_description_2,
        }}
        right={{
          title: homeData.banner_section_title_3,
          description: homeData.banner_section_description_3,
        }}
      />
      <FirstSection
        title={homeData.section_1_title}
        description={homeData.section_1_description}
        services={services}
      />
      <SecondSection
        title={homeData.section_2_title}
        description={homeData.section_2_body}
        image_url={homeData.section_2_image.name}
        alt={homeData.section_2_image.alternativeText}
      />
      <ThirdSection
        title={homeData.section_3_title}
        description={homeData.section_3_body}
        button={homeData.section_3_button}
        path={homeData.section_3_button_url}
      />
    </div>
  );
}
