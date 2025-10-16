"use client";

import React from 'react';

interface PDFDownloadButtonProps {
  filename: string;
  buttonText?: string;
  className?: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  filename,
  buttonText = 'Descargar PDF',
  className = '',
}) => {
  const handleDownload = async () => {
    try {
      // Hacer la petición al API route
      const response = await fetch(`/api/Ambar/${filename}`);

      if (!response.ok) {
        throw new Error('Error al descargar el archivo');
      }

      // Convertir la respuesta a blob
      const blob = await response.blob();

      // Crear un URL temporal para el blob
      const url = window.URL.createObjectURL(blob);

      // Crear un elemento <a> temporal para iniciar la descarga
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Limpiar
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      alert('Error al descargar el archivo. Por favor, intenta nuevamente.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${className}`}
    >
      <svg
        className="mr-2 -ml-1 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {buttonText}
    </button>
  );
};

export default PDFDownloadButton;
