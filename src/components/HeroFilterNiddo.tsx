"use client";
import React, { FC } from "react";
import { Data, CurrentSlideData } from "@/app/(server-components)/SectionHero2";
import { useTranslation } from "@/hooks/useTranslation";

export interface HeroFilterNiddoProps {
  currentSlideData: CurrentSlideData;
  data: Data[];
  transitionData: Data;
  handleTransitionData: (data: Data) => void;
  handleCurrentSlideData: (data: CurrentSlideData) => void;
  sliderData: Data[];
}

const HeroFilterNiddo: FC<HeroFilterNiddoProps> = ({
  currentSlideData,
  data,
  transitionData,
  handleTransitionData,
  handleCurrentSlideData,
  sliderData,
}) => {
  const { t } = useTranslation();
  
  const handleSlideChange = (newData: Data, index: number) => {
    handleTransitionData(newData);
    handleCurrentSlideData({ data: newData, index });
  };

  return (
    <div className="nc-HeroFilterNiddo">
      <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
        {sliderData.map((slide, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(slide, index)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              currentSlideData.index === index
                ? "bg-primary-500 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {slide.title}
          </button>
        ))}
      </div>
      
      {/* Property Details Display */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-1">{t("hero.propertyDetails.priceFrom")}</h4>
            <p className="text-lg font-bold text-emerald-600">{currentSlideData.data.precioMinimo}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-1">{t("hero.propertyDetails.minSurface")}</h4>
            <p className="text-lg font-bold text-gray-900">{currentSlideData.data.superficieMinima} m²</p>
          </div>
          {currentSlideData.data.entrega && (
            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-1">{t("hero.propertyDetails.delivery")}</h4>
              <p className="text-lg font-bold text-gray-900">{currentSlideData.data.entrega}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroFilterNiddo;