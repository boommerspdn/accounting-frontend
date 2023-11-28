import Header from "@/components/header";
import { pageFetcher } from "@/lib/data";
import Image from "next/image";
import React from "react";
import RichText from "@/components/rich-text";

const AboutUs = async () => {
  const aboutUsData = await pageFetcher("about-page");

  return (
    <>
      <Header title={aboutUsData.header} />
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4">
        <div className="col-span-1 h-fit">
          <p className="text-xl">{aboutUsData.description}</p>
        </div>
        <div className="lg:hidden col-span-1 relative h-[22rem]">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${aboutUsData.header_image.url}`}
            alt="hello"
            fill
            className="rounded-3xl object-cover"
          />
        </div>
        <div className="hidden lg:block relative h-[22rem]">
          <div className="absolute w-[90%] aspect-[3/2] bg-custom-blue -top-20 ms-[10%] rounded-3xl" />
          <div className="absolute -top-28 ms-[2.25rem] w-[90%] aspect-[3/2]">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${aboutUsData.header_image.url}`}
              alt="hello"
              fill
              className="rounded-3xl custom-shadow object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-2 -top-12 space-y-8">
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
