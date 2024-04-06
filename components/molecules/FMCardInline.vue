<template>
  <component :is="tag" :to="to" v-bind="attrs" class="f-card-inline" :class="[backgroundClass, linkClass]">
    <div v-if="image" class="f-card-inline__image">
      <img :src="image" :alt="title" />
    </div>
    <FMCardText v-bind="cardTextData">
      <slot />
    </FMCardText>
    <FATagStatus v-if="statusText" v-bind="statusData" />
    <FMPriceContainer v-bind="priceContainerData" />
    <slot name="right" />
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    image?: string;
    title?: string;
    titleTag?: string;
    text?: string;
    description?: string;
    details?: string;
    price?: number;
    originalPrice?: number;
    displayOldPrice?: boolean;
    statusValue?: string;
    statusText?: string;
    to?: string;
    hasBackground?: boolean;
  }>(),
  {
    displayOldPrice: true,
  },
);

const statusData = computed(() => ({
  value: props.statusValue,
  text: props.statusText,
}));

const cardTextData = computed(() => ({
  title: props.title,
  titleTag: props.titleTag,
  text: props.text,
  description: props.description,
  details: props.details,
}));

const priceContainerData = computed(() => ({
  price: props.price,
  originalPrice: props.originalPrice,
  displayOldPrice: props.displayOldPrice,
}));

let NuxtLink;
try {
  NuxtLink = resolveComponent("NuxtLink");
} catch (error) {
  NuxtLink = "a";
}
const tag = computed(() => (props.to ? NuxtLink : "div"));
const backgroundClass = computed(() => (props.hasBackground ? "has-background" : null));
const linkClass = computed(() => (props.to ? "is-link" : null));

const attrs = useAttrs();
</script>

<style lang="scss">
.f-card-inline {
  display: flex;
  gap: var(--f-length-2);
  align-items: center;
  text-align: left;

  &.is-link {
    position: relative;
    z-index: var(--z-index-above);
    cursor: pointer;
    user-select: none;
    transition:
      transform ease 0.3s,
      box-shadow ease 0.3s;

    &:hover {
      --x: 5px;
      box-shadow: calc(0px - var(--x)) var(--x) 5px 0 rgba(0, 0, 0, 0.1);
      transform: translate(var(--x), calc(0px - var(--x)));
    }
  }

  &.has-background {
    background-color: var(--f-color-background-light);
    padding: var(--f-length-2);
  }

  &__image {
    width: var(--f-length-11);
    aspect-ratio: 0.8;
    flex-shrink: 0;
    position: relative;

    &::after {
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
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }

  .f-card-text {
    align-self: center;
  }

  .f-tag-status {
    margin-left: auto;
  }

  .f-price-container {
    min-width: 100px;
    justify-content: flex-end;
  }
}
</style>
