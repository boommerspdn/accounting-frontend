import Link from "next/link";
import { pageFetcher } from "@/lib/data";
import { Services } from "@/lib/definitions";
import { cn } from "@/lib/utils";

interface ServiceListProps {
  slug: string;
}

const ServicesList = async ({ slug }: ServiceListProps) => {
  const services: Services = await pageFetcher("services");
  return (
    <>
      {services.map((service, index) => (
        <Link
          key={index}
          href={`/services/${service.slug}`}
          className={cn(
            "text-muted-foreground hover:text-black/80",
            service.slug === slug ? "text-black" : ""
          )}
        >
          {service.name}
        </Link>
      ))}
    </>
  );
};

export default ServicesList;
