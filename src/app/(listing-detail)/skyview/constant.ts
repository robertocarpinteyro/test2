import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1730333999/2._Fachada_Sur_Elevada_akykfe.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1730333999/NW-ALBER_hrihg9.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1730334001/NW-CORRE_o6q81g.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1730333940/Oasis_shoot-54_reqjtk.jpg",
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
