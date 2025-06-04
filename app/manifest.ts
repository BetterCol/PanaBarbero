import { APP_DESCRIPTION, APP_NAME } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    lang: "es",
    theme_color: "#2B7FFF",
    background_color: "#09090B",
    display: "standalone",
    display_override: ["standalone"],
    scope: "/",
    start_url: "/",
    name: APP_NAME,
    description: APP_DESCRIPTION,
    short_name: APP_NAME,
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
