"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NiddiaStandAlone = () => {
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
      <iframe
        src="https://interfaces.zapier.com/embed/chatbot/cmal5v08b000g14ot6zd7c4qq"
        width="100%"
        style={{ height: "100%", minHeight: "700px" }}
        frameBorder="0"
        allow="clipboard-write *"
      ></iframe>
    </div>
  );
};

export default NiddiaStandAlone;