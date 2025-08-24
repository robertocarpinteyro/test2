import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1756072005/Gimnasio_01_PTe_ds6bl6.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1756072008/Cocina_01_PT_ejojal.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1756072007/Estudio_01_PT_sta3cj.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1756072009/Estancia_01_PT_avgukn.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1733728097/IMG-20240401-WA0004_kuloa5.jpg"
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
