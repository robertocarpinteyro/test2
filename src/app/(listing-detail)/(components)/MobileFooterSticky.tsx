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
  const pathname = usePathname();
  const router = useRouter(); // Inicializa el router
  const handleOpenModalAndNavigate = () => {

    router.push("/niddia"); // Redirige a la ruta deseada
  };
  const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));
   const getImageGalleryListing = () => {
      if (thisPathname?.includes("/skyview")) {
        desarrollo.price = "$19,920,000";
        return desarrollo.price;
      }
      if (thisPathname?.includes("/casa-ambar")) {
        desarrollo.price = "$15,000,000";
        return desarrollo.price;
      }
      if (thisPathname?.includes("/ivy")) {
        desarrollo.price = "$12,500,001.02";
        return desarrollo.price;
      }
      if (thisPathname?.includes("/ciento-ochenta")) {
        desarrollo.price = "$14,021,169.55";
        return desarrollo.price;
      }
      if (thisPathname?.includes("/blue")) {
        desarrollo.price = "$9,676,311.58";
        return desarrollo.price;
      }
      if (thisPathname?.includes("/nativ")) {
        desarrollo.price = "$7,980,000.00";
        return desarrollo.price;
      }
      if (thisPathname?.includes("/nox")) {
        desarrollo.price = "$9,927,450.00";
        return desarrollo.price;
      }
      if (thisPathname?.includes("/designo")) {
        desarrollo.price = "$5,178,218.34";
        return desarrollo.price;
      }
      if (thisPathname?.includes("/elEnsueno")) {
        desarrollo.price = "$6,632,640.00";
        return desarrollo.price;
      }
      if (thisPathname?.includes("/islaArbol")) {
        desarrollo.price = "$5,544,000.00";
        return desarrollo.price;
      }
      if (thisPathname?.includes("/the-residences")) {
        desarrollo.price = "$5,544,000.00";
        return desarrollo.price;
      }
      if (thisPathname?.includes("/designo-hotel")) {
        desarrollo.price = "$7,196,657.59";
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
              
              onClick={handleOpenModalAndNavigate }
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
