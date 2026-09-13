import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import { fetchHomeMetadata, fetchLayoutData } from "@/lib/data";
import { seoMetadata } from "@/lib/metadata";
import {
  JsonLd,
  localBusinessJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";
import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";

const anuphan = Anuphan({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const layout = await fetchLayoutData();
  const homeMetadata = await fetchHomeMetadata();

  return {
    robots: "index, follow",
    ...seoMetadata(homeMetadata, {
      title: homeMetadata.title,
      description: homeMetadata.description,
      icon: layout.favicon.url,
    }),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layout = await fetchLayoutData();

  return (
    <html lang="en">
      <body className={anuphan.className}>
        <JsonLd data={localBusinessJsonLd(layout)} />
        <JsonLd data={websiteJsonLd(layout)} />
        <NavBar
          name={layout.name}
          logo={layout.logo}
          servicesNameSlug={layout.services}
        />
        {children}
        <Footer
          company_address={layout.address}
          company_email={layout.email}
          company_phone_number={layout.phone}
          copyright={layout.copyright}
          facebook_link={layout.facebook_link}
          line_link={layout.line_link}
          logo={layout.logo}
          company_name={layout.name}
          servicesNameSlug={layout.services}
        />
      </body>
    </html>
  );
}
