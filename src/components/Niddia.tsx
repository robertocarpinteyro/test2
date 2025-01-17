"use client";

import React, { useEffect, useState } from "react";

interface NiddiaProps {
  indexValue?: string; // Prop opcional
}

export function Niddia({ indexValue }: NiddiaProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Evitar que el script se cargue varias veces
    const existingScript = document.querySelector("script[src='https://api.mindstudio.ai/v1/embed.js']");

    if (!existingScript) {
      // Insertar el script si no existe
      const script = document.createElement("script");
      script.src = "https://api.mindstudio.ai/v1/embed.js";
      script.async = false;
      script.onload = () => setScriptLoaded(true); // Marcar como cargado
      script.onerror = () => console.error("Error loading MindStudio script");
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else {
      // Si el script ya está cargado, configurar directamente el estado
      setScriptLoaded(true);
    }

    // Configurar MindStudioSettings solo si `window` está disponible
    if (typeof window !== "undefined") {
      // Limpiar cookies relacionadas
      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });

      // Limpieza de localStorage y sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      // Capturar query string desde el cliente
      const urlParams = new URLSearchParams(window.location.search);
      const selectedOption = urlParams.get("option") || "niddia"; // Valor predeterminado

      console.log("optionVariable", selectedOption);

      // Configurar MindStudioSettings
      (window as any).MindStudioSettings = {
        publicToken: "pkd281a1076c773e9bd767063d6d923a5d",
        appId: "52b9bb60-13d4-45f2-93a0-bedc2ec9f07e",
        targetId: "mindstudio-frame",
        debugging: true,
        options: {
          autoFocus: true,
          disableThreads: true,
          minimizeThreadPanel: true,
          launchVariables: {
            option: selectedOption,
            instruction: indexValue,
          },
        },
      };
    }
  }, [indexValue]);

  return (
    <main>
      {scriptLoaded ? (
        <iframe
          className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800"
          id="mindstudio-frame"
          referrerPolicy="origin"
          style={{
            width: "100%",
            height: "65vh",
            border: "none",
            borderRadius: "8px",
            outline: "none",
            backgroundColor: "gray",
          }}
          title="Niddia"
          frameBorder="0"
        ></iframe>
      ) : (
        <div className="flex items-center justify-center h-65vh">
          <p>Loading...</p>
        </div>
      )}
    </main>
  );
}
