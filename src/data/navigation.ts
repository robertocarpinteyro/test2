import { MegamenuItem, NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import { Route } from "@/routers/types";
import __megamenu from "./jsons/__megamenu.json";

const megaMenuDemo: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Company",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.Company,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "App Name",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.AppName,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "City",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.City,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Contruction",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.Contruction,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Country",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.Country,
    })),
  },
];

const demoChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Propiedades Bosque Real",
  },
  {
    id: ncNanoId(),
    href: "/home-2",
    name: "Portal inmobiliario",
    isNew: true,
  },
  // Removed Home 3 reference
];

const otherPageChildMenus: NavItemType[] = [
  { id: ncNanoId(), href: "/blog", name: "Blog page" },
  { id: ncNanoId(), href: "/blog/single" as Route, name: "Blog single" },
  { id: ncNanoId(), href: "/about", name: "About" },
  { id: ncNanoId(), href: "/contact", name: "Contact us" },
  { id: ncNanoId(), href: "/login", name: "Login" },
  { id: ncNanoId(), href: "/signup", name: "Signup" },
];

const templatesChildrenMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/add-listing/1" as Route,
    name: "Add listing",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/add-listing/1" as Route,
        name: "Add listing 1",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/2" as Route,
        name: "Add listing 2",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/3" as Route,
        name: "Add listing 3",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/4" as Route,
        name: "Add listing 4",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/5" as Route,
        name: "Add listing 5",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/6" as Route,
        name: "Add listing 6",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/7" as Route,
        name: "Add listing 7",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/8" as Route,
        name: "Add listing 8",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/9" as Route,
        name: "Add listing 9",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/10" as Route,
        name: "Add listing 10",
      },
    ],
  },
  //
  { id: ncNanoId(), href: "/checkout", name: "Checkout" },
  { id: ncNanoId(), href: "/pay-done", name: "Pay done" },
  //
  { id: ncNanoId(), href: "/author", name: "Author page" },
  { id: ncNanoId(), href: "/account", name: "Account page" },
  //
  {
    id: ncNanoId(),
    href: "/subscription",
    name: "Subscription",
  },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    type: "dropdown",
    children: demoChildMenus,
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Five columns",
    type: "megaMenu",
    megaMenu: megaMenuDemo,
  },
  {
    id: ncNanoId(),
    href: "/listing-stay",
    name: "Listing Page",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/listing-stay",
        name: "Stay listings",
        type: "dropdown",
        children: [
          { id: ncNanoId(), href: "/listing-stay", name: "Stay page" },
          {
            id: ncNanoId(),
            href: "/listing-stay-map",
            name: "Stay page (map)",
          },
          { id: ncNanoId(), href: "/skyview", name: "Stay Detail" },
        ],
      },

      // Removed Experiences, Cars, Real Estate, and Flights listings since they were deleted from the project
    ],
  },
  {
    id: ncNanoId(),
    href: "/author",
    name: "Templates",
    type: "dropdown",
    children: templatesChildrenMenus,
  },

  {
    id: ncNanoId(),
    href: "/blog",
    name: "Other pages",
    type: "dropdown",
    children: otherPageChildMenus,
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    type: "dropdown",
    children: demoChildMenus,
    isNew: true,
  },

  //
  {
    id: ncNanoId(),
    href: "/listing-stay",
    name: "Listing pages",
    children: [
      { id: ncNanoId(), href: "/listing-stay", name: "Stay listings" },
      {
        id: ncNanoId(),
        href: "/listing-stay-map",
        name: "Stay listings (map)",
      },
      { id: ncNanoId(), href: "/skyview", name: "Stay detail" },

      // Removed Experiences listings
    ],
  },
  // Removed Cars listing page since it was deleted from the project

  //
  {
    id: ncNanoId(),
    href: "/author",
    name: "Templates",
    type: "dropdown",
    children: templatesChildrenMenus,
  },

  //
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Other pages",
    type: "dropdown",
    children: otherPageChildMenus,
  },
];
