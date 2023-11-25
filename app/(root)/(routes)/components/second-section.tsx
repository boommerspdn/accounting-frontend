import Image from "next/image";

interface SecondSectionProps {
  title: string;
  description: string;
  image_url: string;
}

const SecondSection = ({
  title,
  description,
  image_url,
}: SecondSectionProps) => {
  return (
    <div className="bg-custom-blue">
      <div className="container grid grid-cols-2 py-16 gap-x-12">
        <div className="relative h-[400px] w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${image_url}`}
            alt="test"
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="pt-8 space-y-4">
          <h1 className="text-custom-yellow text-5xl">{title}</h1>
          <p className="text-white text-2xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
