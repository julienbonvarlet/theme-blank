<template>
  <div v-if="link1?.url || link2?.url || hasSlot" class="f-cta-container">
    <FAButton
      v-if="link1?.url && link1.title?.length && isButton"
      :to="link1.url"
      :type="link1.type"
      :label="link1.title"
      :icon="link1.icon"
    />
    <FALink
      v-if="link1?.url && !isButton"
      :to="link1.url"
      :text="link1.title"
    />
    <FAButton
      v-if="link2?.url && link2?.title?.length && isButton"
      :to="link2.url"
      :type="link2.type"
      :label="link2.title"
      :icon="link2.icon"
    />
    <FALink
      v-if="link2?.url && !isButton"
      :to="link2.url"
      :text="link2.title"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    link1?: Record<string, any>;
    link2?: Record<string, any>;
    ctaAppearance?: "button" | "link";
  }>(),
  {
    link1: () => ({}),
    link2: () => ({}),
    ctaAppearance: "button",
  },
);

const isButton = computed(() => props.ctaAppearance === "button");
const slots = useSlots();
const hasSlot = computed(() => !!slots.default);
</script>

<style lang="scss">
.f-cta-container {
  display: flex;
  width: fit-content;
  flex-wrap: wrap;
  gap: var(--f-length-2);

  @include media(">desktop") {
    gap: 30px;
  }
}
</style>
