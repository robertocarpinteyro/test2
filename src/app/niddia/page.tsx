"use client";

import React, { FC, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NiddiaStandAloneProps {
  iframeSrc?: string; // Prop para recibir el src del iframe
  indexValue?: string;
  selectedOption?: string;
}

const NiddiaStandAlone: FC<NiddiaStandAloneProps> = ({
  iframeSrc,
  indexValue,
  selectedOption,
}) => {
  const router = useRouter();

  useEffect(() => {
    // Forzar la recarga de la página
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      router.refresh(); // Forzar recarga en sistemas de app directory
    }
  }, [router]);

  const chatbotURLs: Record<string, string> = {
    departamento: "https://interfaces.zapier.com/embed/chatbot/cma0a8w9k002rrdpoow6i6zqf",
    casa: "https://interfaces.zapier.com/embed/chatbot/casas",
    oficina: "https://interfaces.zapier.com/embed/chatbot/oficina",
    lotes: "https://interfaces.zapier.com/embed/chatbot/cma0cvuj7002ll4101gdi416d",
    niddia: "https://interfaces.zapier.com/embed/chatbot/niddia",
  };

  const buildIframeURL = () => {
    // Determinar la URL del iframe
    return (
      iframeSrc || // Usar el iframeSrc si se proporciona
      chatbotURLs[indexValue || ""] || // Usar la URL basada en indexValue
      "https://interfaces.zapier.com/embed/chatbot/default" // URL predeterminada
    );
  };

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