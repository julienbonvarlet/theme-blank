<template>
  <ul v-if="items?.length" class="f-small-reassurance" :class="{ 'is-align': isAlign }">
    <li v-for="item in items" :key="item">
      <img v-if="item.image" :src="item.image" :alt="item.text" />
      <FAIcon v-if="item.icon" :icon="item.icon" />
      <FAText :text="item.text" size="s" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps<{
  items: Array;
  isAlign?: boolean;
}>();
</script>

<style lang="scss">
.f-small-reassurance {
  display: flex;
  flex-direction: column;
  gap: var(--f-length-1);
  --width: calc(var(--f-text-m-font-size) * 1.2);

  &.is-align {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    li {
      flex-direction: column;
      justify-content: center;
    }
  }

  li {
    display: flex;
    align-items: center;
    gap: var(--f-length-2);
  }

  .f-icon {
    font-size: var(--width);
  }

  img {
    width: var(--width);
    height: auto;
  }
}
</style>
