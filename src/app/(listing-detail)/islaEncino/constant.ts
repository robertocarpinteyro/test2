import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1736497566/Acceso_Lote_11_Clusters_REserva_BR_7Ago24_a_def_qj6bxx.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1736497567/Vista_a%C3%A9rea_2_Lote_11_Clusters_REserva_BR_9Ago24_def_rus6qj.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/f_auto,q_20/v1736497566/Casas_Lote_11_Clusters_Reserva_BR_2Ago24_def_pvledy.jpg"
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
