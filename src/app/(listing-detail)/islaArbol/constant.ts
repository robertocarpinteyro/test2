import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1734320770/Acceso_1_a_Lote_22_y_25_Clusters_Reserva_BR_19Jul24_def_etittq.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1734320769/Rotonda_Lote_22_y_25_Clusters_Reserva_BR_31Jul24_wgbn1a.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1734320769/Casas_Lote_22_y_25_Clusters_Reserva_BR_31Jul24_kllyf4.png",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1734320768/Vista_a%C3%A9rea_1_Lote_22_y_25_Clusters_Reserva_BR_5Ago24_def_w7y5yt.jpg",
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
