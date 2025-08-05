"use client";

import React, { FC, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRightIcon, HomeIcon, SparklesIcon, MapPinIcon, CameraIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PHOTOS } from "./constant";
import Script from "next/script";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'zapier-interfaces-chatbot-embed': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

// Metadata moved to layout.tsx

export interface CasaAmbarLandingPageProps {}

const CasaAmbarLandingPage: FC<CasaAmbarLandingPageProps> = ({}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedLevels, setExpandedLevels] = useState<{[key: string]: boolean}>({});

  const toggleLevel = (levelTitle: string) => {
    setExpandedLevels(prev => ({
      ...prev,
      [levelTitle]: !prev[levelTitle]
    }));
  };
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
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
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    scrollToSection('contact-section');
  };

  const handleGalleryClick = () => {
    scrollToSection('gallery-section');
  };

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
              <source src="https://res.cloudinary.com/dwrtldhxd/video/upload/v1753233777/Presentacionambar_p6nkjx.mp4" type="video/mp4" />
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
              Arquitectura que inspira. Diseño que abraza la luz.<br />
              <span className="text-emerald-300">Tu nuevo hogar en la reserva más exclusiva.</span>
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
                <span className="mr-2">Consultar con Nidda</span>
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
                <strong className="text-emerald-600 dark:text-emerald-400">Casa Ámbar</strong> ha sido concebida desde una visión de diseño contemporáneo que se destaca por su elegancia sobria y líneas arquitectónicas limpias. Su fachada conjuga materiales nobles, como piedra sinterizada y cristal, con una paleta cromática contrastante y una composición moderna que transmite exclusividad, equilibrio y estilo.
              </p>
              
              <p>
                Cada nivel ha sido concebido para brindar amplitud, confort y conexión con el exterior, integrando la luz natural como elemento protagonista. Más que una casa, es un espacio pensado para vivir con sofisticación, privacidad y armonía.
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
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">474m² + terraza</div>
                <div className="text-gray-600 dark:text-gray-400">Construcción</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">4</div>
                <div className="text-gray-600 dark:text-gray-400">Niveles de Diseño</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">2025</div>
                <div className="text-gray-600 dark:text-gray-400">Entrega Septiembre</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  // Level Distribution Section
  const renderLevelsSection = () => {
    const levels = [
      {
        title: "Nivel 01",
        icon: "🏛️",
        spaces: "Estudio 24m², Baño 5m², Sala 22m², Comedor 15m², Cocina 26m², Servicio 9m², Alacena 5m²",
        features: [
          "Vestíbulo exterior enmarcado por jardines con paisajismo de texturas y matrices de color",
          "Vestíbulo interior como hilo conductor para espectacular doble altura",
          "Sala comedor coronando el espacio con doble altura",
          "Cocina vanguardista con cuarzos Black Mirror y White Mirror de carácter atemporal",
          "Estudio de diseño contemporáneo con mobiliario empotrado y detalles decorativos",
          "Acceso independiente y baño completo que permite transformarlo en suite privada"
        ]
      },
      {
        title: "Nivel 02",
        icon: "🛏️",
        spaces: "Master Bedroom 25m², Baño 12m², Walking Closet 9m², Recamara 1: 21m², Baño 4m², Walking Closet 4m², Recamara 2: 21m², Baño 4m², Walking Closet 4m², Family Room 33m²",
        features: [
          "Amplio e iluminado Family Room como vestíbulo a las tres recámaras",
          "Cada recámara cuenta con baño privado, walking closet y terraza individual",
          "Terrazas que conectan los interiores con el paisaje de la zona",
          "Recámara principal con baño de diseño lineal",
          "Porcelánicos de gran formato y espectacular acento de granito Vía Láctea"
        ]
      },
      {
        title: "Nivel 03",
        icon: "🌅",
        spaces: "Terraza 64m², Gimnasio 28m², Baño 4m², Wellness Lounge 10m², ½ Baño 4m², Lavandería 8m²",
        features: [
          "Diseñado para potenciar el bienestar y la vida social",
          "Gimnasio con vistas al sur oriente, perfecto para recibir la luz matutina",
          "Wellness lounge con acceso directo a baño privado",
          "Dos terrazas independientes para ambiente social y rincón privado",
          "Puede adaptarse como suite adicional según necesidades de estilo de vida"
        ]
      },
      {
        title: "Sótano",
        icon: "🍷",
        spaces: "Cuarto de máquinas 11m², Cisterna 8m², Bodega 13m², Cava 9m², Área social 23m²",
        features: [
          "Dotando de exclusividad, privacidad y distinción",
          "Área de degustación y cava creando el ambiente ideal para el deleite",
          "Zona de resguardo con espacio versátil para almacenaje general"
        ]
      }
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
              Cada nivel ha sido cuidadosamente diseñado para ofrecer una experiencia única de confort y elegancia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {levels.map((level, index) => (
              <motion.div
                key={level.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-700 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <span className="text-4xl mr-4">{level.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{level.title}</h3>
                </div>
                
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg mb-6 overflow-hidden">
                  <button
                    onClick={() => toggleLevel(level.title)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">Espacios</h4>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Click para ver detalles</p>
                    </div>
                    {expandedLevels[level.title] ? (
                      <ChevronUpIcon className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
                    )}
                  </button>
                  
                  {expandedLevels[level.title] && (
                    <div className="p-4 pt-0 border-t border-emerald-200 dark:border-emerald-800">
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">{level.spaces}</p>
                    </div>
                  )}
                </div>
                
                <ul className="space-y-3">
                  {level.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
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
        description: "Acabados premium y arquitectura de vanguardia"
      },
      {
        icon: "🌳",
        title: "Carpintería en Nogal",
        description: "Maderas nobles que aportan calidez y elegancia"
      },
      {
        icon: "☀️",
        title: "Luz Natural",
        description: "Ventanales que inundan todos los niveles"
      },
      {
        icon: "🏡",
        title: "Áreas Sociales Amplias",
        description: "Espacios diseñados para el encuentro y la convivencia"
      },
      {
        icon: "🔧",
        title: "Espacios de Servicio",
        description: "Áreas independientes para máxima funcionalidad"
      },
      {
        icon: "🎯",
        title: "Ubicación Exclusiva",
        description: "En el corazón de la reserva más prestigiosa"
      }
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
              Cada detalle ha sido pensado para crear una experiencia de vida excepcional
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
      <section id="gallery-section" className="py-24 lg:py-32 bg-white dark:bg-neutral-900">
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
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className={`aspect-w-16 aspect-h-9 ${index === 0 ? 'md:aspect-h-16' : ''}`}>
                  <Image
                    src={photo}
                    alt={`Casa Ámbar ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">Casa Ámbar - Vista {index + 1}</p>
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
              Ubicada en el fraccionamiento Ambar dentro del Desarrollo Reserva Bosque Real, con 474 m² de construcción + terraza sobre un lote de 300 m².
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
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15050.221244418499!2d-99.2837492!3d19.4316105!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d20403fd02c0cd%3A0x7df6f5d84efc671e!2sSky%20View%20By%20Grupo%20Bosque%20Real!5e0!3m2!1ses!2smx!4v1733717378034!5m2!1ses!2smx"
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Entorno Natural</h3>
              <p className="text-gray-600 dark:text-gray-300">Rodeada de áreas verdes y naturaleza preservada</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Seguridad 24/7</h3>
              <p className="text-gray-600 dark:text-gray-300">Acceso controlado y vigilancia permanente</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-3">🚗</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Conectividad</h3>
              <p className="text-gray-600 dark:text-gray-300">Fácil acceso a principales vías de comunicación</p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Contact Section
  const renderContactSection = () => {
    return (
      <section id="contact-section" className="py-24 lg:py-32 bg-gradient-to-br from-emerald-900 to-green-900 text-white relative overflow-hidden">
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
              Agenda una visita personalizada y descubre por qué Casa Ámbar representa el futuro del lujo residencial
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
                <h3 className="text-2xl font-bold mb-6">Información del Proyecto</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-white/20">
                    <span className="text-emerald-200">Precio desde:</span>
                    <span className="text-2xl font-bold">$19,500,000 MXN</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-white/20">
                    <span className="text-emerald-200">Construcción/Lote:</span>
                    <span className="font-semibold">474 m² + terraza / 300 m²</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-white/20">
                    <span className="text-emerald-200">Entrega:</span>
                    <span className="font-semibold">Septiembre 2025 + 6 meses de gracia</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <ButtonPrimary
                    className="w-full py-4 text-lg bg-emerald-600 hover:bg-emerald-700 border-0"
                    onClick={() => window.open('tel:+525555555555', '_self')}
                  >
                    <span className="mr-2">Hablar con Nidda</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </ButtonPrimary>
                  
                  <ButtonSecondary
                    className="w-full py-4 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                    onClick={() => window.open('https://wa.me/525555555555?text=Hola, me interesa Casa Ámbar', '_blank')}
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
                  Desarrollado por expertos en construcción de lujo con más de 20 años de experiencia creando espacios excepcionales.
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
          <span className="mr-2">Contactar Nidda</span>
          <ArrowRightIcon className="w-4 h-4" />
        </ButtonPrimary>
      </motion.div>
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
      
      {/* Levels Section */}
      {renderLevelsSection()}
      
      {/* Features Section */}
      {renderFeaturesSection()}
      
      {/* Gallery Section */}
      {renderGallerySection()}
      
      {/* Location Section */}
      {renderLocationSection()}
      
      {/* Contact Section */}
      {renderContactSection()}
      
      {/* Floating CTA */}
      {renderFloatingCTA()}
      
      {/* Zapier Chatbot */}
      <zapier-interfaces-chatbot-embed 
        is-popup="true" 
        chatbot-id="cmakou6un00321208jg7ane35"
      ></zapier-interfaces-chatbot-embed>
    </div>
  );
};

export default CasaAmbarLandingPage;
