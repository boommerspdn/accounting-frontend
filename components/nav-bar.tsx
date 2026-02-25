"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NameSlug } from "@/app/types";
import { cn, getImageSrc } from "@/lib/utils";
import { Menu } from "lucide-react";
import ServiceNav from "./service-nav";
import SideBar from "./side-bar";

interface NavBarProps {
  name: string;
  logo: { alternativeText: string; url: string };
  servicesNameSlug: NameSlug[];
}

const NavBar = ({ name, logo, servicesNameSlug }: NavBarProps) => {
  const [color, setColor] = useState("");
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const animation = "transition-colors ease-in-out duration-500";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newColor = scrollY > 0 ? "bg-white text-black border-border" : "";
      setColor(newColor);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={cn(
        `h-16 fixed flex items-center justify-between w-full px-8 border-transparent border-b-[1px] z-50 ${
          pathname === "/"
            ? `bg-transparent text-white ${animation}`
            : "bg-white text-black border-border"
        }`,
        color,
      )}
    >
      <div className="flex gap-2 items-center justify-center">
        <SideBar
          open={open}
          setOpen={setOpen}
          website_name={name}
          home={"หน้าแรก"}
          contact_us={"ติดต่อเรา"}
          about_us={"เกี่ยวกับเรา"}
          serviceNameAndSlug={servicesNameSlug}
        />
        <Menu
          onClick={() => setOpen(true)}
          className="md:hidden cursor-pointer"
        />
        <div className="relative w-[25px] aspect-square">
          <img
            src={getImageSrc(logo.url)}
            alt={logo.alternativeText || "Logo"}
            className="w-full"
          />
        </div>
        <span className="font-bold">{name}</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <Link href={"/"}>หน้าแรก</Link>
        <ServiceNav services={servicesNameSlug} />
        <Link href={"/contact-us"}>ติดต่อเรา</Link>
        <Link href={"/about-us"}>เกี่ยวกับเรา</Link>
      </div>
    </nav>
  );
};

export default NavBar;
