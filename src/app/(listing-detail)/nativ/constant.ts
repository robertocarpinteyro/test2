import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730557378/Captura_de_pantalla_2024-11-02_a_la_s_8.19.12_a.m._wdqfcd.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730333561/04_Contrapicada_def_300dpis_bkzykp.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730333561/Lobby_300dpis_bbsyuu.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730333559/Cigar_room_300dpis_medo0p.jpg"

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
