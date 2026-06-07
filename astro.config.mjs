// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  output: "static",
  integrations: [react()],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Sans",
      cssVariable: "--font-ibm-plex-sans",
      weights: ["400 700"],
      styles: ["normal"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Lilex",
      cssVariable: "--font-lilex",
      weights: ["400 700"],
      styles: ["normal"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
