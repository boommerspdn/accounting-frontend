"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavLinks } from "@/lib/definitions";

interface NavBarProps {
  navItems: NavLinks;
}

const NavBar = ({ navItems }: NavBarProps) => {
  const [color, setColor] = useState("");

  const pathname = usePathname();
  const animation = "transition-colors ease-in-out duration-500";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newColor =
        scrollY > 0 && pathname !== "/"
          ? "bg-white"
          : scrollY > 0 && pathname === "/"
          ? "bg-white border-border !text-black"
          : "bg-transparent"; // Change the color based on the scroll position
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
        `h-16 fixed flex items-center justify-between w-full px-8 border-transparent border-b-[1px] z-[999]`,
        pathname !== "/" ? "border-border" : "text-white",
        color,
        pathname === "/" ? animation : ""
      )}
    >
      <div className="flex items-center justify-center">
        <span className="font-bold">{navItems?.website_name}</span>
      </div>
      <div className="flex items-center gap-8">
        <Link href={"/"} className={cn(``)}>
          {navItems?.home}
        </Link>
        <Link href={"/services/1"} className={cn(``)}>
          {navItems?.service}
        </Link>
        <Link href={"/contact-us"} className={cn(``)}>
          {navItems?.contact_us}
        </Link>
        <Link href={"/about-us"} className={cn(``)}>
          {navItems?.about_us}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
