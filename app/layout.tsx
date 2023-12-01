import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";
import { pageFetcher, serviceListFetcher } from "@/lib/data";
import { Services } from "@/lib/definitions";

import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";

const anuphan = Anuphan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Fast on Time",
    default: "Fast on Time", // a default is required when creating a template
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = await pageFetcher("navigation-bar");
  const services: Services = await serviceListFetcher("services");

  return (
    <html lang="en">
      <body className={anuphan.className}>
        <NavBar navItems={navItems} services={services} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
