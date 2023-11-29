import { Services } from "@/lib/definitions";
import Service from "./service";

interface FirstSection {
  title: string;
  description: string;
  services: Services;
}

const FirstSection = ({ title, description, services }: FirstSection) => {
  return (
    <section className="container my-16 space-y-8">
      <h1 className="text-3xl md:text-5xl">{title}</h1>
      <p className="text-xl">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {services.map((service) => (
          <Service
            key={service.name}
            title={service.name}
            body={service.description}
            path={service.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default FirstSection;
