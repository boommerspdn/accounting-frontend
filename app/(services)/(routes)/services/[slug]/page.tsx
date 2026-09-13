import { Metadata } from "next";

import Header from "@/components/header";
import RichText from "@/components/rich-text";
import {
  fetchLayoutData,
  fetchServiceBySlug,
  fetchServiceMetadata,
} from "@/lib/data";
import { seoMetadata } from "@/lib/metadata";
import ServiceNotFound from "./components/service-not-found";
import ServicesList from "./components/services-list";

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
  const services = layoutData.services;

  return services.map((service) => ({
    slug: service.slug,
  }));
}

const ServicePage = async ({ params }: Props) => {
  const { slug } = await params;
  const serviceData = await fetchServiceBySlug(slug);

  if (!serviceData) {
    return <ServiceNotFound />;
  }

  return (
    <>
      <Header title={serviceData.name} />
      <div className="container relative flex flex-row gap-2">
        <div className="sticky top-[80px] hidden h-full w-[280px] text-xl md:flex md:shrink-0 md:flex-col md:gap-3">
          <ServicesList slug={slug} />
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
