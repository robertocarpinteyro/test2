"use client";

import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import MainNav2 from "@/app/(client-components)/(Header)/MainNav2";
import { FloatingNav } from "@/app/(client-components)/floating-navbar";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

// navItems moved to component for translation support

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useTranslation();
  
  const navItems: { name: string; link: string }[] = [
    { name: t("navigation.home"), link: "/" },
    { name: t("navigation.about"), link: "/#acercade" },
    { name: t("navigation.developments"), link: "/#desarrollos" },
  ];

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