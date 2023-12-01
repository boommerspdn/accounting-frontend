import { Metadata, ResolvingMetadata } from "next";

import Header from "@/components/header";
import RichText from "@/components/rich-text";
import Contact from "@/components/contact";
import PackagesList from "./components/packages-list";
import ServicesList from "./components/services-list";
import ServiceNotFound from "./components/service-not-found";
import { metaFetcher, serviceFetcher, serviceListFetcher } from "@/lib/data";
import { MetaTag, Services } from "@/lib/definitions";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const services: Services = await serviceListFetcher("services");
  const currentService = services.find(
    (service) => service.slug === params.slug
  )?.name;
  const meta: MetaTag[] = await metaFetcher("services", params.slug);

  return {
    title: meta[0].meta_title,
    description: meta[0].meta_description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_API_URL}/services/${currentService}`,
    },
  };
}

const ServicePage = async ({ params }: { params: { slug: string } }) => {
  const serviceData = await serviceFetcher("services", params.slug);

  if (serviceData.length === 0 || serviceData === null) {
    return <ServiceNotFound />;
  }

  return (
    <>
      <Header title={serviceData[0].name} />
      <div className="container relative flex flex-row gap-2">
        <div className="sticky top-[80px] hidden h-full w-[280px] text-xl md:flex md:shrink-0 md:flex-col md:gap-3">
          <ServicesList slug={params.slug} />
        </div>

        <div className="grid grid-cols-5 gap-y-8 gap-x-16 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl col-span-5">
            {serviceData[0].title}
          </h1>
          <div className="col-span-5 space-y-6">
            <RichText
              className="flex flex-col gap-4 text-xl tracking-wide"
              data={serviceData[0].body}
            />
          </div>
          {serviceData[0].package_type.length !== 0 && (
            <div className="col-span-5 space-y-6 py-8 md:py-16">
              {serviceData[0].package_type[0].__component ===
                "content.contact" && (
                <Contact package_type={serviceData[0].package_type} />
              )}
              {serviceData[0].package_type[0].__component ===
                "content.package-list" && ""}

              <PackagesList package_type={serviceData[0].package_type} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ServicePage;
