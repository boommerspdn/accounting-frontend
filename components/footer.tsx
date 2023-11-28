import Link from "next/link";
import Image from "next/image";
import { pageFetcher } from "@/lib/data";
import { SocialMedias } from "@/lib/definitions";

const Footer = async () => {
  const footer = await pageFetcher("footer");
  const navbar = await pageFetcher("navigation-bar");
  const socialMedias: SocialMedias = await pageFetcher("social-medias");

  return (
    <div className="bg-[#E9E9E9] border-border border-t-[1px]">
      <div className="container flex flex-col justify-between h-full pb-4">
        <div className="flex flex-col md:flex-row gap-10 md:gap-5 xl:gap-20 mt-14 mb-10">
          <div className="space-y-2 md:max-w-xs lg:max-w-md">
            <h1 className="text-xl">{footer.company_info}</h1>
            <div className="flex gap-2">
              <Image src={"/email.svg"} alt="" width={25} height={25} />
              <p>{footer.company_name}</p>
            </div>
            <div className="flex gap-2 items-start">
              <Image src={"/location.svg"} alt="" width={25} height={25} />
              <p>{footer.company_address}</p>
            </div>
            <div className="flex gap-2">
              <Image src={"/phone.svg"} alt="" width={25} height={25} />
              <p>{footer.company_phone_number}</p>
            </div>
            <div className="flex gap-2">
              <Image src={"/email.svg"} alt="" width={25} height={25} />
              <p> {footer.company_email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 max-w-md">
            <h1 className="text-xl">ลิงค์เว็บไซท์</h1>
            <Link href={"/"}>{navbar.home}</Link>
            <Link href={"/service/1"}>{navbar.service}</Link>
            <Link href={"/about-us"}>{navbar.about_us}</Link>
            <Link href={"/contact-us"}>{navbar.contact_us}</Link>
          </div>
          <div className="space-y-2 max-w-md">
            <h1 className="text-xl">บริการของเรา</h1>
            <p>จดทะเบียนนิติบุคคล</p>
            <p>ทำบัญชีรายเดือน</p>
            <p>ปิดงบการเงิน</p>
          </div>
          <div className="flex gap-4 h-fit">
            {socialMedias.map((socialMedia, index) => (
              <Link
                key={index}
                href={socialMedia.url || "/"}
                target="_blank"
                className="h-fit"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${socialMedia.image.url}`}
                  alt={socialMedia.platform}
                  width={35}
                  height={35}
                />
              </Link>
            ))}
          </div>
        </div>
        <p className="text-center text-sm sm:text-base">{footer.copyright}</p>
      </div>
    </div>
  );
};

export default Footer;
