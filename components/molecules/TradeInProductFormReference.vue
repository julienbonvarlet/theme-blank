<template>
  <FMTradeInStep
    class="f-ti-product-form-ref"
    :title="$t('trade_in.add_product.sku.title')"
    :subtitle="$t('trade_in.add_product.sku.text')"
  >
    <div class="f-ti-product-form-ref__input">
      <FALink
        class="f-ti-product-form-ref__help"
        size="s"
        :text="$t('trade_in.add_product.sku.help.title')"
        @click.prevent="displayPopin = true"
      />
      <FormKit
        v-model="model"
        type="text"
        name="ref"
        :label="$t('trade_in.add_product.sku.label')"
        :placeholder="$t('trade_in.add_product.sku.placeholder')"
        :errors="isInvalidSku ? [$t('trade_in.add_product.sku.error')] : []"
      />
      <ul
        v-if="
          sku &&
          skuSuggestions &&
          skuSuggestions.length > 0 &&
          skuSuggestions.some((item) => item !== model)
        "
        class="f-ti-product-form-ref__autocompletion"
      >
        <li
          v-for="item in skuSuggestions"
          :key="item"
          @click.prevent="
            model = item;
            emit('next');
          "
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <FAButton
      v-if="model && model !== ''"
      :is-disabled="!isValidSku"
      :is-loading="!skuSuggestions"
      :label="$t('trade_in.add_product.button_continue')"
      @click.prevent="emit('next')"
    />
  </FMTradeInStep>
  <FMPopin
    :visible="displayPopin"
    :title="$t('trade_in.add_product.sku.help.title')"
    :text="$t('trade_in.add_product.sku.help.text')"
    class="f-ti-product-form-ref__popin"
    @on-close="displayPopin = false"
  >
    <FMCarousel>
      <FAImage v-for="img in refImages" :key="img" :src="img" />
    </FMCarousel>
    <FAButton
      :label="$t('trade_in.add_product.button_continue')"
      @click.prevent="displayPopin = false"
    />
  </FMPopin>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useTradeInModule } from "../../stores/tradeInModule";

const emit = defineEmits(["next"]);
const tradeInModule = useTradeInModule();

const displayPopin = ref(false);
const isValidSku = computed(() => tradeInModule.isValidSku);
const isInvalidSku = computed(() => tradeInModule.isInvalidSku);
const skuSuggestions = computed(() => tradeInModule.skuSuggestions);
const sku = computed(() => tradeInModule.article.sku);

const refImages = [
  "https://demo.faume.co/cdn/shop/files/IMG_9480_1_800x_bc2dda8f-2e1f-4717-a938-d8052a7630e5.jpg?v=1694053959",
  "https://demo.faume.co/cdn/shop/files/etiquette_g-star_800x_c65647c5-7bb7-43c3-9168-e5756b50cf01.webp?v=1694053960",
];

const model = computed({
  get: () => sku.value,
  set: (value) => {
    tradeInModule.setSku(value);
    tradeInModule.getSku();
  },
});

onMounted(() => {
  if (sku.value) {
    tradeInModule.getSku();
  }
});
</script>

<style lang="scss">
.f-ti-product-form-ref {
  &__autocompletion {
    max-width: var(--max-width-m);
    margin: 0 auto;
    font-size: var(--f-text-xs-font-size);
    display: flex;
    flex-wrap: wrap;
    gap: var(--f-length-1);
    justify-content: center;

    li {
      padding: var(--f-length-1) var(--f-length-2);
      text-align: center;
      border: var(--fk-border);
      border-radius: var(--fk-border-radius);
      cursor: pointer;
      transition: ease 0.2s;

      &:hover {
        box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.1);
        transform: translate(2px, -2px);
      }
    }
  }

  &__help {
    text-align: center;
    width: 100%;
    justify-content: center;
  }

  &__popin {
    .f-carousel {
      --items-visible: 2;
    }
  }
}
</style>
