"use client";

import React from "react";
import { PathName } from "@/routers/types";
import HeroSearchForm2Mobile from "./HeroSearchForm2Mobile";
// Removed real estate mobile form - now only uses stay search

const HeroSearchForm2MobileFactory = () => {
  // Always return stay search form since other types were removed
  return <HeroSearchForm2Mobile />;
};

export default HeroSearchForm2MobileFactory;
