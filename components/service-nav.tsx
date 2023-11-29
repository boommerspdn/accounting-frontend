"use client";

import Link from "next/link";

import { Services } from "@/lib/definitions";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface ServiceNavProps {
  services: Services;
}

const ServiceNav = ({ services }: ServiceNavProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="w-fit li-m-0">
        <NavigationMenuItem>
          <Link href={`/services/${services[0].slug}`} legacyBehavior passHref>
            <NavigationMenuTrigger className="p-0 m-0 h-auto bg-inherit text-base font-normal hover:bg-inherit hover:text-inherit focus:text-inherit focus:bg-inherit data-[active]:bg-inherit data-[state=open]:bg-inherit transition-none">
              บริการของเรา
            </NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="w-[240px] p-2 space-y-1">
              {services.map((service) => (
                <li key={service.name} className="m-0">
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/services/${service.slug}`}
                      className="h-full w-full flex p-1 rounded-md hover:bg-accent"
                    >
                      <p className="text-sm px-1">{service.name}</p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ServiceNav;
