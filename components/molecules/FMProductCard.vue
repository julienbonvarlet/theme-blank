<template>
  <NuxtLink :to="`/products/${product.id}`" class="f-product-card" @click="handleClick">
    <div class="f-product-card__visual">
      <FADiscountTag
        class="f-product-card__discount"
        :original-price="product.originPrice"
        :sale-price="product.minPrice"
      />

      <div class="f-product-card__images">
        <img :src="product.frontPhoto" :alt="`${product.title}`" />
        <img v-if="product.backPhoto" :src="product.backPhoto" :alt="`${product.title}`" />
      </div>

      <FAButtonIcon class="f-product-card__quickview" icon="cart" @click.prevent="handleQuickViewClick" />
    </div>

    <div class="f-product-card__content">
      <FMCardText :title="product.title" :price="product.minPrice" :original-price="product.originPrice" />
      <div class="f-product-card__sizes">
        <FAFieldBox v-for="size in sizesFields" :key="size" v-bind="size" />
      </div>
    </div>
  </NuxtLink>

  <FOQuickview v-if="isQuickViewVisible" :product="product" @on-close="isQuickViewVisible = false" />
</template>

<script setup lang="ts">
const props = defineProps<{
  product: ArticleArticleRead;
}>();

const cartStore = useCartStore();

const isQuickViewVisible = ref(false);

function handleQuickViewClick(event: MouseEvent) {
  event.stopPropagation();
  isQuickViewVisible.value = true;
}

const handleAddToCart = (product: ArticleArticleRead) => {
  cartStore.addToCart(product);
  cartStore.toggleMiniCart(true);
  console.log("Product added to cart:", product);
};

const sizesFields = computed(() =>
  props.product?.size?.length
    ? [...props.product.size]
        .sort((a, b) => a - b)
        .map((s) => ({
          label: s,
          value: s,
          name: `size-${props.product.id}`,
        }))
    : [],
);

const emit = defineEmits(["card-click"]);

function handleClick() {
  emit("card-click");
}
</script>

<style lang="scss">
.f-product-card {
  display: block;
  --position: var(--f-length-1);

  &__visual {
    position: relative;
  }

  &__images {
    position: relative;
    aspect-ratio: var(--f-product-image-ratio);
    z-index: var(--z-index-default);

    &:after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      mix-blend-mode: multiply;
      z-index: calc(var(--z-index-above) + 1);
      background: radial-gradient(circle, transparent, transparent, var(--f-color-background-light));
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: relative;
      z-index: var(--z-index-below);

      &:nth-of-type(2) {
        opacity: 0;
        transition: opacity ease-in-out 0.2s;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    &:hover {
      img:nth-of-type(2) {
        opacity: 1;
      }
    }
  }

  &__quickview {
    position: absolute;
    right: var(--position);
    bottom: var(--position);
    z-index: var(--z-index-above);
  }

  &__discount {
    position: absolute;
    top: var(--position);
    left: var(--position);
    z-index: var(--z-index-above);
  }

  &__sizes {
    display: flex;
    flex-wrap: wrap;
    gap: var(--f-length-1);
    margin-top: var(--f-length-1);
  }

  &__content {
    padding-top: var(--f-length-2);
  }
}
</style>
