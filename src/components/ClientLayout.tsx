"use client";

import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import MainNav2 from "@/app/(client-components)/(Header)/MainNav2";
import { FloatingNav } from "@/app/(client-components)/floating-navbar";
import { usePathname } from "next/navigation";

const navItems: { name: string; link: string }[] = [
  { name: "Inicio", link: "/" },
  { name: "Acerca de", link: "/#acercade" },
  { name: "Desarrollos", link: "/#desarrollos" },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mostrar FloatingNav solo en la raíz */}
      {pathname === "/" && <FloatingNav navItems={navItems} className="" />}
      {/* Mostrar MainNav2 en todas las demás rutas */}
      {pathname !== "/" && <MainNav2 />}
      
      {/* Contenedor con key para forzar remount */}
      <div>{children}</div>

      <FooterNav />
      <Footer />
    </>
  );
}