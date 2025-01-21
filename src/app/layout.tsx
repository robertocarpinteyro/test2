"use client"
import { MuseoModerno } from "next/font/google";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import MainNav2 from "./(client-components)/(Header)/MainNav2";
import { FloatingNav } from "@/app/(client-components)/floating-navbar";
import { usePathname } from "next/navigation";
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
    <html lang="en" className={museoModerno.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        {/* Mostrar FloatingNav solo en la raíz */}
        {pathname === "/" && <FloatingNav navItems={navItems} className="" />}
        {/* Mostrar MainNav2 en todas las demás rutas */}
        {pathname !== "/" && <MainNav2 />}
        {children}
        <FooterNav />
        <Footer />
      </body>
    </html>
  );
}