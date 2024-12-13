import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [

  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730564740/Captura_de_pantalla_2024-11-02_a_la_s_10.23.18_a.m._u3ek6x.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730244674/Oasis_shoot-89_zbric4.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730244673/Oasis_shoot-85_jndncd.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730244672/Oasis_shoot-90_ycnyqu.jpg"
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
