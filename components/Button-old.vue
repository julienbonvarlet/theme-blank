<template>
  <button class="btn btn-primary" v-bind="attrs">
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

const props = defineProps({
  label: String,
});

const label = props.label;
const attrs = useAttrs();
</script>

<style scoped lang="scss">
.btn {
  padding: 16px 24px;
  border-radius: 99px;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  text-decoration: none;

  &-full {
    width: 100%;
  }

  &-primary {
    background: #000;
    border-color: #000;
    color: #fff;

    &:hover {
      background: #454545;
      border-color: #454545;
    }
  }
  &-secondary {
    background: transparent;
    border-color: #000;
    color: #000;

    &:hover {
      background: #000;
      border-color: #000;
      color: #fff;
    }
  }
}
</style>
