import type { Metadata } from "next";

export const generateSEO = (data: {
  title?: string;
  description?: string;
}): Metadata => {
  const APP_NAME = "PanaBarbero";
  const APP_DESCRIPTION =
    "Encuentra y reserva servicios de barbería en tu área. Conoce a los mejores barberos y descubre sus servicios.";
  const APP_URL = "https://panabarbero.com";
  const DEFAULT_TITLE = "Encuentra el mejor barbero para ti";

  const { title, description } = data;

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
      "corte de cabello",
      "afeitado",
      "peluquería",
      "estilo de cabello",
      "barbería cerca de mí",
      "barbería en línea",
      "barbería local",
      "barbería profesional",
      "barbería confiable",
      "barbería recomendada",
      "barbería con reseñas",
      "barbería con citas",
      "barbería con servicios",
      "barbería con precios",
      "barbería con promociones",
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
          url: "https://panabarbero.com/og-image.png",
          width: 1200,
          height: 630,
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
      images: ["https://panabarbero.com/og-image.png"],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    themeColor: "#ffffff",
  };
};
