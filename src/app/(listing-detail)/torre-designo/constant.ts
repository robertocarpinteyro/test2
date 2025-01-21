import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1733729598/Torre_Designo_9_mxglbl.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1733729599/Torre_Designo_6_ya6xrz.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1733729597/Torre_Designo_3_cbkybt.jpg",
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
