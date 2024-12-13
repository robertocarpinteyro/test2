import React, { useState } from "react";
import ModalSelectDate from "@/components/ModalSelectDate";
import ButtonPrimary from "@/shared/ButtonPrimary";
import converSelectedDateToString from "@/utils/converSelectedDateToString";
import ModalReserveMobile from "./ModalReserveMobile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const MobileFooterSticky = () => {
  const thisPathname = usePathname();
  const desarrollo = {price: "500"};
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2023/02/06")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));
   const getImageGalleryListing = () => {
      if (thisPathname?.includes("/listing-stay-detail")) {
        desarrollo.price = "1000";
        return desarrollo.price;
      }
      if (thisPathname?.includes("/casa-ambar")) {
        desarrollo.price = "$19,920,000";
        return desarrollo.price;
      }
  
      return [];
    };
  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
      <div className="container flex items-center justify-between">
        <div className="">
          <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
            Desde
          </span>
          <span className="block text-xl font-semibold">{getImageGalleryListing()} mxn</span>
          {/* <ModalSelectDate
            renderChildren={({ openModal }) => (
             <span
                onClick={openModal}
                className="block text-sm underline font-medium"
              >
                {converSelectedDateToString([startDate, endDate])}
              </span>
            )}
          />*/}
        </div>
        <ModalReserveMobile
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
              onClick={openModal}
            >
              Saber más.
            </ButtonPrimary>
          )}
        />
      </div>
    </div>
  );
};

export default MobileFooterSticky;
