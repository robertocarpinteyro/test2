"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { Niddia } from "@/components/Niddia";

export interface PageAboutProps {}

const NiddiaStandAlone: FC<PageAboutProps> = ({}) => {
  const [key, setKey] = useState(0);

  const handleReload = () => {
    setKey((prevKey) => prevKey + 1); // Cambia la clave para forzar un remount
  };

  return (
    <div>
      <div className="bg-black flex justify-center items-center h-20 w-full">
        <Image
          src="https://res.cloudinary.com/dwrtldhxd/image/upload/v1734387936/niddiaLogo_t9hkkp.png"
          alt="Separador"
          width={64} // Ajusta el ancho de la imagen
          height={64} // Ajusta la altura de la imagen
          className="filter invert contrast-200 brightness-200"
        />
      </div>
      <div key={key}>
        <Niddia indexValue="Niddia" />
      </div>
    </div>
  );
};

export default NiddiaStandAlone;
