"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// npm hoists TanStack Query beside the workspace's React 18 types while this app uses React 19.
const Provider = QueryClientProvider as React.ComponentType<{
  client: QueryClient;
  children: React.ReactNode;
}>;

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { staleTime: 0, refetchOnWindowFocus: true, retry: 1 },
    },
  }));

  return <Provider client={queryClient}>{children}</Provider>;
}
