const pushInTimeline = (icon: string, title: string, text?: string, description?: string | null) => ({
  icon,
  title,
  text,
  description,
});

export function useTradeInTimeline(tradeIn: {}, wording: {}) {
  const { formatDate } = useDateFormatter();
  const { formatPrice } = usePriceFormatter();

  const timeline = computed(() => {
    if (!tradeIn) {
      return [];
    }

    const timeline = [];
    const priceEstimated = tradeIn?.items?.reduce((total, item) => total + item.priceResale, 0) || tradeIn.price || 0;
    const priceCredited = tradeIn?.items?.reduce((total, item) => total + item.priceCredit, 0) || tradeIn.price || 0;
    const priceEstimatedFormatted = formatPrice(priceEstimated);
    const priceCreditedFormatted = formatPrice(priceCredited);

    timeline.push(pushInTimeline("cart", wording.trade_in_created, formatDate(tradeIn.createdAt)));

    if (tradeIn.state === "draft") {
      timeline.push(pushInTimeline("time", wording.waiting_for_validation, wording.finalize_form));
    } else if (!tradeIn.sentAt && !tradeIn.receivedAt) {
      timeline.push(pushInTimeline("shipping", wording.waiting_for_send, wording.send_to_receive.replace("{amount}", priceEstimatedFormatted)));
    }

    if (tradeIn.sentAt) {
      timeline.push(pushInTimeline("shipping", wording.sent, tradeIn.sentAt));
    }

    if (tradeIn.receivedAt) {
      timeline.push(pushInTimeline("check", wording.shipped, tradeIn.receivedAt));
      timeline.push(pushInTimeline("time", wording.waiting_for_review, tradeIn.receivedAt, wording.expert_analysing));
    }

    if (tradeIn.controlledAt) {
      timeline.push(pushInTimeline("search", wording.controlled, tradeIn.controlledAt));
    }

    if (tradeIn.creditedAt) {
      timeline.push(pushInTimeline("wallet", wording.credited, tradeIn.creditedAt, wording.wallet_credited_of.replace("{amount}", priceCreditedFormatted || priceEstimatedFormatted)));
    }

    return timeline;
  });

  return timeline;
}
