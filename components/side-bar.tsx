"use client";

import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SideBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  website_name: string;
  home: string;
  service: string;
  about_us: string;
  contact_us: string;
}

const SideBar = ({
  open,
  setOpen,
  website_name,
  home,
  service,
  about_us,
  contact_us,
}: SideBarProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle className="text-left">{website_name}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 pt-4">
          <Link href={"/"} className="w-fit">
            {home}
          </Link>
          <Link href={"/services/1"} className="w-fit">
            {service}
          </Link>
          <Link href={"/contact-us"} className="w-fit">
            {contact_us}
          </Link>
          <Link href={"/about-us"} className="w-fit">
            {about_us}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
