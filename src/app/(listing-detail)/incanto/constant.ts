import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1746410621/t2tlzbxhdruzd85t1v14.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1746410620/tmsp4bf7gjttb2sqd1x2.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1746410620/e8petp2cacya0k3rwdy9.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1746410621/sogdcom8d2xr16rhpqo2.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1746410621/w9np9ku1pzkstd8xafxa.png",
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
