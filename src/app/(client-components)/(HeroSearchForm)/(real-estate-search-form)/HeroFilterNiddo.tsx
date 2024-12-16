"use client";

import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Tabs, Tab } from "@nextui-org/tabs";
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
      <Tabs
        aria-label="Hero Tabs"
        className="w-full max-w-6xl"
        selectedKey={tabActive}
        onSelectionChange={(key) => {
          const index = tabItems.findIndex((item) => item.value === key);
          handleTabClick(index, key as string);
        }}
        color="primary"
        variant="underlined"
      >
        {tabItems.map(({ name, value }) => (
          <Tab
            key={value}
            title={name}
            className={`${
              tabActive === value ? "text-primary font-bold" : "text-muted"
            }`}
          />
        ))}
      </Tabs>
    );
  };

  return (
    <div
      className={`nc-HeroRealEstateSearchForm w-full py-5 lg:py-0 ${className}`}
    >
      {/*{renderTab()}*/}
    </div>
  );
};

export default HeroFilter;
