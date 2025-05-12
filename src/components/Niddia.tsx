"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface NiddiaProps {
  indexValue?: string;
  selectedOption?: string;
  iframeSrc?: string; // Nueva propiedad para el src del iframe
}

export function Niddia({ indexValue, selectedOption, iframeSrc }: NiddiaProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // URLs de los chatbots
  const chatbotURLs: Record<string, string> = {
    departamento: "https://interfaces.zapier.com/embed/chatbot/cma0a8w9k002rrdpoow6i6zqf",
    casa: "https://interfaces.zapier.com/embed/chatbot/casas",
    oficina: "https://interfaces.zapier.com/embed/chatbot/oficina",
    lotes: "https://interfaces.zapier.com/embed/chatbot/cma0cvuj7002ll4101gdi416d",
    niddia: "https://interfaces.zapier.com/embed/chatbot/niddia",
  };

  const sendDataToZapier = async () => {
    try {
      setIsLoading(true);
      setApiError(null);

      const payload = {
        option: selectedOption,
        instruction: indexValue,
      };

      console.log("Enviando datos a Zapier:", payload);

      const response = await fetch("/api/zapier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Error al enviar datos a Zapier");
      }

      console.log("Datos enviados correctamente:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error en sendDataToZapier:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error desconocido al conectar con Zapier";
      setApiError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedOption && indexValue) {
      sendDataToZapier().catch(() => {
        // El error ya se maneja dentro de sendDataToZapier
      });
    }
  }, [selectedOption, indexValue]);

  const buildZapierEmbedHTML = () => {
    // Determinar la URL del iframe
    const iframeURL =
      iframeSrc || // Usar el iframeSrc si se proporciona
      chatbotURLs[indexValue || ""] || // Usar la URL basada en indexValue
      "https://interfaces.zapier.com/embed/chatbot/default"; // URL predeterminada

    return `
      <iframe
        src="${iframeURL}?option=${encodeURIComponent(
          selectedOption || ""
        )}&indexValue=${encodeURIComponent(indexValue || "")}"
        height="600px"
        width="100%"
        allow="clipboard-write *"
        style="border: none;">
      </iframe>
    `;
  };

  return (
    <main className="container mx-auto p-4">
     {/* {apiError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {apiError}
        </div>
      )}*/}

      <div
        className="w-full mb-4"
        dangerouslySetInnerHTML={{ __html: buildZapierEmbedHTML() }}
      />
    </main>
  );
}