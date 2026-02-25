import { Metadata, ResolvingMetadata } from "next";

import Header from "@/components/header";
import RichText from "@/components/rich-text";
import { fetchLayoutData, fetchServiceBySlug } from "@/lib/data";
import qs from "qs";
import ServiceNotFound from "./components/service-not-found";
import ServicesList from "./components/services-list";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: params.slug,
        },
      },
      fields: ["id"], // Only returns the ID of the main entry
      populate: {
        seo: {
          fields: ["id", "title", "description"], // Specific fields from the SEO component
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = new URL(`/api/services?${query}`, baseUrl);

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
    title: meta.data[0].seo.title,
    description: meta.data[0].seo.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_API_URL}/services/${params.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const layoutData = await fetchLayoutData();
  const services = layoutData.services;

  return services.map((service) => ({
    slug: service.slug,
  }));
}

const ServicePage = async ({ params }: { params: { slug: string } }) => {
  const serviceData = await fetchServiceBySlug(params.slug);

  if (serviceData.length === 0 || serviceData === null) {
    return <ServiceNotFound />;
  }

  return (
    <>
      <Header title={serviceData.name} />
      <div className="container relative flex flex-row gap-2">
        <div className="sticky top-[80px] hidden h-full w-[280px] text-xl md:flex md:shrink-0 md:flex-col md:gap-3">
          <ServicesList slug={params.slug} />
        </div>

        <div className="grid grid-cols-5 gap-y-8 gap-x-16 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl col-span-5">
            {serviceData.title}
          </h1>
          <div className="col-span-5 space-y-6">
            <RichText
              className="flex flex-col gap-4 text-xl tracking-wide"
              data={serviceData.body}
            />
          </div>
          {/* {serviceData.package_type.length !== 0 && (
            <div className="col-span-5 space-y-6 py-8 md:py-16">
              {serviceData.package_type.__component === "content.contact" && (
                <Contact package_type={serviceData.package_type} />
              )}
              {serviceData.package_type.__component ===
                "content.package-list" && ""}

              <PackagesList package_type={serviceData.package_type} />
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ServicePage;
