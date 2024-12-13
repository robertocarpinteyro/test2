import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730560916/Captura_de_pantalla_2024-11-02_a_la_s_9.19.53_a.m._yuq9kf.png",

  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730560914/Captura_de_pantalla_2024-11-02_a_la_s_9.21.39_a.m._jaoxxx.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730335290/Living_room_19_ajxp3n.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730335287/Living_room_17_ailj5q.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730335289/Living_room_7_adj3tq.jpg",
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
