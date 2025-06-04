import type { Metadata } from "next";

export const APP_NAME = "PanaBarbero";
export const APP_DESCRIPTION =
  "La solucion a gestionar barberias y reservas de clientes.";

export const APP_URL =
  process.env.NODE_ENV === "production"
    ? "https://panabarbero.com"
    : "http://localhost:3000";

export const DEFAULT_TITLE = "Encuentra el mejor barbero para ti";

export const generateSEO = (metadata: {
  title?: string;
  description?: string;
}): Metadata => {
  const { title, description } = metadata;

  return {
    title: {
      absolute: `${title ? title : APP_NAME} - ${description ? description : DEFAULT_TITLE}`,
      default: `${APP_NAME} - ${DEFAULT_TITLE}`,
      template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
    keywords: [
      "barbería",
      "barbero",
      "servicios de barbería",
      "reserva de barbería",
      "barbería cerca de mí",
      "barbería profesional",
      "barbería confiable",
    ],
    authors: [
      {
        name: "Andrés Rodríguez",
        url: "https://afrodriguez.tech",
      },
    ],
    openGraph: {
      title: `${APP_NAME} - ${title ? title : DEFAULT_TITLE}`,
      description: description ? description : APP_DESCRIPTION,
      url: APP_URL,
      siteName: APP_NAME,
      images: [
        {
          url: "/og.webp",
          alt: `${APP_NAME} - ${title ? title : DEFAULT_TITLE}`,
        },
      ],
      locale: "es_CO",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${APP_NAME} - ${title ? title : DEFAULT_TITLE}`,
      description: APP_DESCRIPTION,
      images: [
        {
          url: "/og.webp",
          alt: `${APP_NAME} - ${title ? title : DEFAULT_TITLE}`,
        },
      ],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/icon-192x192.png",
      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
  };
};
