import type { Metadata } from "next";

// SEO Metadata for Casa Ámbar
export const metadata: Metadata = {
  title: "Casa Ámbar Bosque Real | NIDDO Broker | NIDDIA Asistente IA | Venta Exclusiva",
  description: "Descubre Casa Ámbar, residencia de lujo 477m² en fraccionamiento Ambar, Bosque Real. NIDDO broker especialista y NIDDIA asistente virtual IA. Diseño contemporáneo, materiales nobles. Entrega 2025.",
  keywords: [
    "Casa Ámbar Bosque Real",
    "NIDDO broker Bosque Real",
    "NIDDIA asistente virtual",
    "Bosque Real propiedades",
    "Casas en venta Bosque Real",
    "Departamentos en Bosque Real",
    "Inmuebles exclusivos en Bosque Real",
    "Vivir en Bosque Real",
    "fraccionamiento Ambar Bosque Real",
    "broker Bosque Real",
    "bienes raíces Bosque Real",
    "residencias Bosque Real",
    "comprar casa Bosque Real",
    "inversión Bosque Real",
    "desarrollos Bosque Real",
    "Sky View Bosque Real",
    "Reserva Bosque Real",
    "Estado de México Bosque Real",
    "inmuebles de lujo Bosque Real",
    "residencia exclusiva Bosque Real",
    "venta casa lujo Bosque Real",
    "diseño contemporáneo",
    "inteligencia artificial inmobiliaria",
    "NIDDIA IA",
    "asistente virtual propiedades",
    "piedra sinterizada",
    "477 metros construcción",
    "300 metros lote",
    "cuarzos Black Mirror",
    "granito Vía Láctea",
    "walking closet",
    "cava vinos",
    "gimnasio privado",
    "terraza 64m2",
    "wellness lounge",
    "familia room",
    "recámaras baño privado",
    "vestíbulo doble altura",
    "cocina vanguardista",
    "estudio independiente",
    "sótano área social",
    "seguridad 24/7 Bosque Real",
    "entorno natural Bosque Real",
    "exclusividad Bosque Real",
    "NIDDO.ai"
  ].join(", "),
  openGraph: {
    title: "Casa Ámbar Bosque Real | NIDDO Broker | NIDDIA IA",
    description: "Residencia exclusiva 477m² en Bosque Real, Estado de México. NIDDO broker especialista, NIDDIA asistente virtual IA. Diseño contemporáneo, materiales nobles, 4 niveles lujo.",
    url: "https://niddo.ai/casa-ambar",
    siteName: "NIDDO - Broker Bosque Real",
    images: [
      {
        url: "https://res.cloudinary.com/dwrtldhxd/image/upload/v1734541698/LEANBIMHsm_cvudos.png",
        width: 1200,
        height: 630,
        alt: "Casa Ámbar - Fachada contemporánea en Bosque Real",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa Ámbar Bosque Real | NIDDO Broker + NIDDIA IA",
    description: "Residencia exclusiva 477m² en Bosque Real. NIDDO broker especialista y NIDDIA asistente virtual IA. Diseño contemporáneo, materiales nobles.",
    images: ["https://res.cloudinary.com/dwrtldhxd/image/upload/v1734541698/LEANBIMHsm_cvudos.png"],
    creator: "@niddobroker",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://niddo.ai/casa-ambar",
  },
  verification: {
    google: "tu-codigo-google-verificacion",
  },
  other: {
    "geo.region": "MX-MEX",
    "geo.placename": "Bosque Real, Estado de México",
    "geo.position": "19.4316105;-99.2837492",
    "ICBM": "19.4316105, -99.2837492",
    "property:price": "19500000",
    "property:price:currency": "MXN",
    "property:type": "house",
    "property:bedrooms": "3",
    "property:bathrooms": "6",
    "property:area": "477",
    "property:area:units": "m2",
    "ai:enhanced": "true",
    "ai:description": "Desarrollado con inteligencia artificial para optimizar espacios, luz natural y experiencia de usuario",
  }
};

export default function CasaAmbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}