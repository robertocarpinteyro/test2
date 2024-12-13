{/*"use client";

import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CurrentSlideData, Data } from "@/app/(server-components)/SectionHero2";

export type HeroRealEstateTab = "casas" | "departamentos" | "oficinas" | "lotes";

export interface HeroRealEstateSearchFormProps {
  className?: string;
  currentSlideData: CurrentSlideData;
  data: Data[];
  transitionData: Data;
  handleTransitionData: React.Dispatch<React.SetStateAction<Data>>;
  handleCurrentSlideData: React.Dispatch<React.SetStateAction<CurrentSlideData>>;
  sliderData: Data[];
}

const tabItems = [
  { name: "Casas", value: "casas" },
  { name: "Departamentos", value: "departamentos" },
  { name: "Oficinas", value: "oficinas" },
  { name: "Lotes", value: "lotes" },
];

const HeroFilter: FC<HeroRealEstateSearchFormProps> = ({
  className = null,
  currentSlideData,
  data,
  transitionData,
  handleTransitionData,
  handleCurrentSlideData,
  sliderData,
}) => {
  const searchParams = useSearchParams();
  const [lastOption, setLastOption] = useState<string | null>(null);
  const [tabActive, setTabActive] = useState<HeroRealEstateTab>("casas");

  useEffect(() => {
    const option = searchParams.get("option");
    if (option && option !== lastOption) {
      setLastOption(option);
      const matchedTab = tabItems.find((item) => item.value === option)?.value;
      if (matchedTab) {
        updateSlide(tabItems.findIndex((item) => item.value === matchedTab), matchedTab);
      }
    }
  }, [searchParams, lastOption]);

  const updateSlide = (index: number, value: string) => {
    handleCurrentSlideData({
      data: sliderData[index],
      index,
    });
    handleTransitionData(sliderData[index]);
    setTabActive(value as HeroRealEstateTab);
  };

  const handleTabClick = (index: number, value: string) => {
    if (value !== lastOption) {
      window.location.href = `?option=${value}`;
    }
  };

  const renderTab = () => {
    return (
      <motion.ul className="ml-6 md:ml-16 xl:ml-20 inline-flex space-x-4 sm:space-x-8 lg:space-x-10 bg-white dark:bg-neutral-900 pb-6 md:p-6 !pl-0 xl:p-0 rounded-t-3xl">
        {tabItems.map(({ name, value }, index) => {
          const active = tabActive === value;
          return (
            <motion.li
              key={value}
              onClick={() => handleTabClick(index, value)}
              className={`flex items-center cursor-pointer text-sm lg:text-base font-medium ${
                active
                  ? "text-black dark:text-white"
                  : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-100"
              }`}
            >
              {active && (
                <span className="block w-2.5 h-2.5 rounded-full bg-neutral-800 dark:bg-neutral-100 mr-2" />
              )}
              <span>{name}</span>
            </motion.li>
          );
        })}
      </motion.ul>
    );
  };

  return (
    <div
      className={`nc-HeroRealEstateSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
    >
      {renderTab()}

    </div>
  );
};

export default HeroFilter;*/}
