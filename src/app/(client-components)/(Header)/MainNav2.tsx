"use client";
import React, { FC } from "react";
import Logo from "@/shared/Logo";
import MenuBar from "@/shared/MenuBar";
import LangDropdown from "./LangDropdown";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import HeroSearchForm2MobileFactory from "../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";
import Link from "next/link";
import TemplatesDropdown from "./TemplatesDropdown";
import { Route } from "@/routers/types";
import Image from "next/image";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/hooks/useTranslation";
export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const { t } = useTranslation();
  
  return (
    <div className={`MainNav2 sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/20 dark:border-neutral-700/20 shadow-sm ${className}`}>
      <div className="px-4 h-20 lg:container flex justify-between items-center">
        {/* Logo - Always visible */}
        <div className="flex justify-start">
          <Link
            href="/"
            className="relative contrast-200 brightness-200 self-center h-50 w-20"
          >
            <Image
              src="https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_auto/v1733722950/logoblack_rdtpxs.png"
              alt="Logo"
              width={200}
              height={100}
            />
          </Link>
          <div className="hidden lg:block self-center h-10 border-l border-neutral-300 dark:border-neutral-500 ml-8"></div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-1 items-center">
          <LanguageToggle />
          <a
            href="/niddia"
            target="_blank"
            rel="noopener noreferrer"
            className="self-center text-opacity-90 group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            {t("chat.withNiddia")}
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className="flex space-x-3 lg:hidden items-center">
          <LanguageToggle />
        </div>
      </div>
    </div>
  );
};

export default MainNav2;
