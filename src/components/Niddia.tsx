"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Cookies from "js-cookie";
interface NiddiaProps {
  indexValue?: string;
  selectedOption?: string;
}

export function Niddia({ indexValue, selectedOption }: NiddiaProps) {
  const [userData, setUserData] = useState({
    name: "Usuario de prueba",
    email: "usuario@ejemplo.com",
    phone: "+521234567890",
    verificationCode: "",
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(30);
  const [apiError, setApiError] = useState<string | null>(null);

  const sendDataToZapier = async () => {
    try {
      setIsLoading(true);
      setApiError(null);
      
      const payload = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        option: selectedOption,
        instruction: indexValue,
      };

      console.log("Enviando datos a Zapier:", payload);

      const response = await fetch('/api/zapier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Error al enviar datos a Zapier');
      }

      console.log("Datos enviados correctamente:", result.data);
      return result.data;
      
    } catch (error) {
      console.error("Error en sendDataToZapier:", error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al conectar con Zapier';
      setApiError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isVerified && selectedOption && indexValue) {
      sendDataToZapier().catch(() => {
        // El error ya se maneja dentro de sendDataToZapier
      });
    }
  }, [isVerified, selectedOption, indexValue]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (verificationSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && interval) {
      clearInterval(interval);
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
          throw new Error(
            errorDetails.message || "Error enviando código de verificación"
          );
        }
        setVerificationSent(true);
        setTimer(60); // Reset timer when code is sent
      } else {
        let formattedPhone = userData.phone;
        if (!formattedPhone.startsWith("+")) {
          formattedPhone = "+" + formattedPhone;
        }

        const response = await fetch("/api/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: formattedPhone,
            code: userData.verificationCode,
          }),
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(errorDetails.message || "Código inválido");
        }

        const result = await response.json();
        if (!result.verified) {
          throw new Error("Código inválido");
        }

        // Marcar al usuario como verificado en las cookies
        Cookies.set("isVerified", "true", { expires: 1 }); // La cookie expira en 7 días
        Cookies.set("userName", userData.name, { expires: 7 });
        Cookies.set("userEmail", userData.email, { expires: 7 });
        Cookies.set("userPhone", userData.phone, { expires: 7 });
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
    setApiError(null);
    
    try {
      const response = await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: userData.phone }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Error reenviando código");
      }

      setTimer(30);
    } catch (error: any) {
      console.error("Error al reenviar código:", error);
      setApiError(error.message || "Error al reenviar código");
    } finally {
      setIsLoading(false);
    }
  };

  const buildZapierEmbedHTML = () => {
    const iframeURL = `https://interfaces.zapier.com/embed/chatbot/cm9328l30001l8zr1yy53l3c3?option=${encodeURIComponent(
      selectedOption || ""
    )}&indexValue=${encodeURIComponent(indexValue || "")}`;

    return `
      <iframe
        src="${iframeURL}"
        height="600px"
        width="100%"
        allow="clipboard-write *"
        style="border: none;">
      </iframe>
    `;
  };

  if (!isVerified) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Habla con Niddia, tu asistente inmobiliario. Verifica tu número y empieza ahora.
        </h2>
        
        {apiError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {apiError}
          </div>
        )}

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
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-2 border rounded"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">Teléfono</label>
                <PhoneInput
                  country={"mx"}
                  value={userData.phone}
                  onChange={(phone) =>
                    setUserData({ ...userData, phone: phone })
                  }
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
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    verificationCode: e.target.value,
                  })
                }
                placeholder="Ingresa el código SMS"
              />
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isLoading || timer > 0}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 mt-4"
              >
                {timer > 0 ? `Reenviar código en ${timer}s` : "Reenviar Código"}
              </button>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading
              ? "Procesando..."
              : verificationSent
              ? "Verificar Código"
              : "Enviar Código de Verificación"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4">
      {apiError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {apiError}
        </div>
      )}
      
      <div
        className="w-full mb-4"
        dangerouslySetInnerHTML={{ __html: buildZapierEmbedHTML() }}
      />
      
  
    </main>
  );
}