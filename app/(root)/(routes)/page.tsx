import { fetchHomeData, fetchLayoutData } from "@/lib/data";
import type { Metadata } from "next";
import qs from "qs";
import FirstSection from "./components/first-section";
import HeroBanner from "./components/hero-banner";
import HeroSection from "./components/hero-section";
import SecondSection from "./components/second-section";
import ThirdSection from "./components/third-section";

export async function generateMetadata(): Promise<Metadata> {
  const layoutData = await fetchLayoutData();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const query = qs.stringify(
    {
      fields: ["id"],
      populate: {
        seo: {
          fields: ["id", "title", "description"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = new URL(`/api/home-page?${query}`, baseUrl);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch service by slug");
  }

  const meta = await res.json();

  return {
    title: meta.data.seo.title,
    description: meta.data.seo.description,
    icons: {
      icon: `${process.env.NEXT_PUBLIC_API_URL}${layoutData.logo.url}`,
    },
  };
}

export default async function Home() {
  const homeData = await fetchHomeData();

  return (
    <div className="flex flex-col">
      <HeroBanner
        url={homeData.banner_image.url}
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
        services={homeData.services}
      />
      <SecondSection
        title={homeData.section_2_title}
        description={homeData.section_2_body}
        image_url={homeData.section_2_image.url}
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
