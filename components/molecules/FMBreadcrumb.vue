<template>
  <FMSectionContainer :padding-x="true" max-width="xl" class-child="f-breadcrumb__inner">
    <FABack v-if="isMobile" @click.prevent="goBack" />

    <div v-else class="f-breadcrumb__desktop">
      <NuxtLink to="/">
        <FAText size="s">Accueil</FAText>
      </NuxtLink>
      <FAIcon :icon="IconNames.Right" />

      <template v-if="currentPageType === 'product'">
        <FAText size="s" @click="goBack">{{ previousPageTitle }}</FAText>
        <FAIcon :icon="IconNames.Right" />
      </template>
      <FAText size="s" class="f-breadcrumb__current">
        <slot>{{ currentPageTitle }}</slot>
      </FAText>
    </div>
  </FMSectionContainer>
</template>

<script setup lang="ts">
import { IconNames } from "~/types/enums";

const props = defineProps<{
  currentPageType: string;
  currentPageTitle?: string;
  previousPageTitle?: string;
}>();

const isMobile = ref(false);

const updateIsMobile = () => {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
};

onMounted(() => {
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});

const goBack = () => {
  if (props.previousPageTitle) {
    const path = `/collections/${encodeURIComponent(props.previousPageTitle)}`;
    navigateTo(path);
  } else {
    navigateTo("/");
  }
};
</script>

<style lang="scss">
.f-breadcrumb__desktop {
  display: flex;
  align-items: center;
  gap: var(--f-length-1);
  padding: var(--f-length-2) 0;
}
.f-breadcrumb__inner {
  position: relative;
  $self: &;

  .f-text:not(#{$self}__current) {
    cursor: pointer;
  }

  .f-icon {
    font-size: var(--f-text-s-font-size);
  }

  &__current {
    color: var(--f-color-text-grey);
  }
}
</style>
