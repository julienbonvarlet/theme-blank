<template>
  <FMSectionContainer
    v-if="product"
    :padding-x="true"
    max-width="xl"
    class="f-product-presentation"
    class-child="f-product-presentation__container"
  >
    <FMProductGallery v-if="photos?.length" :photos="photos" />

    <div class="f-product-presentation__detail">
      <FMProductHeading :product="product" :price="price" />

      <FMProductForm
        :product="product"
        @on-choice-change="(x) => emit('onChoiceChange', x)"
      />

      <FMSmallReassurance v-bind="data.reassurance" />

      <div class="f-product-presentation__collapses">
        <FMCollapse
          v-if="product.description?.length"
          :title="$t('pages.product.description')"
          :content="product.description"
        />
        <FMCollapse
          v-if="product.composition?.length"
          :title="$t('pages.product.composition')"
          :content="product.composition"
        />
        <FMCollapse
          :title="$t('pages.product.shipping_return_title')"
          :content="$t('pages.product.shipping_return_text')"
        />
      </div>
    </div>
  </FMSectionContainer>
</template>

<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  product: object;
  choice: object;
}>();

const photos = computed(() => props.choice?.photos);
const price = computed(() => props.choice?.price);

const emit = defineEmits(["onChoiceChange"]);

const data = {
  reassurance: {
    items: [
      {
        icon: "shipping",
        text: t("pages.product.reinsurance.1"),
      },
      {
        icon: "time",
        text: t("pages.product.reinsurance.2"),
      },
      {
        icon: "gift-card",
        text: t("pages.product.reinsurance.3"),
      },
    ],
  },
};
</script>

<style lang="scss">
.f-product-presentation {
  margin-bottom: var(--f-margin-section);

  &__container {
    display: flex;
    align-items: flex-start;
    gap: var(--f-length-5);

    @include media("<=tablet") {
      flex-direction: column;
      gap: var(--f-length-3);
    }
  }

  &__detail {
    flex-shrink: 0;
    width: 100%;

    @include media(">tablet") {
      width: 33%;
      min-width: 350px;
      position: sticky;
      top: var(--f-header-height);
    }
  }

  .f-product-gallery {
    flex-grow: 1;

    @include media("<=tablet") {
      width: calc(100% + (var(--f-margin-page) * 2));
      margin-left: calc(0px - var(--f-margin-page));
    }
  }

  .f-small-reassurance {
    margin: var(--f-length-4) 0 var(--f-length-2);

    @include media("<=tablet") {
      position: sticky;
      bottom: 0;
      padding-bottom: var(--f-length-1);
      background-color: #fff;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: var(--f-length-1);
      align-items: start;
    }
  }

  .f-button {
    @include media("<=tablet") {
      position: sticky;
      bottom: var(--f-length-10);
    }
  }
}
</style>
