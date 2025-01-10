import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1736500310/BR_RESERVA_VISTA_CALLE_1_qhdpdb.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1736500309/RESERVA_VISTA_CALLE_2_rpe6er.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1736500308/Reserva_3_onzetj.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1736500308/Reserva1_mlrvtg.jpg"
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
