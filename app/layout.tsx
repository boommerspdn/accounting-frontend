import LiveSiteFrame from "@/components/live-site-frame";
import QueryProvider from "@/components/query-provider";
import { fetchLayoutData } from "@/lib/data";
import { mediaUrl } from "@/lib/metadata";
import { cmsKeys } from "@/lib/query-keys";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";

const anuphan = Anuphan({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const layout = await fetchLayoutData();
  const icon = mediaUrl(layout.favicon.url) ?? "/favicon.png";
  return {
    title: "Fast On Time",
    robots: "index, follow",
    icons: { icon, shortcut: icon, apple: icon },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery({ queryKey: cmsKeys.layout, queryFn: fetchLayoutData });

  return (
    <html lang="en">
      <body className={anuphan.className}>
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <LiveSiteFrame>{children}</LiveSiteFrame>
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
