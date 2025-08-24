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

  // Efecto para detectar cuando el chatbot de Zapier esté listo
  useEffect(() => {
    const checkChatbotReady = () => {
      const chatbot = document.querySelector('zapier-interfaces-chatbot-embed');
      if (chatbot) {
        console.log('✅ Chatbot de Zapier cargado correctamente');
      }
    };

    // Verificar inmediatamente
    checkChatbotReady();

    // Verificar después de un tiempo si no se encontró
    const timer = setTimeout(checkChatbotReady, 2000);

    return () => clearTimeout(timer);
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => {
    // Método oficial de Zapier para abrir el chatbot
    try {
      // Buscar el elemento del chatbot
      const chatbot = document.querySelector('zapier-interfaces-chatbot-embed') as any;
      
      if (chatbot) {
        // Método 1: Usar la función open() si existe
        if (typeof chatbot.open === 'function') {
          chatbot.open();
          return;
        }
        
        // Método 2: Disparar evento personalizado de Zapier
        const openEvent = new CustomEvent('zapier-chatbot-open', {
          bubbles: true,
          detail: { chatbotId: 'cmakou6un00321208jg7ane35' }
        });
        chatbot.dispatchEvent(openEvent);
        
        // Método 3: PostMessage con el formato oficial de Zapier
        window.postMessage({
          type: 'zapier-chatbot-open',
          chatbotId: 'cmakou6un00321208jg7ane35'
        }, '*');
        
        // Método 4: Intentar acceder al shadow DOM y hacer click en el botón
        setTimeout(() => {
          if (chatbot.shadowRoot) {
            const button = chatbot.shadowRoot.querySelector('button') || 
                          chatbot.shadowRoot.querySelector('[data-testid="chat-button"]') ||
                          chatbot.shadowRoot.querySelector('.chat-trigger');
            if (button) {
              (button as HTMLElement).click();
            }
          }
        }, 100);
        
      } else {
        // Fallback: scroll a la sección de contacto
        scrollToSection("contact-section");
      }
    } catch (error) {
      console.error('Error opening Zapier chatbot:', error);
      scrollToSection("contact-section");
    }
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
                Residencia Exclusiva
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
            >
              Casa Ámbar
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Arquitectura que inspira. Diseño que abraza la luz.
              <br />
              <span className="text-emerald-300">
                Tu nuevo hogar en la reserva más exclusiva.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <ButtonPrimary
                onClick={handleContactClick}
                className="px-8 py-4 text-lg bg-emerald-600 hover:bg-emerald-700 border-0 shadow-xl"
              >
                <span className="mr-2">Consultar con Niddia</span>
                <ArrowRightIcon className="w-5 h-5" />
              </ButtonPrimary>

              <ButtonSecondary
                onClick={handleGalleryClick}
                className="px-8 py-4 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              >
                <CameraIcon className="w-5 h-5 mr-2" />
                Ver Galería
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
          <p className="text-white/70 text-sm">Desliza para descubrir</p>
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
                Residencia de Lujo
              </span>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
                Una experiencia de vida única
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
                ha sido concebida desde una visión de diseño contemporáneo que
                se destaca por su elegancia sobria y líneas arquitectónicas
                limpias. Su fachada conjuga materiales nobles, como piedra
                sinterizada y cristal, con una paleta cromática contrastante y
                una composición moderna que transmite exclusividad, equilibrio y
                estilo.
              </p>

              <p>
                Cada nivel ha sido concebido para brindar amplitud, confort y
                conexión con el exterior, integrando la luz natural como
                elemento protagonista. Más que una casa, es un espacio pensado
                para vivir con sofisticación, privacidad y armonía.
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
                  474m² + terraza
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Construcción
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
                  Entrega Septiembre
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
        title: "Nivel 01",
        subtitle: "Área Social y de Servicios",
        icon: "🏛️",
        spaces:
          "Estudio 24m², Baño 5m², Sala 22m², Comedor 15m², Cocina 26m², Servicio 9m², Alacena 5m²",
        features: [
          "Vestíbulo exterior enmarcado por jardines con paisajismo de texturas y matrices de color",
          "Vestíbulo interior como hilo conductor para espectacular doble altura",
          "Sala comedor coronando el espacio con doble altura",
          "Cocina vanguardista con cuarzos Black Mirror y White Mirror de carácter atemporal",
          "Estudio de diseño contemporáneo con mobiliario empotrado y detalles decorativos",
          "Acceso independiente y baño completo que permite transformarlo en suite privada",
        ],
        photos: [
          "https://res.cloudinary.com/dwrtldhxd/image/upload/v1756071937/Cocina_vokbm5.jpg",
          "https://res.cloudinary.com/dwrtldhxd/image/upload/v1756071937/Jardin_bmckwm.jpg",
          "https://res.cloudinary.com/dwrtldhxd/image/upload/v1756072729/Sala_uqerwg.jpg",
        ],
        hasVirtualTour: true,
        virtualTourPath: "/recorrido/Primer Nivel/index.html",
      },
      {
        title: "Nivel 02",
        subtitle: "Área Privada de Descanso",
        icon: "🛏️",
        spaces:
          "Master Bedroom 25m², Baño 12m², Walking Closet 9m², Recamara 1: 21m², Baño 4m², Walking Closet 4m², Recamara 2: 21m², Baño 4m², Walking Closet 4m², Family Room 33m²",
        features: [
          "Amplio e iluminado Family Room como vestíbulo a las tres recámaras",
          "Cada recámara cuenta con baño privado, walking closet y terraza individual",
          "Terrazas que conectan los interiores con el paisaje de la zona",
          "Recámara principal con baño de diseño lineal",
          "Porcelánicos de gran formato y espectacular acento de granito Vía Láctea",
        ],
        photos: [],
        hasVirtualTour: false,
      },
      {
        title: "Nivel 03",
        subtitle: "Área de Bienestar y Entretenimiento",
        icon: "🌅",
        spaces:
          "Terraza 64m², Gimnasio 28m², Baño 4m², Wellness Lounge 10m², ½ Baño 4m², Lavandería 8m²",
        features: [
          "Diseñado para potenciar el bienestar y la vida social",
          "Gimnasio con vistas al sur oriente, perfecto para recibir la luz matutina",
          "Wellness lounge con acceso directo a baño privado",
          "Dos terrazas independientes para ambiente social y rincón privado",
          "Puede adaptarse como suite adicional según necesidades de estilo de vida",
        ],
        photos: [],
        hasVirtualTour: false,
      },
      {
        title: "Sótano",
        subtitle: "Área de Servicios y Cava",
        icon: "🍷",
        spaces:
          "Cuarto de máquinas 11m², Cisterna 8m², Bodega 13m², Cava 9m², Área social 23m²",
        features: [
          "Dotando de exclusividad, privacidad y distinción",
          "Área de degustación y cava creando el ambiente ideal para el deleite",
          "Zona de resguardo con espacio versátil para almacenaje general",
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
              Distribución por Niveles
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cada nivel ha sido cuidadosamente diseñado para ofrecer una
              experiencia única de confort y elegancia
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
                      Espacios y Dimensiones
                    </h4>
                    <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
                      {level.spaces}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Características Principales
                      </h4>
                      <ul className="space-y-3">
                        {level.features.slice(0, Math.ceil(level.features.length / 2)).map((feature, featureIndex) => (
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
                        Detalles de Diseño
                      </h4>
                      <ul className="space-y-3">
                        {level.features.slice(Math.ceil(level.features.length / 2)).map((feature, featureIndex) => (
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
                            Galería Fotográfica
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
                            Recorrido Virtual 360°
                          </h4>
                          <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800">
                            <div className="aspect-w-16 aspect-h-10">
                              <iframe
                                src={level.virtualTourPath}
                                className="w-full h-full border-0"
                                allowFullScreen
                                loading="lazy"
                                title={`Recorrido Virtual ${level.title}`}
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
                              Galería fotográfica y recorrido virtual próximamente disponibles
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
        title: "Diseño Contemporáneo",
        description: "Acabados premium y arquitectura de vanguardia",
      },
      {
        icon: "🌳",
        title: "Carpintería en Nogal",
        description: "Maderas nobles que aportan calidez y elegancia",
      },
      {
        icon: "☀️",
        title: "Luz Natural",
        description: "Ventanales que inundan todos los niveles",
      },
      {
        icon: "🏡",
        title: "Áreas Sociales Amplias",
        description: "Espacios diseñados para el encuentro y la convivencia",
      },
      {
        icon: "🔧",
        title: "Espacios de Servicio",
        description: "Áreas independientes para máxima funcionalidad",
      },
      {
        icon: "🎯",
        title: "Ubicación Exclusiva",
        description: "En el corazón de la reserva más prestigiosa",
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
              Características Destacadas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cada detalle ha sido pensado para crear una experiencia de vida
              excepcional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
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
              Galería Visual
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              "Donde el diseño encuentra la funcionalidad"
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
              Ubicación Privilegiada
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              En el Corazón de la Exclusividad
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Ubicada en el fraccionamiento Ambar dentro del Desarrollo Reserva
              Bosque Real, con 474 m² de construcción + terraza sobre un lote de
              300 m².
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
                Entorno Natural
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Rodeada de áreas verdes y naturaleza preservada
              </p>
            </div>

            <div className="text-center">
              <div className="text-2xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Seguridad 24/7
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Acceso controlado y vigilancia permanente
              </p>
            </div>

            <div className="text-center">
              <div className="text-2xl mb-3">🚗</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Conectividad
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fácil acceso a principales vías de comunicación
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
        className="py-24 lg:py-32 bg-gradient-to-br from-emerald-900 to-green-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Tu Nuevo Hogar Te Espera
            </h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Agenda una visita personalizada y descubre por qué Casa Ámbar
              representa el futuro del lujo residencial
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
                  Información del Proyecto
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-white/20">
                    <span className="text-emerald-200">Precio desde:</span>
                    <span className="text-2xl font-bold">$19,500,000 MXN</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/20">
                    <span className="text-emerald-200">Construcción/Lote:</span>
                    <span className="font-semibold">
                      474 m² + terraza / 300 m²
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/20">
                    <span className="text-emerald-200">Entrega:</span>
                    <span className="font-semibold">
                      Septiembre 2025 + 6 meses de gracia
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <ButtonPrimary
                    className="w-full py-4 text-lg bg-emerald-600 hover:bg-emerald-700 border-0"
                    onClick={() => openZapierChatWithMessage("Me interesa Casa Ámbar, quiero más información")}
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
                  src="https://res.cloudinary.com/dwrtldhxd/image/upload/v1734541698/LEANBIMHsm_cvudos.png"
                  alt="Desarrollador Logo"
                  width={300}
                  height={150}
                  className="mx-auto mb-6 opacity-90"
                />

                <p className="text-emerald-100 text-center">
                  Desarrollado por expertos en construcción de lujo con más de
                  20 años de experiencia creando espacios excepcionales.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
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
