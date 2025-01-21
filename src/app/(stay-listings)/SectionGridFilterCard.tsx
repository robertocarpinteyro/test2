import React, { FC } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import Pagination from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import StayCard2 from "@/components/StayCard2";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
}

// Definir datos de demostración filtrando los primeros 8 elementos
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.slice(0, 8);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = DEMO_DATA,
}) => (
  <div className={`nc-SectionGridFilterCard ${className}`} data-nc-id="SectionGridFilterCard">
    <Heading2 />

    <div className="mb-8 lg:mb-11">
      <TabFilters />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {data.map((stay) => (
        <StayCard2 key={stay.id} data={stay} />
      ))}
    </div>

    <div className="flex justify-center items-center mt-16">
      <Pagination />
    </div>
  </div>
);

export default SectionGridFilterCard;
