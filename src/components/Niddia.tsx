"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface NiddiaProps {
  indexValue?: string;
  selectedOption?: string;
}

export function Niddia({ indexValue, selectedOption }: NiddiaProps) {
  const [userData, setUserData] = useState({
    name: "Usuario de prueba", // Datos de prueba
    email: "usuario@ejemplo.com",
    phone: "+521234567890",
    verificationCode: "",
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [timer, setTimer] = useState(30);

  const sendDataToZapier = async () => {
    const payload = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      option: selectedOption,
      instruction: indexValue,
    };

    console.log("Payload enviado  Zapaier:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(
        "https://hooks.zapier.com/hooks/catch/18336954/209pql9/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al enviar los datos a Zapier:", errorText);
        throw new Error(
          `Error al enviar los datos: ${response.status} ${response.statusText}`
        );
      }

      const responseData = await response.json();
      console.log("Respuesta de Zapier:", responseData);
    } catch (error) {
      console.error("Error enviando datos a Zapier:", error);
    }
  };

  useEffect(() => {
    // Manejo del temporizador para la verificación
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

  useEffect(() => {
    // Enviar datos a Zapier solo si el usuario está verificado

    sendDataToZapier();
    console.log("Llamando a sendDataToZapier...");
  }, [isVerified, selectedOption, indexValue]);

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

        if (!/^\+?[1-9]\d{1,14}$/.test(userData.phone)) {
          alert("Número de teléfono inválido");
          setIsLoading(false);
          return;
        }

        const response = await fetch("/api/send-verification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: userData.phone }),
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(errorDetails.message || "Error enviando código");
        }

        setVerificationSent(true);
        setTimer(30);
      } else {
        const response = await fetch("/api/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: userData.phone,
            code: userData.verificationCode,
          }),
        });

        const result = await response.json();
        if (!result.verified) throw new Error("Código inválido");

        setIsVerified(true);
      }
    } catch (error: any) {
      alert(error.message || "Error en la verificación");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
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
      alert(error.message || "Error reenviando código");
    } finally {
      setIsLoading(false);
    }
  };

  const buildZapierEmbedHTML = () => {
    const iframeURL = `https://interfaces.zapier.com/embed/chatbot/cm9328l30001l8zr1yy53l3c3?option=${encodeURIComponent(
      selectedOption || ""
    )}&indexValue=${encodeURIComponent(indexValue || "")}`;

    console.log("Iframe URL:", iframeURL);

    return `
      <iframe
        src="${iframeURL}"
        height="600px"
        width="800px"
        allow="clipboard-write *"
        style="border: none;">
      </iframe>
    `;
  };

  if (!isVerified) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Habla con Niddia, tu asistente inmobiliario. Verifica tu número y
          empieza ahora.
        </h2>
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
    <main>
      <div
        className="w-full"
        dangerouslySetInnerHTML={{ __html: buildZapierEmbedHTML() }}
      />
      <button onClick={sendDataToZapier}>Enviar Datos a Zapier</button>
    </main>
  );
}
