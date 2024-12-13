import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730332935/WhatsApp_Image_2022-04-06_at_3.11.23_PM_8_axw26n.jpg",

  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730332934/PHOTO-2022-04-29-15-42-06_13_oypcyt.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730332935/WhatsApp_Image_2022-04-06_at_3.11.23_PM_10_xg7mdm.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1730332935/WhatsApp_Image_2022-04-06_at_3.11.23_PM_2_p6mler.jpg",
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
