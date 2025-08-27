"use client";

import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import FooterNav from "./FooterNav";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

// Widget menus moved to component for translation support

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  const getTranslatedWidgetMenus = (): WidgetFooterMenu[] => [
    {
      id: "5",
      title: t("footer.gettingStarted"),
      menus: [
        { href: "#", label: t("footer.installation") },
        { href: "#", label: t("footer.releaseNotes") },
        { href: "#", label: t("footer.upgradeGuide") },
        { href: "#", label: t("footer.browserSupport") },
        { href: "#", label: t("footer.editorSupport") },
      ],
    },
    {
      id: "1",
      title: t("footer.explore"),
      menus: [
        { href: "#", label: t("footer.designFeatures") },
        { href: "#", label: t("footer.prototyping") },
        { href: "#", label: t("footer.designSystems") },
        { href: "#", label: t("footer.pricing") },
        { href: "#", label: t("footer.security") },
      ],
    },
    {
      id: "2",
      title: t("footer.resources"),
      menus: [
        { href: "#", label: t("footer.bestPractices") },
        { href: "#", label: t("footer.support") },
        { href: "#", label: t("footer.developers") },
        { href: "#", label: t("footer.learnDesign") },
        { href: "#", label: t("footer.releases") },
      ],
    },
    {
      id: "4",
      title: t("footer.community"),
      menus: [
        { href: "#", label: t("footer.discussionForums") },
        { href: "#", label: t("footer.codeOfConduct") },
        { href: "#", label: t("footer.communityResources") },
        { href: "#", label: t("footer.contributing") },
        { href: "#", label: t("footer.concurrentMode") },
      ],
    },
  ];
  
  const widgetMenus = getTranslatedWidgetMenus();
  
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <FooterNav />

      <div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
            <Image
              className="dark:invert"
              src="https://res.cloudinary.com/dwrtldhxd/image/upload/v1733722950/logoblack_rdtpxs.png"
              alt="Logo"
              width={200} // Ajusta el ancho de la imagen
              height={100} // Ajusta la altura de la imagen
            />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
            </div>
          </div>
      
        </div>
      </div>
    </>
  );
};

export default Footer;
