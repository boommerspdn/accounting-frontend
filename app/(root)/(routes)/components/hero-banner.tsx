import { getImageSrc } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroBannerProps {
  url: string;
  alt: string;
  title: string;
  description: string;
  button: string;
}

const HeroBanner = ({
  url,
  alt,
  title,
  description,
  button,
}: HeroBannerProps) => {
  return (
    <div className="relative w-full h-[700px] flex justify-center items-center">
      <div className="container flex flex-col justify-center items-center gap-y-12">
        <div className="text-white text-4xl md:text-5xl lg:text-6xl text-center z-30">
          {title}
        </div>
        <div className="text-white text-lg lg:text-xl text-center z-30">
          {description}
        </div>
        <Link href="/contact-us" className="z-30">
          <button className="py-3 px-10 rounded-2xl bg-[#FFC940] font-bold md:text-lg cursor-pointer z-30">
            {button}
          </button>
        </Link>
      </div>
      <div className="absolute w-full h-full bg-black -z-40 opacity-70 " />
      <Image
        className="object-cover -z-50"
        src={getImageSrc(url)}
        alt={alt || "Hero Background"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        fill
        priority
      />
    </div>
  );
};

export default HeroBanner;
