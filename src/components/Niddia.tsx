"use client";
import React, { useEffect } from "react";

interface NiddiaProps {
  indexValue?: string; // Prop opcional
}

export function Niddia({ indexValue }: NiddiaProps) {
  useEffect(() => {
    // Configurar las opciones de MindStudio
    const urlParams = new URLSearchParams(window.location.search);
    const selectedOption = urlParams.get("option") || "niddia"; // Valor predeterminado

    (window as any).MindStudioSettings = {
      publicToken: "pkd281a1076c773e9bd767063d6d923a5d",
      appId: "52b9bb60-13d4-45f2-93a0-bedc2ec9f07e",
      targetId: "mindstudio-frame",
      debugging: false, // Cambiado a false para producción
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

    // Cargar el script de MindStudio
    const script = document.createElement("script");
    script.src = "https://api.mindstudio.ai/v1/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Limpieza al desmontar
    return () => {
      document.body.removeChild(script);
    };
  }, [indexValue]); // indexValue como dependencia

  return (
    <main>
      <iframe
        id="mindstudio-frame"
        className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800"
        style={{
          width: "100%",
          height: "65vh",
          border: "none",
          borderRadius: "8px",
        }}
        title="Niddia"
        referrerPolicy="origin"
        frameBorder="0"
      ></iframe>
    </main>
  );
}
