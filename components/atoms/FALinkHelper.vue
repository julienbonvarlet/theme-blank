<template>
  <component :is="tag" :to="to" class="f-link-helper">
    <FAText :text="text" size="s" />
  </component>
</template>

<script lang="ts" setup>
const props = defineProps<{
  to?: string;
  text: string;
}>();

let NuxtLink;
try {
  NuxtLink = resolveComponent("NuxtLink");
} catch (error) {
  NuxtLink = "a";
}

const tag = computed(() => (props.to ? NuxtLink : "button"));
</script>

<style lang="scss">
.f-link-helper {
  color: var(--f-color-text-grey);
  text-decoration: underline;
  cursor: pointer;
  transition: color ease 0.2s;

  &:hover {
    color: var(--f-color-text-dark);
  }
}
</style>
