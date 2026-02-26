import { NameSlug } from "@/app/types";
import { getImageSrc } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Footer = async ({
  logo,
  company_name,
  company_address,
  company_phone_number,
  company_email,
  facebook_link,
  line_link,
  copyright,
  servicesNameSlug,
}: {
  logo: { alternativeText: string; url: string };
  company_name: string;
  company_address: string;
  company_phone_number: string;
  company_email: string;
  facebook_link: string;
  line_link: string;
  copyright: string;
  servicesNameSlug: NameSlug[];
}) => {
  return (
    <div className="bg-[#E9E9E9] border-border border-t-[1px]">
      <div className="container flex flex-col justify-between h-full pb-4">
        <div className="flex flex-col md:flex-row gap-10 md:gap-5 xl:gap-20 mt-14 mb-10">
          <div className="space-y-2 md:max-w-xs lg:max-w-md">
            <h1 className="text-xl">ข้อมูลบริษัท</h1>
            <div className="flex gap-2">
              <img
                src={getImageSrc(logo.url)}
                alt={logo.alternativeText || "Logo"}
                width={25}
                height={25}
              />
              <p>{company_name}</p>
            </div>
            <div className="flex gap-2 items-start">
              <img
                src={"/location.svg"}
                alt="Location"
                width={25}
                height={25}
              />
              <p>{company_address}</p>
            </div>
            <div className="flex gap-2">
              <img
                src={"/phone.svg"}
                alt="Phone number"
                width={25}
                height={25}
              />
              <p>{company_phone_number}</p>
            </div>
            <div className="flex gap-2">
              <img src={"/email.svg"} alt="Email" width={25} height={25} />
              <p> {company_email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 max-w-md">
            <h1 className="text-xl">ลิงค์เว็บไซท์</h1>
            <Link href={"/"} className="w-fit">
              หน้าแรก
            </Link>
            <Link href={"/about-us"} className="w-fit">
              เกี่ยวกับเรา
            </Link>
            <Link href={"/contact-us"} className="w-fit">
              ติดต่อเรา
            </Link>
          </div>
          <div className="flex flex-col gap-2 max-w-md">
            <h1 className="text-xl">บริการของเรา</h1>
            {servicesNameSlug.map((service) => (
              <Link
                href={`/services/${service.slug}`}
                className="w-fit"
                key={service.slug}
              >
                <p>{service.name}</p>
              </Link>
            ))}
          </div>
          <div className="flex gap-4 h-fit">
            <a href={facebook_link || "/"} target="_blank" className="w-fit">
              <img src="/Facebook.png" alt="Facebook" width={35} height={35} />
            </a>
            <a href={line_link || "/"} target="_blank" className="w-fit">
              <img src="/LINE.png" alt="Line" width={35} height={35} />
            </a>
          </div>
        </div>
        <p className="text-center text-sm sm:text-base">
          Copyright {new Date().getFullYear()} {copyright}
        </p>
      </div>
    </div>
  );
};

export default Footer;
