import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import { fetchHomeMetadata, fetchLayoutData } from "@/lib/data";
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
      icon: getImageSrc(layout.logo.url),
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: layoutData.name,
    logo: layoutData.logo.url,
    description:
      "รับทำบัญชีในประเทศไทย กรุงเทพ (Accounting Services in Thailand, Bangkok))",
    address: {
      "@type": "PostalAddress",
      streetAddress: layoutData.address,
      addressLocality: "Bangkok",
      postalCode: "10330",
      addressCountry: "TH",
    },
    telephone: layoutData.phone,
    openingHours: "Mo-Sa 08:00-18:00",
    url: process.env.NEXT_PUBLIC_DOMAIN_URL,
    sameAs: [layoutData.facebook_link, layoutData.line_link],
  };

  return (
    <>
      <html lang="en">
        <body className={anuphan.className}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
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
