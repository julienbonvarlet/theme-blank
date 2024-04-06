<template>
  <svg
    class="f-loader"
    :class="[sizeClass]"
    xmlns="http://www.w3.org/2000/svg"
    xml:space="preserve"
    viewBox="0 0 100 100"
  >
    <g>
      <path
        fill="currentColor"
        d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </g>
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: (typeof LoaderSizes)[string];
  }>(),
  {
    size: "m",
  }
);

const sizeClass = computed(() => `is-${props.size}`);
</script>

<style lang="scss">
.f-loader {
  color: inherit;

  &.is-s {
    width: var(--loader-s-size);
    height: var(--loader-s-size);
  }

  &.is-m {
    width: var(--loader-m-size);
    height: var(--loader-m-size);
  }

  &.is-l {
    width: var(--loader-l-size);
    height: var(--loader-l-size);
  }

  g {
    transform: scale(1.8);
    transform-origin: center;
  }
}
</style>
