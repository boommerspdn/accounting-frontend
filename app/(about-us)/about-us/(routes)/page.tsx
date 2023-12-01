import { Metadata } from "next";

import Header from "@/components/header";
import { metaFetcher, pageFetcher } from "@/lib/data";
import Image from "next/image";
import React from "react";
import RichText from "@/components/rich-text";
import { MetaTag, SocialMedias } from "@/lib/definitions";

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetaTag = await metaFetcher("about-page", null);

  return {
    title: meta.meta_title,
    description: meta.meta_description,
  };
}

const AboutUs = async () => {
  const aboutUsData = await pageFetcher("about-page");
  const socialMedias: SocialMedias = await pageFetcher("social-medias");

  return (
    <>
      <Header title={aboutUsData.header} />
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-4">
        <div className="col-span-1 h-fit">
          <RichText data={aboutUsData.body} className="text-xl space-y-4" />
        </div>
        <div className="relative h-[19rem] sm:h-[22rem]">
          <div className="hidden lg:block absolute w-[90%] aspect-[3/2] bg-custom-blue -top-20 ms-[10%] rounded-3xl" />
          <div className="absolute lg:-top-28 lg:ms-[2.25rem] w-full max-w-lg lg:max-w-none lg:w-[90%] aspect-[3/2] md:mx-auto md:inset-0">
            <div className="relative w-full h-full">
              {aboutUsData.header_image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${aboutUsData.header_image.url}`}
                  alt={
                    aboutUsData.header_image.alternativeText || "Header Image"
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
                  className="rounded-3xl shadow-2xl object-cover"
                  priority={true}
                />
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 md:-top-12 space-y-8">
          <div className="relative sm:w-fit">
            <h1 className="text-3xl md:text-5xl">{aboutUsData.reason_title}</h1>
            <div className="absolute bg-custom-yellow h-2 w-60 mt-2 right-0 sm:-right-24" />
          </div>
          <RichText
            className="text-xl px-6 2xl:px-0"
            data={aboutUsData.reason_body}
          />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
