import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1734317953/Casas_Lote_Ensue%C3%B1o_Clusters_Reserva_BR_2Ago24_baja_srqv68.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1734317953/Acceso_lote_Ensue%C3%B1o_Clusters_Reserva_BR_19Jul24_baja_rifpzb.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1734317953/Vista_a%C3%A9rea_1_Lote_Ensue%C3%B1o_Clusters_Reserva_BR_19Ago24_baja_kznqnr.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1734317953/Rotonda_Lote_Ensue%C3%B1o_Clusters_Reserva_BR_2Ago24_baja_axccpu.jpg",
];

export const Amenities_demos = [
  { name: "SPA", icon: "la-spa" },

  { name: "Alberca", icon: "la-swimming-pool" },
];

export const imageGallery: ListingGalleryImage[] = [...PHOTOS].map(
  (item, index): ListingGalleryImage => {
    return {
      id: index,
      url: item,
    };
  }
);
