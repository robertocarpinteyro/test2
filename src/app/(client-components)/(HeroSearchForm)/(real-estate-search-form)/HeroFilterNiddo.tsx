"use client";

import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CurrentSlideData, Data } from "@/app/(server-components)/SectionHero2";

export type HeroRealEstateTab =
  | "casas"
  | "departamentos"
  | "oficinas"
  | "lotes";

export interface HeroRealEstateSearchFormProps {
  className?: string;
  currentSlideData: CurrentSlideData;
  data: Data[];
  transitionData: Data;
  handleTransitionData: React.Dispatch<React.SetStateAction<Data>>;
  handleCurrentSlideData: React.Dispatch<
    React.SetStateAction<CurrentSlideData>
  >;
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
        updateSlide(
          tabItems.findIndex((item) => item.value === matchedTab),
          matchedTab
        );
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
      <motion.ul className="ml-6 md:ml-16 xl:ml-20 inline-flex space-x-4 sm:space-x-8 lg:space-x-10 pb-6 md:p-6 !pl-0 xl:p-5">
        {tabItems.map(({ name, value }, index) => {
          const active = tabActive === value;
          return (
            <motion.li
              key={value}
              onClick={() => handleTabClick(index, value)}
              className={`group flex items-center cursor-pointer text-sm lg:text-base font-medium transition-colors duration-300 ${
                active
                  ? "text-green-600 dark:text-green-400"
                  : "text-neutral-500 hover:text-green-500 dark:hover:text-green-300"
              }`}
            >
              {active && (
                <span className="block w-3 h-3 rounded-full bg-green-600 dark:bg-green-400 mr-3 shadow-md transition-transform duration-300 scale-110 group-hover:scale-125"></span>
              )}
              <span
                className={`relative ${
                  active ? "font-semibold" : "font-medium"
                } transition-colors duration-300 group-hover:text-green-500 dark:group-hover:text-green-300`}
              >
                {name}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-green-600 dark:bg-green-400 rounded-md transition-transform scale-x-100 group-hover:scale-x-110"></span>
                )}
              </span>
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
      {/*{renderTab()*/}
    </div>
  );
};

export default HeroFilter;
