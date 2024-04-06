import type { RouteLocationRaw } from "vue-router";

export type ApiResponse = {
  "@id": String;
  "@type": String;
  "@context": String;
  "hydra:member": Array<Object>;
  "hydra:totalItems": Number;
  "hydra:view": {
    "hydra:first": String;
    "hydra:last": String;
    "hydra:previous"?: String;
    "hydra:next"?: String;
  };
  "hydra:search"?: Object;
  "hydra:facets"?: Object;
};

export type Pagination = {
  totalItems: Number;
  firstPage: String;
  lastPage: String;
  previousPage?: String;
  nextPage?: String;
};

export type ApiItem<Item> = {};

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
  name: String;
  params?: {
    id: String;
  };
};
