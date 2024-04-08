import type { MenuConfig, MenuVisual } from "~/types/types";

export const womenSizeCollections: MenuVisual[] = [
  { label: "menu.femme.xxs", to: "/collections/femme---xxs", image: "https://www.fromfuture.com/cdn/shop/files/2402WPV01196-8010-13_1500x.jpg?v=1708352242" },
  { label: "menu.femme.xs", to: "/collections/femme---xs", image: "https://www.fromfuture.com/cdn/shop/files/2402WPV01196-8010-14_1500x.jpg?v=1708352242" },
  { label: "menu.femme.s", to: "/collections/femme---s", image: "https://www.fromfuture.com/cdn/shop/files/2402WPR01666-1500-13_700x.jpg?v=1708350795" },
  { label: "menu.femme.m", to: "/collections/femme---m", image: "https://www.fromfuture.com/cdn/shop/files/2402WPV01196-8010-22_0d15baf5-ffbb-4019-9c94-7bdfc8d263f2_1500x.jpg?v=1711447232" },
  { label: "menu.femme.l", to: "/collections/femme---l", image: "https://www.fromfuture.com/cdn/shop/files/2402WPV01196-8010-12_1500x.jpg?v=1708352236" },
  { label: "menu.femme.xl", to: "/collections/femme---xl", image: "https://www.fromfuture.com/cdn/shop/files/2402WPV01196-8010-11_1500x.jpg?v=1708352236" },
];
export const womenTypeCollections: MenuVisual[] = [
  { label: "menu.femme.robes", to: "/collections/femme---robes", image: "" },
  { label: "menu.femme.mailles", to: "/collections/femme---mailles", image: "" },
  { label: "menu.femme.vestes-manteaux", to: "/collections/femme---vestes-&-manteaux", image: "" },
  { label: "menu.femme.sweatshirts", to: "/collections/femme---sweatshirts", image: "" },
  { label: "menu.femme.chemises-blouses", to: "/collections/femme---chemises-&-blouses", image: "" },
  { label: "menu.femme.top-t-shirts", to: "/collections/femme---top-&-t-shirts", image: "" },
  { label: "menu.femme.jeans-pantalons", to: "/collections/femme---jeans-&-pantalons", image: "" },
  { label: "menu.femme.jupes", to: "/collections/femme---jupes", image: "" },
  { label: "menu.femme.chaussures", to: "/collections/femme---chaussures", image: "" },
];
export const womenSpecialCollections: MenuVisual[] = [{ label: "menu.femme.news", to: "/collections/femme---nouveautés", image: "" }];

export const menSizeCollections: MenuVisual[] = [
  { label: "menu.homme.xs", to: "/collections/homme---xs", image: "" },
  { label: "menu.homme.s", to: "/collections/homme---s", image: "" },
  { label: "menu.homme.m", to: "/collections/homme---m", image: "" },
  { label: "menu.homme.l", to: "/collections/homme---l", image: "" },
  { label: "menu.homme.xl", to: "/collections/homme---xl", image: "" },
];
export const menTypeCollections: MenuVisual[] = [
  { label: "menu.homme.t-shirts-polos", to: "/collections/homme---t-shirts-&-polos", image: "" },
  { label: "menu.homme.mailles", to: "/collections/homme---mailles", image: "" },
  { label: "menu.homme.vestes-manteaux", to: "/collections/homme---vestes-&-manteaux", image: "" },
  { label: "menu.homme.sweatshirts", to: "/collections/homme---sweatshirts", image: "" },
  { label: "menu.homme.chemises", to: "/collections/homme---chemises", image: "" },
  { label: "menu.homme.jeans-pantalons", to: "/collections/homme---jeans-&-pantalons", image: "" },
  { label: "menu.homme.shorts", to: "/collections/homme---shorts", image: "" },
  { label: "menu.homme.chaussures", to: "/collections/homme---chaussures", image: "" },
];
export const menSpecialCollections: MenuVisual[] = [{ label: "menu.homme.news", to: "/collections/homme---nouveautés", image: "" }];

const menu: MenuConfig[] = [
  {
    label: "menu.femme.femme",
    to: "/collections/femme",
    columns: [
      {
        label: "menu.sizes",
        items: womenSizeCollections,
      },
      {
        label: "menu.categories",
        items: womenTypeCollections,
      },
      {
        label: "menu.selections",
        items: womenSpecialCollections,
      },
    ],
  },
  {
    label: "menu.homme.homme",
    to: "/collections/homme",
    columns: [
      {
        label: "menu.sizes",
        items: menSizeCollections,
      },
      {
        label: "menu.categories",
        items: menTypeCollections,
      },
      {
        label: "menu.selections",
        items: menSpecialCollections,
      },
    ],
  },
  {
    label: "menu.concept",
    to: "/concept",
  },
  {
    label: "menu.sell",
    to: "/sell",
    visuals: [
      {
        label: "menu.sell",
        to: "/sell",
        image: "https://demo.faume.co/cdn/shop/collections/23Q2-BAGGYJEANS-STORIES-BAGGYJEANS-09-SPLIT-RIGHT-Desktop.webp?v=1696288181",
      },
      {
        label: "menu.sell_online",
        to: "/sell/online",
        image: "https://demo.faume.co/cdn/shop/collections/23Q2-BAGGYJEANS-STORIES-BAGGYJEANS-09-SPLIT-RIGHT-Desktop.webp?v=1696288181",
      },
      {
        label: "menu.sell_store",
        to: "/sell/store",
        image: "https://demo.faume.co/cdn/shop/collections/23Q2-BAGGYJEANS-STORIES-BAGGYJEANS-09-SPLIT-RIGHT-Desktop.webp?v=1696288181",
      },
      {
        label: "menu.trade_in",
        to: "/trade-in/customer/Step1",
        image: "https://demo.faume.co/cdn/shop/collections/23Q2-BAGGYJEANS-STORIES-BAGGYJEANS-09-SPLIT-RIGHT-Desktop.webp?v=1696288181",
      },
      {
        label: "menu.store_locator",
        to: "/sell/store-locator",
        image: "https://demo.faume.co/cdn/shop/collections/23Q2-BAGGYJEANS-STORIES-BAGGYJEANS-09-SPLIT-RIGHT-Desktop.webp?v=1696288181",
      },
    ],
  },
];

export default menu;
