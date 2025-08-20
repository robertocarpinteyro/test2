import { MuseoModerno } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";
import MetaPixel from '@/components/MetaPixel'
// Global Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://niddo.ai'),
  title: {
    default: 'NIDDO | Encuentra tu hogar ideal en bosque real | NIDDIA Asistente Virtual',
    template: '%s | NIDDO Bosque Real'
  },
  description: 'NIDDO es el broker inmobiliario líder especializado en propiedades de lujo en Bosque Real, Estado de México. Con NIDDIA, nuestra asistente virtual con inteligencia artificial, encuentra tu hogar exclusivo en Bosque Real con asesoría personalizada.',
  keywords: [
    'NIDDO broker inmobiliario',
    'NIDDO Bosque Real',
    'NIDDIA asistente virtual inmobiliaria',
    'broker Bosque Real',
    'propiedades lujo Bosque Real',
    'Casas en venta Bosque Real',
    'Departamentos en Bosque Real',
    'Inmuebles exclusivos en Bosque Real',
    'Vivir en Bosque Real',
    'bienes raíces Bosque Real',
    'fraccionamientos Bosque Real',
    'residencias Bosque Real',
    'comprar casa Bosque Real',
    'inversión Bosque Real',
    'desarrollos Bosque Real',
    'inteligencia artificial inmobiliaria',
    'asistente virtual propiedades',
    'broker Estado de México',
    'inmuebles exclusivos Estado México',
    'asesoría inmobiliaria IA',
    'tecnología inmobiliaria',
    'venta casas lujo Bosque Real',
    'Comprar en bosque real',
    'propiedades premium Bosque Real',
    'NIDDO.ai',
    'Sky View Bosque Real',
    'Reserva Bosque Real',
    'fraccionamiento Ambar Bosque Real'
  ].join(', '),
  authors: [{ name: 'NIDDO Broker Inmobiliario' }],
  creator: 'NIDDO',
  publisher: 'NIDDO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://niddo.ai',
    siteName: 'NIDDO Broker Inmobiliario',
    title: 'NIDDO | Broker Especialista en Bosque Real con NIDDIA IA',
    description: 'Líder broker inmobiliario especializado en Bosque Real, Estado de México. Con NIDDIA, asistente virtual IA, encuentra tu propiedad exclusiva en Bosque Real.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NIDDA Inmobiliaria - Propiedades de Lujo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NIDDO | Broker Bosque Real con NIDDIA IA',
    description: 'Broker especialista en propiedades exclusivas de Bosque Real, Estado de México. NIDDIA asistente virtual con inteligencia artificial.',
    images: ['/twitter-image.jpg'],
    creator: '@niddo.ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-codigo-google-site-verification',
    yandex: 'tu-codigo-yandex',
    yahoo: 'tu-codigo-yahoo',
  },
};
const museoModerno = MuseoModerno({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={museoModerno.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
           
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}