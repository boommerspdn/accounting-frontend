type section = {
  title: string;
  description: string;
};

interface HeroSectionProps {
  left: section;
  center: section;
  right: section;
}

const HeroSection = ({ left, center, right }: HeroSectionProps) => {
  return (
    <section className="bg-custom-blue text-white">
      <div className="container h-48 grid grid-cols-3">
        <div className="flex flex-col justify-center my-11 border-white border-e-8">
          <span className="text-custom-yellow text-2xl">{left.title}</span>
          <span className="text-xl">{left.description}</span>
        </div>
        <div className="flex flex-col justify-center my-11 ps-8 border-white border-e-8">
          <span className="text-custom-yellow text-2xl">{center.title}</span>
          <span className="text-xl">{center.description}</span>
        </div>
        <div className="flex flex-col justify-center my-11 ps-8">
          <span className="text-custom-yellow text-2xl">{right.title}</span>
          <span className="text-xl">{right.description}</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
