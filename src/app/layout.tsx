"use client"
import { MuseoModerno } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import MainNav2 from "./(client-components)/(Header)/MainNav2";
import { FloatingNav } from "@/app/(client-components)/floating-navbar";
import { usePathname } from "next/navigation";
import type { Metadata } from "next";

// Global Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://nidda.mx'),
  title: {
    default: 'NIDDA | Inmobiliaria de Lujo con IA en Estado de México | Bosque Real',
    template: '%s | NIDDA Inmobiliaria'
  },
  description: 'NIDDA es la inmobiliaria líder en propiedades de lujo en Estado de México. Especialistas en Bosque Real con tecnología de inteligencia artificial. Encuentra tu hogar exclusivo con asesoría personalizada.',
  keywords: [
    'NIDDA inmobiliaria',
    'inmobiliaria Estado de México',
    'propiedades lujo Bosque Real',
    'Casas en venta Bosque Real',
    'Departamentos en Bosque Real',
    'Inmuebles exclusivos en Bosque Real',
    'Vivir en Bosque Real',
    'bienes raíces inteligencia artificial',
    'casas venta Estado México',
    'inmuebles exclusivos',
    'asesoría inmobiliaria IA',
    'desarrollos residenciales lujo',
    'inversión inmobiliaria México',
    'fraccionamientos exclusivos',
    'residencias premium',
    'tecnología inmobiliaria',
    'venta casas lujo',
    'inmobiliaria innovadora',
    'bienes raíces Bosque Real',
    'comprar casa Bosque Real',
    'propiedades exclusivas Estado México',
    'residencias de lujo Bosque Real'
  ].join(', '),
  authors: [{ name: 'NIDDA Inmobiliaria' }],
  creator: 'NIDDA Inmobiliaria',
  publisher: 'NIDDA Inmobiliaria',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://nidda.mx',
    siteName: 'NIDDA Inmobiliaria',
    title: 'NIDDA | Inmobiliaria de Lujo con IA en Estado de México',
    description: 'Líder en propiedades de lujo en Bosque Real, Estado de México. Tecnología de inteligencia artificial para encontrar tu hogar perfecto.',
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
    title: 'NIDDA | Inmobiliaria de Lujo con IA',
    description: 'Propiedades exclusivas en Bosque Real, Estado de México con tecnología de inteligencia artificial.',
    images: ['/twitter-image.jpg'],
    creator: '@niddainmobiliaria',
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
const navItems :  { name: string; link: string }[] = [
  { name: "Inicio", link: "/" },
  { name: "Acerca de", link: "/#acercade" },
  { name: "Desarrollos", link: "/#desarrollos" },
];

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const pathname = usePathname();

  return (
    <html lang="es-MX" className={museoModerno.className}>
      <body
        key={pathname}  // Clave para forzar el re-render
        className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200"
      >
        {/* Mostrar FloatingNav solo en la raíz */}
        {pathname === "/" && <FloatingNav navItems={navItems} className="" />}
        {/* Mostrar MainNav2 en todas las demás rutas */}
        {pathname !== "/" && <MainNav2 />}
        
        {/* Contenedor con key para forzar remount */}
        <div> {children}</div>

        <FooterNav />
        <Footer />
      </body>
    </html>
  );
}