const { formatDate, toUnixTimestamp } = useDateFormatter();

export function useOrderDetails(order: any, wording: any) {
  const title = computed(() => wording.title?.replace("{id}", order.reference));

  const createdDate = computed(() => {
    if (order.createdAt) {
      return formatDate(order.createdAt);
    }
    const date = order.stateContext?.payment_intent?.created;
    return date ? toUnixTimestamp(date) : null;
  });

  const articlesCount = computed(() =>
    wording[
      order.items?.length > 1 ? "articles_count" : "article_count"
    ]?.replace("{count}", order.items?.length || 0),
  );

  return { title, createdDate, articlesCount };
}
