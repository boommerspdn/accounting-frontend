import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import { fetchLayoutData } from "@/lib/data";
import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";

const anuphan = Anuphan({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const layout = await fetchLayoutData();

  return {
    icons: {
      icon: `${process.env.NEXT_PUBLIC_API_URL}${layout.logo.url}`,
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
    <html lang="en">
      <body className={anuphan.className}>
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
  );
}
