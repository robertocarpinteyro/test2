"use client";

import React, { FC, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Cambia a "next/navigation"
import { Niddia } from "@/components/Niddia";
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
        <Niddia indexValue="departamento" selectedOption="blue" iframeSrc="https://interfaces.zapier.com/embed/chatbot/cmal5v08b000g14ot6zd7c4qq"/>
    </div>
    </div>
  );
};

export default NiddiaStandAlone;