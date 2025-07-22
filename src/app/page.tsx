"use client" 
import React from "react";

import BgGlassmorphism from "@/components/BgGlassmorphism";

import SectionGridFeaturePlaces from "@/components/DesarrollosGrid";

import SectionVideos from "@/components/SectionVideos";

import SectionHero2 from "./(server-components)/SectionHero2";


function PageHome() {
  return (
    <main className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        <SectionHero2 className="pt-10 lg:pt-16 lg:pb-16" />

        {/* SECTION 1 */}

        <SectionGridFeaturePlaces cardType="card2" />

        <SectionVideos />

        

      </div>
    </main>
  );
}

export default PageHome;
