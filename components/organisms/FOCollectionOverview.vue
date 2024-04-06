<template>
  <FMSectionContainer :padding-x="false" max-width="xl" :padding-y="false">
    <div class="f-collection-overview">
      <div v-for="(block, i) in blocks" :key="i" class="f-collection-overview__block">
        <img class="f-collection-overview__img" :src="block.image" :alt="block.title.text" />
        <NuxtLink :to="block.title.link">
          <FATitle tag="h2" size="m" class="f-collection-overview__title" :title="block.title.text">
            {{ block.title.text }}
          </FATitle>
        </NuxtLink>
        <div class="f-collection-overview__links">
          <FALink v-for="link in block.links" :key="link" v-bind="link" :is-active="false" />
        </div>
      </div>
    </div>
  </FMSectionContainer>
</template>

<script setup lang="ts">
interface Block {
  image: string;
  title: { text: string; link: string };
  links: Array;
}

const props = defineProps<{
  blocks: Block[];
}>();
</script>

<style lang="scss">
.f-collection-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));

  @include media("<tablet") {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  &__block {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    position: relative;
    padding: var(--f-length-4);
    min-height: 75vh;
    color: var(--f-collection-overview-color);

    @include media("<tablet") {
      min-height: 25vh;
      justify-content: center;
      align-items: center;
    }
  }

  &__img {
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    z-index: var(--z-index-below);
    background-color: var(--f-collection-overview-background);
  }

  &__links {
    margin-top: var(--f-length-2);

    @include media("<tablet") {
      display: none;
    }
  }
}
</style>
