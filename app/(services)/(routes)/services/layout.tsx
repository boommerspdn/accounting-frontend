import NavBar from "@/components/nav-bar";
import { pageFetcher } from "@/lib/data";

export default async function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = await pageFetcher("navigation-bar");

  return (
    <>
      <NavBar navItems={navItems} />
      <div className="pt-16">{children}</div>;
    </>
  );
}
