import Header from "@/components/header";
import RichText from "@/components/rich-text";
import { fetchAboutData } from "@/lib/data";
import { Metadata } from "next";
import Image from "next/image";
import qs from "qs";

export async function generateMetadata(): Promise<Metadata> {
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

  const url = new URL(`/api/about-page?${query}`, baseUrl);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch about page metadata");
  }

  const meta = await res.json();

  return {
    title: meta.data.seo.title,
    description: meta.data.seo.description,
  };
}

const AboutUs = async () => {
  const aboutUsData = await fetchAboutData();

  return (
    <>
      <Header title={"เกี่ยวกับเรา"} />
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-4">
        <div className="col-span-1 h-fit">
          <RichText
            data={aboutUsData.about_body}
            className="text-xl space-y-4"
          />
        </div>
        <div className="relative h-[19rem] sm:h-[22rem]">
          <div className="hidden lg:block absolute w-[90%] aspect-[3/2] bg-custom-blue -top-20 ms-[10%] rounded-3xl" />
          <div className="absolute lg:-top-28 lg:ms-[2.25rem] w-full max-w-lg lg:max-w-none lg:w-[90%] aspect-[3/2] md:mx-auto md:inset-0">
            <div className="relative w-full h-full">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${aboutUsData.header_image.url}`}
                alt={aboutUsData.header_image.alternativeText || "Header Image"}
                className="rounded-3xl shadow-2xl object-cover w-full h-full"
              />
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
