export function useOrderTables(order: any, wording: any) {
  const { formatPrice } = usePriceFormatter();
  const { createdDate } = useOrderDetails(order, wording);

  const pushInTable = (title: string, value: string) => ({
    title,
    value,
  });

  const informationTable = computed(() => {
    if (!order) {
      return [];
    }
    const data = [];
    data.push(pushInTable(wording.reference, order.reference));
    data.push(pushInTable(wording.order_date, createdDate.value));
    data.push(
      pushInTable(
        wording[order.items?.length > 1 ? "articles_count" : "article_count"].replace(
          "{count}",
          order.items?.length || 0,
        ),
        formatPrice(order.total),
      ),
    );
    if (order.shippingMode) {
      data.push(pushInTable(wording.shipping_method, order.shippingMode));
    }
    if (order.trackingNumber) {
      data.push(pushInTable(wording.tracking_number, order.trackingNumber));
    }
    return data;
  });

  const paymentTable = computed(() => {
    if (!order) {
      return [];
    }
    const data = [];
    data.push(pushInTable(wording.subtotal, formatPrice(order.itemsTotal)));
    data.push(pushInTable(wording.shipping, formatPrice(order.shippingTotal || 0)));
    if (order.discountTotal) {
      data.push(pushInTable(wording.discount, formatPrice(order.discountTotal)));
    }
    if (order.promotionalCode) {
      data.push(pushInTable(wording.promotional_code, order.promotionalCode));
    }
    if (order.refundedPrice) {
      data.push(pushInTable(wording.states.refunded, "-" + formatPrice(order.refundedPrice)));
    }
    data.push(pushInTable(wording.total, formatPrice(order.total)));
    return data;
  });

  return {
    informationTable,
    paymentTable,
  };
}
