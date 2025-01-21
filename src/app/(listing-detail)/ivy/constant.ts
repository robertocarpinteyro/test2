import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1730333999/2._Fachada_Sur_Elevada_akykfe.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1730552860/Captura_de_pantalla_2024-11-02_a_la_s_7.06.17_a.m._g3zxtw.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1730552857/Captura_de_pantalla_2024-11-02_a_la_s_7.06.28_a.m._fbvuou.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1730234645/DSC00333_jdjuva.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1730234642/DSC00243_wd4upj.jpg"
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
