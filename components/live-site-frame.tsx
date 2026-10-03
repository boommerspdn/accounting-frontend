"use client";

import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import { fetchLiveLayout } from "@/lib/client-data";
import { cmsKeys } from "@/lib/query-keys";
import { JsonLd, localBusinessJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { getImageSrc } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function LiveSiteFrame({ children }: { children: React.ReactNode }) {
  const { data: layout } = useQuery({ queryKey: cmsKeys.layout, queryFn: fetchLiveLayout });
  const favicon = getImageSrc(layout?.favicon.url);

  useEffect(() => {
    if (!favicon) return;
    for (const rel of ["icon", "shortcut icon", "apple-touch-icon"]) {
      let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = favicon;
    }
  }, [favicon]);

  if (!layout) return null;

  return <>
    <JsonLd data={localBusinessJsonLd(layout)} />
    <JsonLd data={websiteJsonLd(layout)} />
    <NavBar name={layout.name} logo={layout.logo} servicesNameSlug={layout.services} />
    {children}
    <Footer company_address={layout.address} company_email={layout.email} company_phone_number={layout.phone} copyright={layout.copyright} facebook_link={layout.facebook_link} line_link={layout.line_link} logo={layout.logo} company_name={layout.name} servicesNameSlug={layout.services} />
  </>;
}
