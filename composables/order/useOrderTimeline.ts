import { computed } from "vue";
import { usePriceFormatter } from "../usePriceFormatter";
import { useOrderDetails } from "./useOrderDetails";

const pushInTimeline = (
  icon: string,
  title: string,
  text?: string,
  description?: string | null,
) => ({
  icon,
  title,
  text,
  description,
});

export function useOrderTimeline(order: any, wording: any) {
  const { createdDate } = useOrderDetails(order, wording);
  const { formatPrice } = usePriceFormatter();
  const isPaid = computed(() => !!order?.stateContext?.payment_intent?.created);

  const timeline = computed(() => {
    if (!order) {
      return [];
    }

    const timeline = [];
    timeline.push(
      pushInTimeline("cart", wording.order_created, createdDate.value),
    );
    if (order.preparedAt) {
      timeline.push(
        pushInTimeline("time", wording.states.treating, order.preparedAt),
      );
    } else if (order.state === "paid" && !order.sentAt) {
      timeline.push(
        pushInTimeline("time", wording.states.treating, createdDate.value),
      );
    }
    if (order.sentAt) {
      const description = order.shippingTrackingNumber
        ? `${order.shippingMode} - ${order.shippingTrackingNumber}`
        : null;
      timeline.push(
        pushInTimeline(
          "shipping",
          wording.states.shipped,
          order.sentAt,
          description,
        ),
      );
    }
    if (order.receivedAt) {
      timeline.push(
        pushInTimeline("check", wording.states.delivered, order.receivedAt),
      );
    }
    if (order.returnCreatedAt) {
      timeline.push(
        pushInTimeline(
          "shipping",
          wording.states.return_created,
          order.returnCreatedAt,
        ),
      );
    }
    if (order.returnTreatedAt) {
      timeline.push(
        pushInTimeline(
          "check",
          wording.states.return_treated,
          order.returnTreatedAt,
        ),
      );
    }
    if (order.returnRefundedAt) {
      timeline.push(
        pushInTimeline(
          "wallet",
          wording.states.refunded,
          order.returnRefundedAt,
        ),
      );
    }
    if (!isPaid.value || order.state === "draft") {
      timeline.push(
        pushInTimeline(
          "time",
          wording.states.requires_payment_method,
          formatPrice(order.total),
        ),
      );
    }
    return timeline;
  });

  return timeline;
}
