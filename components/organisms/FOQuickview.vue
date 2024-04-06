<template>
  <FMPopin
    v-if="product"
    class="f-quickview"
    position="right"
    :visible="true"
    @on-close="close"
  >
    <template #bottom>
      <div class="f-quickview__container">
        <div class="f-quickview__product-images">
          <div v-for="photo in photos" :key="photo" class="f-quickview__images">
            <img :src="photo" />
          </div>
        </div>
        <div class="f-quickview__presentation">
          <div class="f-quickview__presentation-sticky">
            <div class="f-quickview__presentation-content">
              <FMProductHeading :product="product" :price="price" />
              <FMProductForm
                :product="product"
                @on-choice-change="updateChoice"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </FMPopin>
</template>

<script lang="ts" setup>
const cartStore = useCartStore();

const props = defineProps<{
  product: object;
}>();

const emit = defineEmits(["onClose"]);
const choice = ref(props.product.choices[0]);

const photos = computed(() => choice?.value?.photos);
const price = computed(() => choice?.value?.price);
const isMiniCartOpen = computed(() => cartStore.isMiniCartOpen);

const updateChoice = (value) => {
  choice.value = value;
};

watch(isMiniCartOpen, (isOpen) => {
  if (isOpen) {
    close();
  }
});

const close = () => {
  emit("onClose");
};
</script>

<style lang="scss">
.f-quickview {
  &.f-popin {
    @include media("<=tablet") {
      align-items: flex-end;
    }

    &.is-right .f-popin__inner {
      max-width: var(--max-width-m);
      position: relative;

      @include media("<=tablet") {
        width: 100%;
        max-width: 100%;
        max-height: calc(100% - var(--f-length-2));
        overflow-y: auto;
      }
    }

    .f-popin__heading {
      padding: var(--f-length-2) var(--f-length-2) 0 0;
      position: fixed;
      top: 0;
      right: 0;
      width: fit-content;
      left: auto;
      background-color: transparent;
    }
  }

  &__container {
    @include media(">tablet") {
      flex-wrap: nowrap;
      justify-content: space-between;
    }
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__product-images {
    display: flex;
    flex: 0 1 50%;
    flex-direction: column;
    flex-wrap: nowrap;
    position: relative;
    width: 100%;

    @include media("<tablet") {
      flex: 1 1 100%;
      flex-direction: row;
      flex-wrap: nowrap;
      flex-shrink: 0;
      overflow-y: hidden;
      white-space: nowrap;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      width: 100%;
      gap: var(--f-length-1);
    }
  }
  &__images {
    position: relative;
    width: 100%;
    @include media("<tablet") {
      scroll-snap-align: center;
    }

    img {
      width: 100%;
      height: auto;
      @include media("<tablet") {
        width: 300px;
      }
    }
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
      background: radial-gradient(
        circle,
        transparent,
        transparent,
        var(--f-color-background-light)
      );
    }
  }

  &__presentation {
    position: relative;
    display: flex;
    flex: 1 0 400px;
    flex-direction: column;
    padding: var(--f-length-4);
    @include media("<tablet") {
      flex: 1 1 100%;
      padding: var(--f-length-4);
    }
  }

  &__presentation-sticky {
    position: sticky;
    display: flex;
    top: var(--f-length-4);
    flex-wrap: wrap;
    height: 90vh;
    @include media("<tablet") {
      height: auto;
    }
  }
  &__presentation-content {
    margin: auto;
    width: 100%;
    @include media("<tablet") {
      margin: 0;
    }
  }
  .f-button.is-primary {
    width: 100%;
  }
}
</style>
