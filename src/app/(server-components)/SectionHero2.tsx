"use client";
import React, { useEffect, useState, Suspense, FC } from "react";
import imagePng from "@/images/hero-right-3.png";
import Image from "next/image";
import BgStatus from "@/components/BgStatus";
import HeroFilter from "@/components/HeroFilterNiddo";
export interface SectionHero2Props {
  className?: string;
  children?: React.ReactNode;
}

export type Data = {
  img: string;
  title: string;
  description: string;
  entrega: string;
  precioMinimo: string;
  precioMaximo: string;
  superficieMinima: string;
};

export type CurrentSlideData = {
  data: Data;
  index: number;
};

const SectionHero2: FC<SectionHero2Props> = ({ className = "", children }) => {
  const [data, setData] = useState<Data[]>(sliderData.slice(1));
  const [transitionData, setTransitionData] = useState<Data>(sliderData[0]);
  const [currentSlideData, setCurrentSlideData] = useState<CurrentSlideData>({
    data: initData,
    index: 0,
  });
  return (
    
    <div id="inicio" className={`nc-SectionHero2 relative ${className}`}>
      <div className="absolute inset-y-0 w-5/6 xl:w-3/4 right-0 flex-grow">
        <BgStatus
          transitionData={transitionData}
          currentSlideData={currentSlideData}
        />
      </div>
      <div className="relative py-14 lg:py-20">
        <div className="relative inline-flex">
          {/* <div className="w-screen right-20 md:right-52 inset-y-0 absolute bg-primary-500 "></div> */}
          <div className="relative max-w-3xl inline-flex flex-shrink-0 flex-col items-start py-16 sm:py-20 lg:py-24 space-y-8 sm:space-y-10 text-black">
            {children ? (
              children
            ) : (
              <div className="relative bg-primary-500 w-full max-w-48 sm:max-w-sm md:max-w-md p-4 sm:p-6 lg:p-8 rounded-lg">
                <h2 className="text-black font-semibold text-center text-sm sm:text-lg md:text-xl lg:text-2xl leading-snug">
                  <span className="block sm:inline">{currentSlideData.data.description} </span>
   
                </h2>
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:block lg:mt-20 w-full">
          <HeroFilter
            currentSlideData={currentSlideData}
            data={data}
            transitionData={transitionData}
            handleTransitionData={setTransitionData}
            handleCurrentSlideData={setCurrentSlideData}
            sliderData={sliderData}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHero2;

const sliderData = [
  {
    img: "/img/casaAmbar.jpg",
    title: "Casas",
    description:
      "¿Sueñas con tu hogar ideal? Nosotros lo encontramos",
    entrega: "Septiembre 2025 + 6 meses de gracia.",
    precioMinimo: "$19,5 mpd",
    precioMaximo: "800",
    superficieMinima: "420",
  },
  {
    img: "/img/skyview.jpg",
    title: "Departamentos",
    description:
      "¿Sueñas con tu hogar ideal? Nosotros lo encontramos",
    entrega: "Marzo 2025 + 6 meses de gracia.",
    precioMinimo: "$7,980,000",
    precioMaximo: "800",
    superficieMinima: "114.65",
  },
  {
    img: "/img/torreDesigno.jpg",
    title: "Oficinas",
    description:
      "Descubre nuestras oficinas en Bosque Real, un espacio ideal para el crecimiento de tu empresa.",
    entrega: "",
    precioMinimo: "$5,178,218.34",
    precioMaximo: "800",
    superficieMinima: "52.946",
  },
  {
    img: "/img/Reserva.jpeg",
    title: "Lotes",
    description:
      "En Niddo, te ofrecemos la oportunidad de construir la casa de tus sueños.",
    entrega: "",
    precioMinimo: "$4,823,070",
    precioMaximo: "800",
    superficieMinima: "229.67",
  },
  
];

const initData = sliderData[0];
