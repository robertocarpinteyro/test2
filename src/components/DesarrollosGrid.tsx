"use client";

import React, { FC, ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DEMO_STAY_LISTINGS } from "@/data/listings"; // Asegúrate de que tus datos ahora incluyan el campo "tag"
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";

export interface SectionGridFeaturePlacesProps {
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  cardType?: "card1" | "card2";
}

const TABS = ["casas", "departamentos", "oficinas", "lotes"]; // Define los tabs disponibles

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  cardType = "card2",
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryTag = searchParams.get("option"); // Obtiene el valor del query string "option"

  // Filtra los datos según el valor del tag
  const filteredListings = DEMO_STAY_LISTINGS.filter(
    (listing) => !queryTag || listing.tag === queryTag
  );

  // Maneja la actualización de la URL al hacer clic en un tab
  const handleTabClick = (tab: string) => {
    router.push(`/?option=${tab}`); // Actualiza la URL con el nuevo query string
  };

  // Renderiza los tabs
  const renderTabs = () => (
    <div className="flex flex-wrap gap-4 mb-8 justify-center sm:justify-start">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`px-4 py-2 rounded-lg text-sm sm:text-base ${
            queryTag === tab
              ? "bg-secondary-500 text-black"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );

  // Renderiza las tarjetas
  const renderCard = (stay: StayDataType) => {
    const CardName = cardType === "card1" ? StayCard : StayCard2;
    return <CardName key={stay.id} data={stay} />;
  };

  return (
    
    <div >
      {/*<div className="mb-4">
        <h2 className="text-2xl font-semibold">{heading}</h2>
        <p className="text-gray-500">{subHeading}</p>
      </div>*/}
      {renderTabs()}
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {filteredListings.map((stay) => renderCard(stay))}
      </div>
      <div className="flex justify-center items-center">
        {/*<ButtonPrimary loading>Muestrame más.</ButtonPrimary>*/}
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
