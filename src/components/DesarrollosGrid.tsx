"use client";

import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";
import { useTranslation } from "@/hooks/useTranslation";

export interface SectionGridFeaturePlacesProps {
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  cardType?: "card1" | "card2";
}

// Orden específico de las secciones
const TABS = ["casas", "departamentos", "lotes", "oficinas"];

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  gridClass = "",
  heading,
  subHeading,
  cardType = "card2",
}) => {
  const { t } = useTranslation();
  
  const defaultHeading = heading || t("sections.featuredProperties");
  const defaultSubHeading = subHeading || t("sections.featuredPropertiesSubtitle");  
  
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case "casas": return t("hero.propertyTypes.houses");
      case "departamentos": return t("hero.propertyTypes.apartments");
      case "lotes": return t("hero.propertyTypes.lots");
      case "oficinas": return t("hero.propertyTypes.offices");
      default: return tab;
    }
  };
  // Renderizar las secciones una debajo de la otra
  const renderSections = () => (
    <div className="space-y-12">
      {TABS.map((tab) => {
        // Filtrar los listados según la categoría actual
        const filteredListings = DEMO_STAY_LISTINGS.filter(
          (listing) => listing.tag === tab
        );

        return (
          <div key={tab} id={tab}>
            {/* Título de la sección */}
            <h2 className="text-xl font-semibold mb-4 capitalize">{getTabTitle(tab)}</h2>

            {/* Listados de la categoría */}
            <div
              className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
            >
              {filteredListings.map((stay) => {
                const CardComponent =
                  cardType === "card1" ? StayCard : StayCard2;
                return <CardComponent key={stay.id} data={stay} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div id="desarrollos">
      {/* Sección de título opcional */}
      {heading && (
        <div className="mb-4 text-center sm:text-left">
          <h2 className="text-2xl font-semibold">{defaultHeading}</h2>
          <p className="text-gray-500">{defaultSubHeading}</p>
        </div>
      )}

      {renderSections()}
    </div>
  );
};

export default SectionGridFeaturePlaces;