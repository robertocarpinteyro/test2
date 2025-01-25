"use client";
import React, { useEffect, useState, useRef } from "react";

interface NiddiaProps {
  indexValue?: string; // Prop opcional
  selectedOption?: string;
}

export function Niddia({ indexValue, selectedOption }: NiddiaProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Limpieza de cookies y almacenamiento
    /*
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
    */

    localStorage.clear();
    sessionStorage.clear();


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

    // Agregar script solo si no existe previamente
    if (
      !document.querySelector(
        "script[src='https://api.mindstudio.ai/v1/embed.js']"
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://api.mindstudio.ai/v1/embed.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => console.error("Error loading MindStudio script");
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }

    return () => {
      console.log("Cleaning up Niddia component");
      // Remover script si es necesario
      const existingScript = document.querySelector(
        "script[src='https://api.mindstudio.ai/v1/embed.js']"
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [indexValue]);

  return (
    <main>
      <iframe
        className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800"
        id="mindstudio-frame"
        ref={iframeRef}
        referrerPolicy="origin"
        style={{
          width: "100%",
          height: "85vh",
          border: "none",
          borderRadius: "8px",
          outline: "none",
          backgroundColor: "gray",
        }}
        title="Niddia"
        frameBorder="0"
      ></iframe>

      {!scriptLoaded && (
        <div className="flex items-center justify-center h-65vh">
          <p>Loading...</p>
        </div>
      )}
    </main>
  );
}
