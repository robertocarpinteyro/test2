"use client";
import React, { useEffect, useState, Suspense, FC } from "react";
import imagePng from "@/images/hero-right-3.png";
import Image from "next/image";
import BgStatus from "@/components/BgStatus";
import HeroFilter from "@/components/HeroFilterNiddo";
import { useTranslation } from "@/hooks/useTranslation";
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
  const { t } = useTranslation();
  
  // Create translated slider data
  const getTranslatedSliderData = () => [
    {
      img: "/img/casaAmbar.jpg",
      title: t("hero.propertyTypes.houses"),
      description: t("hero.descriptions.houses"),
      entrega: "Septiembre 2025 + 6 meses de gracia.",
      precioMinimo: "$19,5 mpd",
      precioMaximo: "800",
      superficieMinima: "474 + terraza",
    },
    {
      img: "/img/skyview.jpg",
      title: t("hero.propertyTypes.apartments"),
      description: t("hero.descriptions.apartments"),
      entrega: "Marzo 2025 + 6 meses de gracia.",
      precioMinimo: "$7,980,000",
      precioMaximo: "800",
      superficieMinima: "114.65",
    },
    {
      img: "/img/torreDesigno.jpg",
      title: t("hero.propertyTypes.offices"),
      description: t("hero.descriptions.offices"),
      entrega: "",
      precioMinimo: "$5,178,218.34",
      precioMaximo: "800",
      superficieMinima: "52.946",
    },
    {
      img: "/img/Reserva.jpeg",
      title: t("hero.propertyTypes.lots"),
      description: t("hero.descriptions.lots"),
      entrega: "",
      precioMinimo: "$4,823,070",
      precioMaximo: "800",
      superficieMinima: "229.67",
    },
  ];
  
  const translatedSliderData = getTranslatedSliderData();
  const [data, setData] = useState<Data[]>(translatedSliderData.slice(1));
  const [transitionData, setTransitionData] = useState<Data>(translatedSliderData[0]);
  const [currentSlideData, setCurrentSlideData] = useState<CurrentSlideData>({
    data: translatedSliderData[0],
    index: 0,
  });
  
  // Update slider data when language changes
  useEffect(() => {
    const newSliderData = getTranslatedSliderData();
    setData(newSliderData.slice(1));
    setTransitionData(newSliderData[0]);
    setCurrentSlideData({
      data: newSliderData[0],
      index: 0,
    });
  }, [t]);
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
 
        </div>
      </div>
    </div>
  );
};

export default SectionHero2;

// Static data moved to component for translation support
