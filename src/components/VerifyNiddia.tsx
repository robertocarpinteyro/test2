"use client";
import React, { useEffect, useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "@/hooks/useTranslation";

interface NiddiaProps {
  indexValue?: string;
  selectedOption?: string;
}

export function Niddia({ indexValue, selectedOption }: NiddiaProps) {
  const { t } = useTranslation();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    verificationCode: "",
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (isVerified) {
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

      const loadScript = () => {
        if (!document.querySelector("script[src='https://api.mindstudio.ai/v1/embed.js']")) {
          const script = document.createElement("script");
          script.src = "https://api.mindstudio.ai/v1/embed.js";
          script.async = true;
          script.onload = () => setScriptLoaded(true);
          script.onerror = () => console.error("Error loading MindStudio script");
          document.body.appendChild(script);
        } else {
          setScriptLoaded(true);
        }
      };

      loadScript();
    }
  }, [isVerified, indexValue, selectedOption]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (verificationSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval!);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [verificationSent, timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!verificationSent) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
          alert("Por favor ingresa un email válido");
          setIsLoading(false);
          return;
        }

        let formattedPhone = userData.phone;
        if (!formattedPhone.startsWith("+")) {
          formattedPhone = "+" + formattedPhone;
        }

        if (!/^\+?[1-9]\d{1,14}$/.test(formattedPhone)) {
          alert("Número de teléfono inválido");
          setIsLoading(false);
          return;
        }

        const response = await fetch("/api/send-verification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: formattedPhone }),
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(errorDetails.message || t("validation.sendingCodeError"));
        }
        setVerificationSent(true);
        setTimer(30); // Reset timer when code is sent
      } else {
        let formattedPhone = userData.phone;
        if (!formattedPhone.startsWith("+")) {
          formattedPhone = "+" + formattedPhone;
        }

        const response = await fetch("/api/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: formattedPhone, code: userData.verificationCode }),
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(errorDetails.message || "Código inválido");
        }

        const result = await response.json();
        if (!result.verified) {
          throw new Error("Código inválido");
        }

        setIsVerified(true);
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error en la verificación");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      let formattedPhone = userData.phone;
      if (!formattedPhone.startsWith("+")) {
        formattedPhone = "+" + formattedPhone;
      }

      const response = await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formattedPhone }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || t("validation.sendingCodeError"));
      }
      setTimer(30); // Reset timer when code is resent
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error enviando código de verificación");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVerified) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Habla con Niddia, tu asistente inmobiliario. Verifica tu número y empieza ahora.</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!verificationSent ? (
            <>
              <div>
                <label className="block mb-2">Nombre completo</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-2 border rounded"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-2">Teléfono</label>
                <PhoneInput
                  country={"us"}
                  value={userData.phone}
                  onChange={(phone) => setUserData({ ...userData, phone })}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                    className: "w-full p-2 border rounded",
                  }}
                  containerStyle={{ width: "100%" }}
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block mb-2">Código de verificación</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded"
                value={userData.verificationCode}
                onChange={(e) => setUserData({ ...userData, verificationCode: e.target.value })}
                placeholder={t("niddia.enterSMSCode")}
              />
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isLoading || timer > 0}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 mt-4"
              >
                {timer > 0 ? `${t("niddia.resendIn")} ${timer}s` : t("niddia.resendCode")}
              </button>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? t("niddia.processing") : verificationSent ? t("niddia.verifyCode") : t("niddia.sendCode")}
          </button>
        </form>
      </div>
    );
  }

  return (
    <main>
      <iframe
        className="h-full w-full rounded-lg bg-gray-100"
        id="mindstudio-frame"
        ref={iframeRef}
        style={{ width: "100%", height: "70vh", border: "none", borderRadius: "8px" }}
        title="Niddia"
      ></iframe>
      {!scriptLoaded && <p className="text-gray-500">{t("niddia.loadingMindStudio")}</p>}
    </main>
  );
}