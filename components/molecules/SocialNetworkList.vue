<template>
  <ul class="f-social-network-list">
    <li v-for="item in items" :key="item">
      <NuxtLink class="f-social-network-list__link" :to="item.url">
        <FAIcon class="f-social-network-list__icon" :icon="item.icon" />
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    items?: any[];
  }>(),
  {
    items: () => [],
  },
);
</script>

<style lang="scss">
.f-social-network-list {
  $self: &;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--social-network-gap);
  color: var(--social-network-color);
  list-style: none;
  padding: 0;

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--social-nerwork-background-border-radius);
    width: var(--social-nerwork-background-size);
    height: var(--social-nerwork-background-size);
    background-color: var(--social-network-background-color);
    color: inherit;

    &:hover .#{self}__icon {
      svg {
        transform: scale(1.1);
      }
    }
  }

  &__icon {
    width: var(--social-network-icon-size);
    height: var(--social-network-icon-size);
    transition: transform ease 0.2s;
  }
}
</style>
