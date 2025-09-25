"use client";

import React, { FC, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRightIcon,
  HomeIcon,
  SparklesIcon,
  MapPinIcon,
  CameraIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PHOTOS } from "./constant";
import Script from "next/script";
import MetaPixel from "@/components/MetaPixel";
import { useTranslation } from "@/hooks/useTranslation";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "zapier-interfaces-chatbot-embed": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

// Metadata moved to layout.tsx

export interface CasaAmbarLandingPageProps {}

const CasaAmbarLandingPage: FC<CasaAmbarLandingPageProps> = ({}) => {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string>("");
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % PHOTOS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => {
    scrollToSection("contact-section");
  };

  const handleGalleryClick = () => {
    scrollToSection("gallery-section");
  };

  // Lightbox functionality
  const openLightbox = (image: string, images: string[], currentIndex: number) => {
    setLightboxImage(image);
    setLightboxImages(images);
    setLightboxCurrentIndex(currentIndex);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage("");
    setLightboxImages([]);
    setLightboxCurrentIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    const nextIndex = (lightboxCurrentIndex + 1) % lightboxImages.length;
    setLightboxCurrentIndex(nextIndex);
    setLightboxImage(lightboxImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (lightboxCurrentIndex - 1 + lightboxImages.length) % lightboxImages.length;
    setLightboxCurrentIndex(prevIndex);
    setLightboxImage(lightboxImages[prevIndex]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxCurrentIndex, lightboxImages]);

  // Hero Section
  const renderHeroSection = () => {
    return (
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            style={{ y }}
            className="relative w-full h-[120%] -top-[10%]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://res.cloudinary.com/dwrtldhxd/video/upload/v1753233777/Presentacionambar_p6nkjx.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
          </motion.div>
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex items-center justify-center text-center px-4"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium border border-white/20">
                <SparklesIcon className="w-4 h-4 mr-2" />
                {t("developments.casaAmbar.exclusiveResidenceTag")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
            >
              {t("developments.casaAmbar.name")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {t("developments.casaAmbar.architectureInspires")}
              <br />
              <span className="text-emerald-300">
                {t("developments.casaAmbar.newHomeExclusive")}
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
             

              <ButtonSecondary
                onClick={handleGalleryClick}
                className="px-8 py-4 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              >
                <CameraIcon className="w-5 h-5 mr-2" />
                {t("developments.common.viewGallery")}
              </ButtonSecondary>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-px h-16 bg-white/50 mx-auto mb-4"></div>
          <p className="text-white/70 text-sm">{t("developments.common.swipeToDiscover")}</p>
        </motion.div>
      </section>
    );
  };

  // General Description Section
  const renderDescriptionSection = () => {
    return (
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 text-sm font-medium mb-6">
                <HomeIcon className="w-4 h-4 mr-2" />
                {t("developments.casaAmbar.luxuryResidence")}
              </span>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
                {t("developments.casaAmbar.uniqueLifeExperience")}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12"
            >
              <p className="mb-6">
                <strong className="text-emerald-600 dark:text-emerald-400">
                  Casa Ámbar
                </strong>{" "}
                {t("developments.casaAmbar.conceivedDescription")}
                {t("developments.casaAmbar.facadeDescription")}
              </p>

              <p>
                {t("developments.casaAmbar.levelDescription")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
              <div className="p-6">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {t("developments.casaAmbar.construction474")}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {t("developments.common.construction")}
                </div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  4
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Niveles de Diseño
                </div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  2025
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {t("developments.casaAmbar.septemberDelivery")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  // Enhanced Level Distribution Section with Media Integration
  const renderEnhancedLevelsSection = () => {
    const levels = [
      {
        title: t("developments.casaAmbar.nivel01"),
        subtitle: t("developments.casaAmbar.socialServiceArea"),
        icon: "🏛️",
        spaces: t("developments.casaAmbar.nivel01Spaces"),
        features: t("developments.casaAmbar.nivel01Features"),
        photos: [
          "https://res.cloudinary.com/dwrtldhxd/image/upload/v1756071937/Cocina_vokbm5.jpg",
          "https://res.cloudinary.com/dwrtldhxd/image/upload/v1756071937/Jardin_bmckwm.jpg",
          "https://res.cloudinary.com/dwrtldhxd/image/upload/v1756072729/Sala_uqerwg.jpg",
        ],
        hasVirtualTour: true,
        virtualTourPath: "/recorrido/Primer Nivel/index.html",
      },
      {
        title: t("developments.casaAmbar.nivel02"),
        subtitle: "Área Privada de Descanso",
        icon: "🛏️",
        spaces:
          "Master Bedroom 25m², Baño 12m², Walking Closet 9m², Recamara 1: 21m², Baño 4m², Walking Closet 4m², Recamara 2: 21m², Baño 4m², Walking Closet 4m², Family Room 33m²",
        features: [
          t("developments.casaAmbar.levelFeatures.familyRoom"),
          t("developments.casaAmbar.levelFeatures.eachBedroom"),
          t("developments.casaAmbar.levelFeatures.terraces"),
          t("developments.casaAmbar.levelFeatures.masterBedroom"),
          t("developments.casaAmbar.levelFeatures.porcelain"),
        ],
        photos: [],
        hasVirtualTour: false,
      },
      {
        title: t("developments.casaAmbar.nivel03"),
        subtitle: t("developments.casaAmbar.wellnessEntertainmentArea"),
        icon: "🌅",
        spaces: t("developments.casaAmbar.nivel03Spaces"),
        features: t("developments.casaAmbar.nivel03Features"),
        photos: [],
        hasVirtualTour: false,
      },
      {
        title: t("developments.casaAmbar.sotano"),
        subtitle: "Área de Servicios y Cava",
        icon: "🍷",
        spaces: t("developments.casaAmbar.sotanoSpaces"),
        features: [
          t("developments.casaAmbar.levelFeatures.exclusivity"),
          t("developments.casaAmbar.levelFeatures.tastingArea"),
          t("developments.casaAmbar.levelFeatures.storageArea"),
        ],
        photos: [],
        hasVirtualTour: false,
      },
    ];

    return (
      <section className="py-24 lg:py-32 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("developments.casaAmbar.levelDistribution")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("developments.casaAmbar.levelDistributionDesc")}
            </p>
          </motion.div>

          <div className="space-y-24">
            {levels.map((level, index) => (
              <motion.div
                key={level.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-neutral-800 dark:to-neutral-900 rounded-3xl overflow-hidden shadow-xl"
              >
                {/* Header */}
                <div className="p-8 lg:p-12 border-b border-gray-200 dark:border-neutral-700">
                  <div className="flex items-center mb-4">
                    <span className="text-5xl mr-6">{level.icon}</span>
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {level.title}
                      </h3>
                      <p className="text-lg text-emerald-600 dark:text-emerald-400 font-medium">
                        {level.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Spaces Overview */}
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-3">
                      {t("developments.casaAmbar.spacesAndDimensions")}
                    </h4>
                    <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
                      {level.spaces}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        {t("developments.casaAmbar.mainCharacteristics")}
                      </h4>
                      <ul className="space-y-3">
                        {Array.isArray(level.features) && level.features.slice(0, Math.ceil(level.features.length / 2)).map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        {t("developments.casaAmbar.designDetails")}
                      </h4>
                      <ul className="space-y-3">
                        {Array.isArray(level.features) && level.features.slice(Math.ceil(level.features.length / 2)).map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Media Content */}
                {(level.photos.length > 0 || level.hasVirtualTour) && (
                  <div className="p-8 lg:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Photo Gallery */}
                      {level.photos.length > 0 && (
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                            <CameraIcon className="w-5 h-5 mr-2 text-emerald-600" />
                            {t("developments.casaAmbar.photoGallery")}
                          </h4>
                          <div className="grid grid-cols-1 gap-4">
                            {level.photos.map((photo, photoIndex) => (
                              <motion.div
                                key={photoIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: photoIndex * 0.1 }}
                                viewport={{ once: true }}
                                className="relative overflow-hidden rounded-xl group cursor-pointer"
                                onClick={() => openLightbox(photo, level.photos, photoIndex)}
                              >
                                <div className="aspect-w-16 aspect-h-10">
                                  <Image
                                    src={photo}
                                    alt={`${level.title} - Vista ${photoIndex + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                  />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="bg-white/20 backdrop-blur-md rounded-full p-3">
                                    <CameraIcon className="w-6 h-6 text-white" />
                                  </div>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <p className="text-sm font-medium">
                                    {level.title} - Vista {photoIndex + 1}
                                  </p>
                                  <p className="text-xs text-white/80 mt-1">
                                    Click para ampliar
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Virtual Tour */}
                      {level.hasVirtualTour && (
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                            <PlayIcon className="w-5 h-5 mr-2 text-emerald-600" />
                            {t("developments.casaAmbar.virtualTour360")}
                          </h4>
                          <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800">
                            <div className="aspect-w-16 aspect-h-10">
                              <iframe
                                src={level.virtualTourPath}
                                className="w-full h-full border-0"
                                allowFullScreen
                                loading="lazy"
                                title={`${t("developments.casaAmbar.virtualTourTitle")} ${level.title}`}
                              />
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
                            Explora cada rincón con nuestro tour interactivo 360°
                          </p>
                        </div>
                      )}

                      {/* Placeholder for levels without media */}
                      {level.photos.length === 0 && !level.hasVirtualTour && (
                        <div className="lg:col-span-2">
                          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-xl p-8 text-center">
                            <div className="text-4xl mb-4">📸</div>
                            <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                              {t("developments.casaAmbar.galleryComingSoon")}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Features Section
  const renderFeaturesSection = () => {
    const features = [
      {
        icon: "✨",
        title: t("developments.casaAmbar.features.contemporaryDesign"),
        description: t("developments.casaAmbar.features.contemporaryDesignDesc"),
      },
      {
        icon: "☀️",
        title: t("developments.casaAmbar.features.naturalLight"),
        description: t("developments.casaAmbar.features.naturalLightDesc"),
      },
      {
        icon: "🏡",
        title: t("developments.casaAmbar.features.ampleSocialAreas"),
        description: t("developments.casaAmbar.features.ampleSocialAreasDesc"),
      },
      {
        icon: "🔧",
        title: t("developments.casaAmbar.features.serviceSpaces"),
        description: t("developments.casaAmbar.features.serviceSpacesDesc"),
      },
      {
        icon: "🎯",
        title: t("developments.casaAmbar.features.exclusiveLocation"),
        description: t("developments.casaAmbar.features.exclusiveLocationDesc"),
      },
    ];

    return (
      <section className="py-24 lg:py-32 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-neutral-800 dark:to-neutral-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("developments.casaAmbar.featuredCharacteristics")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("developments.casaAmbar.featuredCharacteristicsDesc")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature: { icon: string; title: any; description: any; }, index: number) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Gallery Section
  const renderGallerySection = () => {
    return (
      <section
        id="gallery-section"
        className="py-24 lg:py-32 bg-white dark:bg-neutral-900"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("developments.casaAmbar.visualGallery")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              "{t("developments.casaAmbar.whereDesignMeets")}"
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHOTOS.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                onClick={() => openLightbox(photo, PHOTOS, index)}
              >
                <div
                  className={`aspect-w-16 aspect-h-9 ${
                    index === 0 ? "md:aspect-h-16" : ""
                  }`}
                >
                  <Image
                    src={photo}
                    alt={`Casa Ámbar ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
                    <CameraIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">
                    Casa Ámbar - Vista {index + 1}
                  </p>
                  <p className="text-xs text-white/80 mt-1">
                    Click para ampliar
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Location Section
  const renderLocationSection = () => {
    return (
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 text-sm font-medium mb-6">
              <MapPinIcon className="w-4 h-4 mr-2" />
              {t("developments.casaAmbar.privilegedLocation")}
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("developments.casaAmbar.heartExclusivity")}
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              {t("developments.casaAmbar.locatedInAmbar")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-w-16 aspect-h-9 lg:aspect-h-6">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1582.0544831671837!2d-99.30105010364589!3d19.421870601324372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d207c3186a53b1%3A0x12ef60d627df404e!2sReserva%20By%20Grupo%20Bosque%20Real!5e0!3m2!1ses-419!2smx!4v1756070333021!5m2!1ses-419!2smx"
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <div className="text-center">
              <div className="text-2xl mb-3">🌳</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("developments.casaAmbar.naturalEnvironment")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("developments.casaAmbar.naturalEnvironmentDesc")}
              </p>
            </div>

            <div className="text-center">
              <div className="text-2xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("developments.casaAmbar.security247")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("developments.casaAmbar.security247Desc")}
              </p>
            </div>

            <div className="text-center">
              <div className="text-2xl mb-3">🚗</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("developments.casaAmbar.connectivity")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("developments.casaAmbar.connectivityDesc")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Contact Section
  const renderContactSection = () => {
    return (
      <section
        id="contact-section"
        className="py-16 lg:py-20 bg-gradient-to-br from-emerald-900 to-green-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {t("developments.casaAmbar.yourNewHomeAwaits")}
            </h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              {t("developments.casaAmbar.schedulePersonalizedVisit")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 lg:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  {t("developments.casaAmbar.projectInformation")}
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex flex-col md:flex-row  items-center justify-between py-3 border-b border-white/20">
                    <span className="text-emerald-200">{t("developments.common.priceFrom")}:</span>
                    <span className="text-2xl font-bold">$19,750,000 MXN</span>
                  </div>

                  <div className="flex flex-col md:flex-row  items-center justify-between py-3 border-b border-white/20">
                    <span className="text-emerald-200">{t("developments.common.construction")}/{t("developments.common.lot")}:</span>
                    <span className="font-semibold">
                      {t("developments.casaAmbar.constructionDetails")}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row  items-center justify-between py-3 border-b border-white/20">
                    <span className="text-emerald-200">{t("developments.casaAmbar.delivery")}:</span>
                    <span className="font-semibold">
                      {t("developments.casaAmbar.deliveryDate")}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <ButtonPrimary
                    className="w-full py-4 text-lg bg-emerald-600 hover:bg-emerald-700 border-0"
                    onClick={() => window.open("tel:+525555555555", "_self")}
                  >
                    <span className="mr-2">Hablar con Niddia</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </ButtonPrimary>

                  <ButtonSecondary
                    className="w-full py-4 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                    onClick={() =>
                      window.open(
                        "https://wa.me/525513594601?text=Hola, me interesa Casa Ámbar",
                        "_blank"
                      )
                    }
                  >
                    WhatsApp
                  </ButtonSecondary>
                </div>
              </div>

              <div className="lg:pl-8">
                <Image
                  src="https://res.cloudinary.com/dwrtldhxd/image/upload/v1734498384/BosqueReal_wo13lr.png"
                  alt="Desarrollador Logo"
                  width={300}
                  height={150}
                  className="mx-auto mb-6 opacity-90"
                />

                <p className="text-emerald-100 text-center">
                  {t("developments.casaAmbar.developedByExperts")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Floating CTA Button
  const renderFloatingCTA = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed bottom-6 right-6 z-50 lg:hidden"
      >
        <ButtonPrimary
          onClick={handleContactClick}
          className="px-6 py-4 shadow-2xl bg-emerald-600 hover:bg-emerald-700 border-0"
        >
          <span className="mr-2">Contactar Niddia</span>
          <ArrowRightIcon className="w-4 h-4" />
        </ButtonPrimary>
      </motion.div>
    );
  };

  // Lightbox Modal Component
  const renderLightbox = () => {
    return (
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>

            {/* Image Counter */}
            {lightboxImages.length > 1 && (
              <div className="absolute top-4 left-4 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm">
                {lightboxCurrentIndex + 1} / {lightboxImages.length}
              </div>
            )}

            {/* Navigation Arrows */}
            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-white" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                >
                  <ChevronRightIcon className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Main Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Vista ampliada"
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm text-center">
              {lightboxImages.length > 1 ? (
                <span>Usa las flechas o teclas ← → para navegar • ESC para cerrar</span>
              ) : (
                <span>ESC para cerrar</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="nc-CasaAmbarLandingPage">
      {/* SEO Metadata is handled by layout.tsx */}

      {/* Zapier Chatbot Script */}
      <Script
        src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"
        strategy="afterInteractive"
        type="module"
      />

      {/* Hero Section */}
      {renderHeroSection()}

      {/* Description Section */}
      {renderDescriptionSection()}

      {/* Enhanced Levels Section */}
      {renderEnhancedLevelsSection()}

      {/* Features Section */}
      {renderFeaturesSection()}

      {/* Gallery Section */}
      {renderGallerySection()}

      {/* Location Section */}
      {renderLocationSection()}

      {/* Contact Section */}
      {renderContactSection()}

      {/* Floating CTA */}
      {/*renderFloatingCTA()*/}

      {/* Zapier Chatbot */}
      <zapier-interfaces-chatbot-embed
        is-popup="true"
        chatbot-id="cmakou6un00321208jg7ane35"
      ></zapier-interfaces-chatbot-embed>

      {/* Lightbox Modal */}
      {renderLightbox()}
    </div>
  );
};

export default CasaAmbarLandingPage;