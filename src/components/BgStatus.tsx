import React from "react";
import { motion } from "framer-motion";
import { CurrentSlideData, Data } from "@/app/(server-components)/SectionHero2";
import Image from "next/image";


type Props = {
  transitionData: Data;
  currentSlideData: CurrentSlideData;
};

function BgStatus({ transitionData, currentSlideData }: Props) {
  return (
    <div className="relative flex items-center justify-between w-full h-full">

      {transitionData && (
        <motion.img
          key={transitionData.img}
          layoutId={transitionData.img}
          alt="Transition Image"
          transition={{
            opacity: { ease: "linear" },
            layout: { duration: 0.6 },
          }}
          className="absolute left-0 top-0 h-full w-full object-cover brightness-50"
          src={transitionData.img}
        />
      )}
      <motion.img
        alt="Current Image"
        key={currentSlideData.data.img + "transition"}
        src={currentSlideData.data.img}
        className="absolute left-0 top-0 h-full w-full object-cover brightness-50"
      />


      <div className="absolute right-0 top-0 flex items-end justify-end w-56 sm:w-60 md:w-1/2 h-full pr-8 ">
        <div className="relative">
          <Image
            src={"/img/niddiaHero.png"}
            width={600}
            height={600}
            alt={"Niddia"}
            className="object-contain"
          />
          <div className="absolute inset-0 flex justify-center items-center">
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default BgStatus;
