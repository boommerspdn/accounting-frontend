import Header from "@/components/header";
import RichText from "@/components/rich-text";
import Contact from "@/components/contact";

import { serviceFetcher } from "@/lib/data";

import PackagesList from "./components/packages-list";
import ServicesList from "./components/services-list";
import ServiceNotFound from "./components/service-not-found";

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
              className="flex flex-col gap-2 text-xl tracking-wide"
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
