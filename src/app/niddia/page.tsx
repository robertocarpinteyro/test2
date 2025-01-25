"use client";

import React, { FC, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Cambia a "next/navigation"
import { Niddia } from "@/components/Niddia";

export interface PageAboutProps {}

const NiddiaStandAlone: FC<PageAboutProps> = ({}) => {
  const router = useRouter();

  useEffect(() => {
    // Forzar la recarga de la página
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      router.refresh(); // Forzar recarga en sistemas de app directory
    }
  }, [router]);

  return (
    <div>
      <div className="bg-black flex justify-center items-center h-20 w-full">
        <Image
          src="https://res.cloudinary.com/dwrtldhxd/image/upload/v1734387936/niddiaLogo_t9hkkp.png"
          alt="Separador"
          width={64}
          height={64}
          className="filter invert contrast-200 brightness-200"
        />
      </div>
      <Niddia indexValue="Niddia" selectedOption="niddia"/>
    </div>
  );
};

export default NiddiaStandAlone;
