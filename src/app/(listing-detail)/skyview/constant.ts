import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [

  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730560279/Captura_de_pantalla_2024-11-02_a_la_s_9.10.30_a.m._i6xwqi.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730334001/NW-CORRE_o6q81g.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730334000/SKYV-juniors_4_snp6vx.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730333999/NW-ALBER_hrihg9.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730333999/2._Fachada_Sur_Elevada_akykfe.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730333939/Oasis_shoot-51_p6vhxr.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730333940/Oasis_shoot-54_reqjtk.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730333938/Oasis_shoot-53_hllpa0.jpg",
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
