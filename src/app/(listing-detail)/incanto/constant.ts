import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1746410768/Incanto/wfvmctkumrisp46om7zw.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1746410768/Incanto/pmswxmu3voatbweme2h9.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1746410768/Incanto/j3vbu9hda7bzbwd2tduo.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1746410767/Incanto/zql51mxtsdwninngf97d.jpg",
  "https://res.cloudinary.com/dwrtldhxd/image/upload/v1746410767/Incanto/oj0ikdmxeagoyp4evaws.png",
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
