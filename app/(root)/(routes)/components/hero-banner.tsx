import Image from "next/image";

interface HeroBannerProps {
  url: string;
  title: string;
  description: string;
  button: string;
}

const HeroBanner = ({ url, title, description, button }: HeroBannerProps) => {
  return (
    <div className="relative w-full h-[700px] flex justify-center items-center">
      <div className="container flex flex-col justify-center items-center gap-y-12">
        <div className="text-white text-6xl text-center z-50">{title}</div>
        <div className="text-white text-xl text-center z-50">{description}</div>
        <button className="py-3 px-10 rounded-2xl bg-[#FFC940] font-bold text-lg cursor-pointer z-50">
          {button}
        </button>
      </div>
      <div className="absolute w-full h-full bg-black -z-40 opacity-70 " />
      <Image
        className="object-cover -z-50"
        src={`${process.env.NEXT_PUBLIC_API_URL}${url}`}
        alt="test"
        fill
        priority
        quality={100}
      />
    </div>
  );
};

export default HeroBanner;
