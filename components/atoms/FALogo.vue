<template>
  <svg
    class="f-logo"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="169.263"
    height="22"
    viewBox="0 0 169.263 22"
  >
    <title><slot>{{ seoTitle }}</slot></title>
    <g style="isolation: isolate">
      <path
        d="M3.317,0H0V21.5H3.317V12.409H15.84V9.092H3.317V3.339H20.032V.021H3.317Z"
        transform="translate(0 0)"
      ></path>
      <path
        d="M152.756,12.908h0c0,1.436-.012,5.774-9.042,5.774s-9.042-4.338-9.042-5.774h0V0h-3.317V12.908c0,6.636,5.536,9.092,12.359,9.092s12.356-2.456,12.359-9.092h0V0h-3.317Z"
        transform="translate(-65.798 0)"
      ></path>
      <path
        d="M299.009,0V9.092h0v3.317h0V21.5h20.032V18.183H302.327V12.409h12.52V9.092h-12.52V3.317h16.715V0H299.009Z"
        transform="translate(-149.779 0)"
      ></path>
      <path
        d="M225.929,12.008,215.434,0h-3.317V21.5h3.317V5.041l10.495,12.008L236.423,5.041V21.5h3.317V0h-3.317Z"
        transform="translate(-106.254 0)"
      ></path>
      <path
        d="M71.856,0H68.165L57.672,21.5h3.691l2.818-5.774H76.006L78.824,21.5h3.691L72.022,0ZM65.8,12.409l4.293-8.8,4.293,8.8Z"
        transform="translate(-28.889 0)"
      ></path>
    </g>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  seoTitle?: string;
}>();
</script>

<style lang="scss">
.f-logo {
  height: var(--logo-sm-height);
  width: auto;

  @include media(">=tablet", "<desktop") {
    height: var(--logo-md-height);
  }

  @include media(">=desktop") {
    height: var(--logo-lg-height);
  }
}
</style>
