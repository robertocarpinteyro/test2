"use client";

import React, { useEffect, useState } from "react";

interface NiddiaProps {
  indexValue?: string; // Prop opcional
}

export function Niddia({ indexValue }: NiddiaProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Función para cargar el script solo si no existe
    const loadMindStudioScript = () => {
      const existingScript = document.querySelector(
        "script[src='https://api.mindstudio.ai/v1/embed.js']"
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://api.mindstudio.ai/v1/embed.js";
        script.async = true;
        script.onload = () => {
          console.log("MindStudio script loaded successfully");
          setScriptLoaded(true); // Marcar como cargado
        };
        script.onerror = () => console.error("Error loading MindStudio script");
        document.body.appendChild(script);
      } else {
        console.log("MindStudio script already loaded");
        setScriptLoaded(true); // Si ya existe, marcar como cargado
      }
    };

    // Configurar MindStudioSettings
    const setupMindStudioSettings = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const selectedOption = urlParams.get("option") || "niddia";

      console.log("optionVariable", selectedOption);

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
    };

    if (typeof window !== "undefined") {
      setupMindStudioSettings(); // Configurar las variables
      loadMindStudioScript(); // Cargar el script
    }

    return () => {
      console.log("Cleaning up Niddia component");
    };
  }, [indexValue]);

  return (
    <main>
      {scriptLoaded ? (
        <iframe
          id="mindstudio-frame"
          title="Niddia"
          style={{
            width: "100%",
            height: "65vh",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "gray",
          }}
          referrerPolicy="origin"
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
