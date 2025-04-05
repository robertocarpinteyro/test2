"use client";
import React, { useEffect, useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Cookies from "js-cookie";

interface NiddiaProps {
  indexValue?: string;
  selectedOption?: string;
}

export function Niddia({ indexValue, selectedOption }: NiddiaProps) {
  const [isVerified, setIsVerified] = useState(true); // Forzar a true para omitir la verificación
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    verificationCode: "",
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const sendDataToZapier = async () => {
    const payload = {
      option: selectedOption,
      instruction: indexValue,
    };

    try {
      const response = await fetch(
        "https://hooks.zapier.com/hooks/catch/18336954/2cpgn6q/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log("Zapier Response:", result);
    } catch (error) {
      console.error("Error sending data to Zapier:", error);
    }
  };
  useEffect(() => {
    // Omitimos la lógica de cookies para forzar la verificación
    sendDataToZapier();
    setIsVerified(true);
  }, []);

  const buildZapierEmbedHTML = () => {
    const launchData = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      option: selectedOption,
      instruction: indexValue,
    };

    return `
      <script async type="module" src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"></script>
      <zapier-interfaces-chatbot-embed
        is-popup="false"
        chatbot-id="cm9328l30001l8zr1yy53l3c3"
        height="600px"
        width="100%"
        user-inputs='${JSON.stringify(launchData)}'>
      </zapier-interfaces-chatbot-embed>
    `;
  };

  if (!isVerified) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Habla con Niddia, tu asistente inmobiliario. Verifica tu número y
          empieza ahora.
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
                onClick={() => {}}
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
    </main>
  );
}
