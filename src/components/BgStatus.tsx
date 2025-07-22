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
        <motion.div
          key={transitionData.img}
          layoutId={transitionData.img}
          transition={{
            opacity: { ease: "linear" },
            layout: { duration: 0.6 },
          }}
          className="absolute left-0 top-0 h-full w-full brightness-50"
        >
          <Image
            src={transitionData.img}
            alt="Transition Image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>
      )}
      <motion.div
        key={currentSlideData.data.img + "transition"}
        className="absolute left-0 top-0 h-full w-full brightness-50"
      >
        <Image
          src={currentSlideData.data.img}
          alt="Current Image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </motion.div>


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
