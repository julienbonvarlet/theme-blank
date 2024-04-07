import type { RouteLocationRaw } from "vue-router";

export type ApiResponse = {
  "@id": string;
  "@type": string;
  "@context": string;
  "hydra:member": Array<Object>;
  "hydra:totalItems": Number;
  "hydra:view": {
    "hydra:first": string;
    "hydra:last": string;
    "hydra:previous"?: string;
    "hydra:next"?: string;
  };
  "hydra:search"?: Object;
  "hydra:facets"?: Object;
};

export type Pagination = {
  totalItems: Number;
  firstPage: string;
  lastPage: string;
  previousPage?: string;
  nextPage?: string;
};

export type ApiItem = {};

export type ApiCollection<Item> = {
  items: Item[];
  pagination: Pagination;
  isError: boolean;
};

export type MenuColumn = {
  label: string;
  items: {
    label: string;
    to: RouteLocationRaw;
  }[];
};

export type MenuVisual = {
  label: string;
  to: RouteLocationRaw;
  image: string;
};

export type MenuConfig = {
  label: string;
  to: RouteLocationRaw;
  columns?: MenuColumn[];
  visuals?: MenuVisual[];
};

export type LinkTo = {
  name: string;
  params?: {
    id: string;
  };
};

export type Carousel = {
  title: string;
  collections: MenuVisual[];
};
