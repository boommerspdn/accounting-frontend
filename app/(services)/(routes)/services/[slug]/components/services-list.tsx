import { fetchLayoutData } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ServiceListProps {
  slug: string;
}

const ServicesList = async ({ slug }: ServiceListProps) => {
  const layoutData = await fetchLayoutData();
  const services = layoutData.services;
  return (
    <>
      {services.map((service, index) => (
        <Link
          key={index}
          href={`/services/${service.slug}`}
          className={cn(
            "text-muted-foreground hover:text-black/80",
            service.slug === slug ? "text-black" : "",
          )}
        >
          {service.name}
        </Link>
      ))}
    </>
  );
};

export default ServicesList;
