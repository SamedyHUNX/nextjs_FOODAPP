"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

type ProvidersProp = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProp) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
};

export { Providers };
