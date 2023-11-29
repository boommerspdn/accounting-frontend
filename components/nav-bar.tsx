"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavLinks, Services } from "@/lib/definitions";
import SideBar from "./side-bar";
import { Menu } from "lucide-react";
import ServiceNav from "./service-nav";

interface NavBarProps {
  navItems: NavLinks;
  services: Services;
}

const NavBar = ({ navItems, services }: NavBarProps) => {
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
        color
      )}
    >
      <div className="flex gap-2 items-center justify-center">
        <SideBar
          open={open}
          setOpen={setOpen}
          website_name={navItems?.website_name}
          home={navItems?.home}
          service={navItems?.service}
          contact_us={navItems?.contact_us}
          about_us={navItems?.about_us}
        />
        <Menu onClick={() => setOpen(true)} className="md:hidden" />
        <span className="font-bold">{navItems?.website_name}</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <Link href={"/"}>{navItems?.home}</Link>
        <ServiceNav services={services} />
        {/* <Link href={"/services/1"}>{navItems?.service}</Link> */}
        <Link href={"/contact-us"}>{navItems?.contact_us}</Link>
        <Link href={"/about-us"}>{navItems?.about_us}</Link>
      </div>
    </nav>
  );
};

export default NavBar;
