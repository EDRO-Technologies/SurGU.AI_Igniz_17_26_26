import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import { queryClient } from "@shared/constants/queryClient";
import { ThemeProvider } from "@shared/theme/ThemeProvider";
import { Toaster } from "@shared/ui/toaster";

import { routes } from "./router";

export const Providers = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={routes} />
      <Toaster />
    </ThemeProvider>
  </QueryClientProvider>
);
