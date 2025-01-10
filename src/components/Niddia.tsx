"use client";
import React, { useEffect, useState, Suspense } from "react";


interface NiddiaProps {
  indexValue?: string; // Prop opcional
}

export function Niddia({ indexValue }: NiddiaProps) {
  console.log("Index", indexValue);
  useEffect(() => {
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

      // Configurar MindStudioSettings con el valor capturado
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

      // Insertar el script del embeding
      const script = document.createElement("script");
      script.src = "https://api.mindstudio.ai/v1/embed.js";
      script.async = false;
      document.body.appendChild(script);

      // Limpieza del script al desmontar el componente
      return () => {
        document.body.removeChild(script);
      };
    
  }, []); // No necesita dependencia, ya que `window.location` es global

 

  return (
    <main>
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
    </main>
  );
}
