import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1734547781/Pininfarina_Torre_Designo_Facada_C_E01_xpq3iq.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1734547783/PININFARINA_GRADAS_9_kh8zes.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1734547781/CINE_PININFARINA_sovjzm.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1734547782/PININFARINA_GRADAS_3_d8ygzp.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1734547782/DESIGNO_COMEDOR__ct4htf.png",
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
