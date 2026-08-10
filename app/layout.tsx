import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import { fetchHomeMetadata, fetchLayoutData } from "@/lib/data";
import {
  JsonLd,
  localBusinessJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";
import { getImageSrc } from "@/lib/utils";
import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";

const anuphan = Anuphan({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const layout = await fetchLayoutData();
  const homeMetadata = await fetchHomeMetadata();

  return {
    icons: {
      icon: getImageSrc(layout.favicon.url),
    },
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_DOMAIN_URL}`),
    robots: "index, follow",
    openGraph: {
      title: homeMetadata.title,
      description: homeMetadata.description,
      url: process.env.NEXT_PUBLIC_DOMAIN_URL,
      siteName: layout.name,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/opengraph-image.webp`,
          width: 1200,
          height: 630,
          alt: "Website Preview",
        },
      ],
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layoutData = await fetchLayoutData();

  return (
    <>
      <html lang="en">
        <body className={anuphan.className}>
          <JsonLd data={localBusinessJsonLd(layoutData)} />
          <JsonLd data={websiteJsonLd(layoutData)} />
          <NavBar
            name={layoutData.name}
            logo={layoutData.logo}
            servicesNameSlug={layoutData.services}
          />
          {children}
          <Footer
            company_address={layoutData.address}
            company_email={layoutData.email}
            company_phone_number={layoutData.phone}
            copyright={layoutData.copyright}
            facebook_link={layoutData.facebook_link}
            line_link={layoutData.line_link}
            logo={layoutData.logo}
            company_name={layoutData.name}
            servicesNameSlug={layoutData.services}
          />
        </body>
      </html>
    </>
  );
}
