import NavBar from "@/components/nav-bar";
import { pageFetcher } from "@/lib/data";
import { Services } from "@/lib/definitions";

export default async function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = await pageFetcher("navigation-bar");
  const services: Services = await pageFetcher("services");

  return (
    <>
      <NavBar navItems={navItems} services={services} />
      <div className="py-16">{children}</div>;
    </>
  );
}
