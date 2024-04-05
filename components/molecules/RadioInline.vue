<template>
  <li class="f-radio-inline">
    <div class="f-radio-inline__main-content">
      <FACheckbox :radio="true" :checked="checked" />
      <div class="f-radio-inline__infos">
        <FAText size="m" :text="title" />
      </div>
      <FAPrice v-if="price > 0" size="m" :price="price" />
      <FAText v-else-if="price === 0" size="m" :text="$t('global.free')" />
      <FAIcon v-if="icon" :icon="icon" :filled="true" />
    </div>
    <slot />
  </li>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  price?: number;
  icon?: string;
  checked?: boolean;
}>();
</script>

<style lang="scss">
.f-radio-inline {
  margin-bottom: var(--f-length-3);

  &__main-content {
    display: flex;
    align-items: center;
    cursor: pointer;

    & + * {
      margin: var(--f-length-3) 0;
    }
  }

  &__infos {
    margin: 0 auto 0 var(--f-length-1);
  }

  &:not(:first-child) {
    margin-top: var(--f-length-2);
    padding-top: var(--f-length-2);
    border-top: solid 1px var(--f-color-border);
  }

  .nuxt-icon svg {
    width: auto;
    font-size: 22px;
  }
}
</style>
