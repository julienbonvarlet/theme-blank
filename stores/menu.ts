import faumeConfig from "~/faumeConfig";
import type { MenuConfig } from "~/types/types";
import type { LinkTo, MenuItem, MenuLink, MenuVisual } from "~/types/types";

const getLinkTo = (link: MenuConfig) => {
  const { pageSlug, collectionSlug } = link;
  if (pageSlug) {
    return { name: pageSlug };
  }
  if (collectionSlug) {
    return { name: "collections", params: { id: collectionSlug } };
  }
  return null;
};

const getLinks = (link: MenuConfig) => {
  if (!link?.columns?.length) {
    return null;
  }
  const links: MenuLink[] = [];
  link.columns.forEach((column) => {
    links.push({
      title: column.title,
      links: column.collectionSlugs.map((slug) => ({
        slug,
        to: { name: "collections", params: { id: slug } },
      })),
    });
  });
  return links;
};

const getVisuals = (link: MenuConfig) => {
  if (!link?.visuals?.length) {
    return null;
  }
  const visuals: MenuVisual[] = [];
  link.visuals.forEach((visual) => {
    visuals.push({
      pageSlug: visual.pageSlug,
      image: visual.image,
    });
  });

  return visuals;
};

export const useMenuStore = defineStore("menu", () => {
  return {
    menu: () => {
      if (!faumeConfig.menu.length) {
        return [];
      }
      
      return faumeConfig.menu;
    },
  };
});
