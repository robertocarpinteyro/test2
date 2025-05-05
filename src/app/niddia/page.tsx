"use client";

import React, { FC, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Cambia a "next/navigation"

export interface PageAboutProps {}
const chatbotURLs: Record<string, string> = {
  departamento: "https://interfaces.zapier.com/embed/chatbot/cma0a8w9k002rrdpoow6i6zqf",
  casa:"https://interfaces.zapier.com/embed/chatbot/casas",
  oficina: "https://interfaces.zapier.com/embed/chatbot/oficina",
  lotes: "https://interfaces.zapier.com/embed/chatbot/cma0cvuj7002ll4101gdi416d",
  niddia: "https://interfaces.zapier.com/embed/chatbot/niddia",
};
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
  const buildZapierEmbedHTML = () => {
    // Determinar la URL del chatbot en función de instruction
    const iframeURL =
      "https://interfaces.zapier.com/embed/chatbot/default";

    return `
      <iframe
        src="${iframeURL}
        height="600px"
        width="100%"
        allow="clipboard-write *"
        style="border: none;">
      </iframe>
    `;
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
        src="https://embed.mightychat.ai/chatbot/67db631d-46ca-4d21-a9d1-e3cb466d6865?poweredBy=true"
        width="100%"
        style={{ height: "100%", minHeight: "700px" }}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default NiddiaStandAlone;