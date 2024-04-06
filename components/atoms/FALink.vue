<template>
  <component
    :is="tag"
    v-bind="attrs"
    :target="target"
    :to="to"
    class="f-link"
    :class="[underlineClass, sizeClass]"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string;
    isActive?: boolean;
    to?: string | object;
    size?: "s" | "m";
    target?: string;
  }>(),
  {
    isActive: true,
    size: "m",
  }
);

let NuxtLink;
try {
  NuxtLink = resolveComponent("NuxtLink");
} catch (error) {
  NuxtLink = "a";
}

const attrs = useAttrs();
const underlineClass = computed(() => (props.isActive ? "is-active" : ""));
const sizeClass = computed(() => `is-${props.size}`);
const tag = computed(() => (props.to ? NuxtLink : "button"));
</script>

<style lang="scss">
.f-link {
  font-family: var(--link-font-family);
  text-transform: var(--link-text-transform);
  font-weight: var(--link-font-weight);
  font-size: var(--link-font-size);
  letter-spacing: var(--link-letter-spacing);
  line-height: 1.2;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  min-height: 30px;
  display: flex;
  align-items: center;

  @include hover {
    text-decoration: underline;
  }

  &.is-active {
    text-decoration: underline;

    @include hover {
      text-decoration: none;
    }
  }

  &.is-s {
    font-size: var(--f-text-s-font-size);
    text-transform: none;
  }
}
</style>
