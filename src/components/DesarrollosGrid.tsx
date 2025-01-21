"use client";

import React, { FC, ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";

export interface SectionGridFeaturePlacesProps {
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  cardType?: "card1" | "card2";
}

const TABS = ["casas", "departamentos", "oficinas", "lotes"];

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  gridClass = "",
  heading = "Encuentra la propiedad de tus sueños.",
  subHeading = "Explora nuestras propiedades disponibles y con ayuda de Niddia encuentra una propiedad ideal.",
  cardType = "card2",
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryTag = searchParams.get("option");

  // Filtrar listados según la categoría seleccionada
  const filteredListings = queryTag
    ? DEMO_STAY_LISTINGS.filter((listing) => listing.tag === queryTag)
    : DEMO_STAY_LISTINGS;

  // Manejar la actualización del parámetro de consulta en la URL
  const handleTabClick = (tab: string) => {
    router.push(`/?option=${tab}`);
  };

  // Renderizar tabs de categorías
  const renderTabs = () => (
    <div className="flex flex-wrap gap-4 mb-8 justify-center sm:justify-start">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
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

  return (
    <div id="desarrollos">
      {/* Sección de título opcional */}
      {heading && (
        <div className="mb-4 text-center sm:text-left">
          <h2 className="text-2xl font-semibold">{heading}</h2>
          <p className="text-gray-500">{subHeading}</p>
        </div>
      )}

      {renderTabs()}

      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {filteredListings.map((stay) => {
          const CardComponent = cardType === "card1" ? StayCard : StayCard2;
          return <CardComponent key={stay.id} data={stay} />;
        })}
      </div>

      {/* Botón de carga más contenido (opcional) */}
      {/* <div className="flex justify-center items-center mt-8">
        <ButtonPrimary loading>Muestrame más.</ButtonPrimary>
      </div> */}
    </div>
  );
};

export default SectionGridFeaturePlaces;
