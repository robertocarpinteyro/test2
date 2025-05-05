"use client";

import BackgroundSection from "@/components/BackgroundSection";
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";
import MobileFooterSticky from "./(components)/MobileFooterSticky";
import { imageGallery as listingStayImageGallery } from "./skyview/constant";
import { imageGallery as ListingGalleryImage } from "./casa-ambar/constant";
import { imageGallery as ListingGalleryBlue } from "./blue/constant";
import { imageGallery as ListingGalleryIncanto } from "./incanto/constant";
import { imageGallery as ListingGalleryCientoOchenta } from "./ciento-ochenta/constant";
import { imageGallery as ListingGalleryIvy } from "./ivy/constant";
import { imageGallery as ListingGalleryNox } from "./nox/constant";
import { imageGallery as ListingGalleryNativ } from "./nativ/constant";
import { imageGallery as ListingGalleryDesigno } from "./torre-designo/constant";
import { imageGallery as ListingGalleryElEnsueno } from "./elEnsueno/constant";
import { imageGallery as ListingGalleryIslaArbol } from "./islaArbol/constant";
import { imageGallery as ListingGalleryTheResidences } from "./the-residences/constant";
import { imageGallery as ListingGalleryDesignoHotel } from "./designo-hotel/constant";
import { imageGallery as ListingGalleryislaEncino } from "./islaEncino/constant";
import { imageGallery as ListingGallerylaReserva } from "./reserva/constant";
import { imageGallery as ListingGalleryLife } from "./life/constant";

import { imageGallery as listingCarImageGallery } from "./listing-car-detail/constant";
import { imageGallery as listingExperienceImageGallery } from "./listing-experiences-detail/constant";
import { Route } from "next";
import { imageGallery } from "./casa-ambar/constant";

const DetailtLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const thisPathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    router.push(`${thisPathname}/?${params.toString()}` as Route);
  };

  const getImageGalleryListing = () => {
    if (thisPathname?.includes("/skyview")) {
      return listingStayImageGallery;
    }
    if (thisPathname?.includes("/casa-ambar")) {
      return ListingGalleryImage;
    }

    if (thisPathname?.includes("/blue")) {
      return ListingGalleryBlue;
    }
    if (thisPathname?.includes("/ivy")) {
      return ListingGalleryIvy;
    }
    if (thisPathname?.includes("/ciento-ochenta")) {
      return ListingGalleryCientoOchenta;
    }
    if (thisPathname?.includes("/nox")) {
      return ListingGalleryNox;
    }
    if (thisPathname?.includes("/nativ")) {
      return ListingGalleryNativ;
    }
    if (thisPathname?.includes("/torre-designo")) {
      return ListingGalleryDesigno;
    }
    if (thisPathname?.includes("/elensueno")) {
      return ListingGalleryElEnsueno;
    }
    if (thisPathname?.includes("/islaArbol")) {
      return ListingGalleryIslaArbol;
    }
    if (thisPathname?.includes("/the-residences")) {
      return ListingGalleryTheResidences;
    }
    if (thisPathname?.includes("/designo-hotel")) {
      return ListingGalleryDesignoHotel;
    }
    if (thisPathname?.includes("/islaEncino")) {
      return ListingGalleryislaEncino;
    }
    if (thisPathname?.includes("/reserva")) {
      return ListingGallerylaReserva;
    }
    if (thisPathname?.includes("/life")) {
      return ListingGalleryLife;
    }
    if (thisPathname?.includes("/incanto")) {
      return ListingGalleryIncanto;
    }




    return [];
  };

  return (
    <div className="ListingDetailPage">
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={getImageGalleryListing()}
      />

      <div className="container ListingDetailPage__content">{children}</div>

      {/* OTHER SECTION */}
      <div className="container py-24 lg:py-32"></div>

      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />
    </div>
  );
};

export default DetailtLayout;
