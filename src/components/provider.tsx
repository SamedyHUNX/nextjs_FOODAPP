"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

type ProvidersProp = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProp) => {
  return (
    <NextThemesProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
};

export { Providers };
