<template>
  <FMTimeline :steps="steps" size="m" />
</template>

<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  resale: object;
}>();

const steps = computed(() => {
  const resale = props.resale;
  return [
    {
      title: t("trade_in.customer_final.steps.1.title"),
      text: t("trade_in.customer_final.steps.1.text"),
      image: "https://cdn-icons-png.flaticon.com/128/869/869129.png",
    },
    {
      title: t("trade_in.customer_final.steps.2.title"),
      text: t("trade_in.customer_final.steps.2.text"),
      image: "https://cdn-icons-png.flaticon.com/128/3188/3188047.png",
      button: {
        label: t("trade_in.customer_final.steps.2.button"),
        icon: "download",
        to: resale.transfertVoucher,
      },
    },
    {
      title: t("trade_in.customer_final.steps.3.title"),
      text: t("trade_in.customer_final.steps.3.text"),
      image: "https://cdn-icons-png.flaticon.com/128/679/679720.png",
      button: {
        label: t("trade_in.customer_final.steps.3.button"),
        icon: "download",
        to: resale.shippingVoucher,
      },
    },
    {
      title: t("trade_in.customer_final.steps.4.title"),
      text: t("trade_in.customer_final.steps.4.text"),
      image: "https://cdn-icons-png.flaticon.com/128/2512/2512050.png",
    },
  ];
});
</script>
