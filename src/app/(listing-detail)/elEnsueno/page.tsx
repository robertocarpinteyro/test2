"use client";

import React, { FC, Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CommentListing from "@/components/CommentListing";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import StartRating from "@/components/StartRating";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import ButtonClose from "@/shared/ButtonClose";
import Input from "@/shared/Input";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Amenities_demos, PHOTOS } from "./constant";
import StayDatesRangeInput from "./StayDatesRangeInput";
import GuestsInput from "./GuestsInput";
import SectionDateRange from "../SectionDateRange";
import { Route } from "next";
import { Niddia } from "@/components/Niddia";
export interface ListingStayDetailPageProps {}

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({}) => {
  //

  {
    /*useEffect(() => {
    if (typeof window !== "undefined") {
      // Limpiar cookies relacionadas
      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });

      // Limpieza de localStorage y sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      // Capturar query string desde el cliente
      const urlParams = new URLSearchParams(window.location.search);
      const selectedOption = urlParams.get("option") || "niddia"; // Valor predeterminado

      console.log("optionVariable", selectedOption);

      // Configurar MindStudioSettings con el valor capturado
      (window as any).MindStudioSettings = {
        publicToken: "pkd281a1076c773e9bd767063d6d923a5d",
        appId: "52b9bb60-13d4-45f2-93a0-bedc2ec9f07e",
        targetId: "mindstudio-frame",
        debugging: true,
        options: {
          autoFocus: true,
          disableThreads: false,
          minimizeThreadPanel: true,
          launchVariables: {
            option: selectedOption, // Pasa el valor de la query string
          },
        },
      };

      // Insertar el script del embeding
      const script = document.createElement("script");
      script.src = "https://api.mindstudio.ai/v1/embed.js";
      script.async = false;
      document.body.appendChild(script);

      // Limpieza del script al desmontar el componente
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []); // No necesita dependencia, ya que `window.location` es global*/
  }

  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

  const pathname = usePathname();
  const thisPathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Verifica si el parámetro "option" ya está presente
    const option = searchParams.get("option");

    // Si no está presente, agrega "option=blue" al URL
    if (!option) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("option", "ElEnsueno");
      router.replace(
        `${pathname}?${newParams.toString()}` as unknown as Route<string>
      );
    }
  }, [pathname, searchParams, router]);

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          <Badge name="Lotes Residenciales" />
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Ensueño
        </h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          {/* <StartRating /> */}
          <span>·</span>
          <span>
            <span className="ml-1"> Desarrollador</span>
            <Image
              src="https://res.cloudinary.com/dwrtldhxd/image/upload/v1734498384/BosqueReal_wo13lr.png"
              alt="Logo"
              width={200} // Ajusta el ancho de la imagen
              height={100} // Ajusta la altura de la imagen
            />
          </span>
        </div>

        {/* 4 
        <div className="flex items-center">
          <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Hosted by{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              Kevin Francis
            </span>
          </span>
        </div>*/}

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center space-x-3 ">
            <i className=" las la-user text-2xl "></i>
            <span className="">
              6 <span className="hidden sm:inline-block">guests</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-bed text-2xl"></i>
            <span className=" ">
              6 <span className="hidden sm:inline-block">beds</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-bath text-2xl"></i>
            <span className=" ">
              3 <span className="hidden sm:inline-block">baths</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-door-open text-2xl"></i>
            <span className=" ">
              2 <span className="hidden sm:inline-block">bedrooms</span>
            </span>
          </div>
        </div>*/}
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Información</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <span>
            Espectacular privada con hermosas vistas a la cañada, donde la
            naturaleza juega en armonía con cada uno de los lotes residenciales
          </span>
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Amenidades </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {``}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {Amenities_demos.filter((_, i) => i < 12).map((item) => (
            <div key={item.name} className="flex items-center space-x-3">
              <i className={`text-3xl las ${item.icon}`}></i>
              <span className=" ">{item.name}</span>
            </div>
          ))}
        </div>

        {/* ----- 
        <div className="w-14 border-b border-neutral-200"></div>
        <div>
          <ButtonSecondary onClick={openModalAmenities}>
            View more 20 amenities
          </ButtonSecondary>
        </div>*/}
        {renderMotalAmenities()}
      </div>
    );
  };

  const renderMotalAmenities = () => {
    return (
      <Transition appear show={isOpenModalAmenities} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalAmenities}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-screen w-full max-w-4xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Amenidades
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {Amenities_demos.filter((_, i) => i < 1212).map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                      >
                        <i
                          className={`text-4xl text-neutral-6000 las ${item.icon}`}
                        ></i>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderSection4 = () => {
    return (
      <div className="">
        {/* HEADING listingSection__wrap
          <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Room Rates </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>*/}
        {/* CONTENT 
        <div className="flow-root">
          <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Monday - Thursday</span>
              <span>$199</span>
            </div>
            <div className="p-4  flex justify-between items-center space-x-4 rounded-lg">
              <span>Monday - Thursday</span>
              <span>$199</span>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Friday - Sunday</span>
              <span>$219</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Rent by month</span>
              <span>-8.34 %</span>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Minimum number of nights</span>
              <span>1 night</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Max number of nights</span>
              <span>90 nights</span>
            </div>
          </div>
        </div>*/}
      </div>
    );
  };

  const renderSection5 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Host Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              Kevin Francis
            </a>
            <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <StartRating />
              <span className="mx-2">·</span>
              <span> 12 places</span>
            </div>
          </div>
        </div>

        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor swimming pool, a bar, a shared lounge, a
          garden and barbecue facilities...
        </span>

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined in March 2016</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Response rate - 100%</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Fast response - within a few hours</span>
          </div>
        </div>

        {/* == */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div></div>
      </div>
    );
  };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Úbicación</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Bosque Real, Bosque Real, 52770 Naucalpan de Juárez, Méx.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
          <div className="rounded-xl overflow-hidden z-0">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15050.850519392008!2d-99.29151503585392!3d19.424818552018348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d206afcbeeb94f%3A0xadd2494484aa49aa!2sBosque%20Real%2C%2052774%20Naucalpan%20de%20Ju%C3%A1rez%2C%20M%C3%A9x.!5e0!3m2!1ses-419!2smx!4v1734318841212!5m2!1ses-419!2smx"
            ></iframe>
          </div>
        </div>
      </div>
    );
  };
  {
    /*}  const niddia = () => {
    return (
      <div id="niddia-section" className="listingSection__wrap">
        <iframe
          className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800"
          id="mindstudio-frame"
          referrerPolicy="origin"
          style={{
            width: "100%",
            height: "85vh",
            border: "none",
            borderRadius: "8px",
            outline: "none",
            backgroundColor: "gray",
          }}
          title="Niddia"
          frameBorder="0"
        ></iframe>
      </div>
    );
  };*/
  }

  const renderSection8 = () => {
    const images = [
      {
        src: "https://www.bosquereal.com.mx/wp-content/uploads/2024/09/ensueno-1.jpg",
        badgeText: "El Ensueño",

      },
      {
        src: "https://www.bosquereal.com.mx/wp-content/uploads/2024/09/ensueno-5.jpg",
        badgeText: "El Ensueño",
 
      },
    ];
  
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">LOTIFICACIÓN</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
  
        {/* CONTENT */}
        <div className="relative w-full h-64 mt-3 overflow-hidden">
          <Image
            fill
            className="object-cover rounded-md sm:rounded-xl transition-all duration-500 ease-in-out"
            src={images[currentIndex].src}
            alt={`Plano Life ${currentIndex + 1}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
  
          {/* Badge dinámico por imagen */}
          <div className="absolute top-4 left-4">
            <Badge name={images[currentIndex].badgeText} />
          </div>
  
          {/* Botón Anterior */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            ◀
          </button>
          {/* Botón Siguiente */}
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            ▶
          </button>
        </div>
  
        {/* Indicadores */}
        <div className="flex justify-center mt-3">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-black" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
  
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            Desde <br />
            $6,632,640.00
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              mxn
            </span>
          </span>
        </div>

        {/* FORM 
        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <StayDatesRangeInput className="flex-1 z-[11]" />
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <GuestsInput className="flex-1" />
        </form>*/}

        {/* SUM */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Superficie total 300.12 m² </span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Fecha de entrega</span>
            <span>Abril 2026 más 6 meses de gracia.</span>
          </div>
          {/* <div className="border-b border-neutral-200 dark:border-neutral-700"></div>*/}
          <div className="flex justify-between font-semibold">
            {/* <span>Total</span>
            <span>$199</span>*/}
          </div>
        </div>

        {/* SUBMIT */}
        <ButtonPrimary>
          <a href="#niddia">Niddia Resolverá tus dudas.</a>
        </ButtonPrimary>
      </div>
    );
  };

  return (
    <div className="nc-ListingStayDetailPage">
      {/*  HEADER */}
      <header className="rounded-md sm:rounded-xl relative">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div
            className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
            onClick={handleOpenModalImageGallery}
          >
            <Image
              fill
              className="object-cover rounded-md sm:rounded-xl"
              src={PHOTOS[0]}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          {PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
            <div
              key={index}
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                index >= 3 ? "hidden sm:block" : ""
              }`}
            >
              <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                <Image
                  fill
                  className="object-cover rounded-md sm:rounded-xl "
                  src={item || ""}
                  alt="Imagen adicional"
                  sizes="400px"
                />
              </div>

              {/* OVERLAY */}
              <div
                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleOpenModalImageGallery}
              />
            </div>
          ))}
        </div>

        {/* Botones alineados */}
        <div className="absolute bottom-3 left-3 flex gap-3 z-10">
          {/* Botón Ver todas las fotos */}
          <button
            className="flex items-center px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Ver todas las fotos
            </span>
          </button>

          {/* Botón Visita el recorrido virtual */}
          <a
            href="https://jxnglobal.com/vr/gbr/propiedades/nativ_765a5b52/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
          >
            <span className="text-neutral-800 text-sm font-medium">
              Visita el recorrido virtual
            </span>
          </a>
        </div>
      </header>

      {/* MAIN */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {renderSection4()}
          {renderSection8()}
          {renderSection7()}
          <div id="niddia"></div>
            <Niddia indexValue="lotes" selectedOption="elensueno" iframeSrc="https://interfaces.zapier.com/embed/chatbot/cmakobkap001nm049v17lva4z"/>
          {/*<SectionDateRange />*/}
        </div>

        {/*SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>
    </div>
  );
};

export default ListingStayDetailPage;
