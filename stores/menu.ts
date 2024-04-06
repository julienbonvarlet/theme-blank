const getLinkTo = (link) => {
  const { pageSlug, collectionSlug } = link;
  if (pageSlug) return { name: pageSlug };
  if (collectionSlug)
    return { name: "collection", params: { id: collectionSlug } };
  return null;
};

const getLinks = (link) => {
  if (!link?.columns?.length) return null;
  const links = [];
  link.columns.forEach((column) => {
    links.push({
      title: column.title,
      links: column.collectionSlugs.map((slug) => ({
        slug: slug,
        to: { name: "collection", params: { id: slug } },
      })),
    });
  });
  return links;
};

const getVisuals = (link) => {
  if (!link?.visuals?.length) return null;
  const visuals = [];
  link.visuals.forEach((visual) => {
    visuals.push({
      slug: visual.pageSlug,
      image: visual.image,
    });
  });
  return visuals;
};

export const useMenuStore = defineStore("menu", () => {
  const config = useRuntimeConfig();
  const menuConfig = config.public.faume.menuConfig;
  const { getCollectionTitle } = useCollectionsStore();
  const { t } = useI18n();

  const getMenu = () => {
    if (!menuConfig?.length) return [];
    const menu = [];
    menuConfig.forEach((link) => {
      menu.push({
        slug: link.collectionSlug || link.pageSlug,
        to: getLinkTo(link),
        links: getLinks(link),
        visuals: getVisuals(link),
      });
    });
    return menu;
  };

  const menu = getMenu();

  const getLinkTitle = (link) => {
    const { title, slug } = link;
    if (title) return t(title);
    return (getCollectionTitle(slug) || t(slug))?.split(" - ").pop();
  };

  return {
    menu,
    getLinkTitle,
  };
});
