import Service from "./service";

interface FirstSection {
  title: string;
  description: string;
  services: service;
}

type service = {
  title: string;
  description: string;
}[];

const FirstSection = ({ title, description, services }: FirstSection) => {
  return (
    <section className="container my-16 space-y-8">
      <h1 className="text-5xl">{title}</h1>
      <p className="text-xl">{description}</p>
      <div className="flex gap-8">
        {[0, 1, 3, 4].map((service) => (
          <Service key={service} />
        ))}
      </div>
    </section>
  );
};

export default FirstSection;
