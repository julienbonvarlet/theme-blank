<template>
  <ul v-if="steps?.length" class="f-steps-menu">
    <li v-for="step in steps" :key="step" class="f-steps-menu__item" :class="{ 'is-active': route.name === step.to.name }">
      <NuxtLink :to="step.to">
        <FAText class="f-steps-menu__nb" size="m" weight="bold">{{ step.number }}</FAText>
        <FAText v-if="step.title" class="f-steps-menu__text" size="s">{{ step.title }}</FAText>
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const route = useRoute();

interface Step {
  title?: string;
  number: number;
}

const props = defineProps<{
  steps: Step[];
}>();
</script>

<style lang="scss">
.f-steps-menu {
  display: flex;
  justify-content: center;
  width: fit-content;
  margin-right: auto;
  margin-left: auto;
  user-select: none;
  --width: 40px;
  --border-width: 2px;
  --selected-background: var(--button-primary-background);
  --selected-color: var(--button-primary-color);
  --background: var(--f-color-text-grey);
  --color: var(--f-color-text-light);
  --gap: var(--f-length-4);
  $self: &;
  margin-bottom: var(--f-length-6);

  @include media("<=tablet") {
    margin-bottom: var(--f-length-2);
  }

  &__item {
    position: relative;
    padding: 0 calc(var(--gap) / 2);

    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &:before,
    &:after {
      content: "";
      height: var(--border-width);
      width: 50%;
      position: absolute;
      z-index: var(--z-index-default);
      top: calc((var(--width) / 2) - (var(--border-width) / 2));
      display: block;
      background-color: var(--selected-background);
    }

    &:before {
      left: 0;
    }

    &::after {
      right: 0;
    }

    &:last-of-type:after,
    &:first-of-type:before {
      display: none;
    }

    &:first-of-type {
      padding-left: 0;
    }

    &:last-of-type {
      padding-right: 0;
    }

    &.is-active {
      & ~ #{$self}__item {
        &:before,
        &:after {
          background-color: var(--background);
        }

        #{$self}__nb {
          background-color: var(--background);
          color: var(--color);
          outline-color: var(--background);
        }
      }
    }
  }

  &__nb {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--width);
    height: var(--width);
    border-radius: 50%;
    background-color: var(--selected-background);
    color: var(--selected-color);
    border: solid 3px var(--f-color-background-very-light);
    outline: solid var(--border-width) var(--selected-background);
    position: relative;
    z-index: var(--z-index-above);
  }

  &__text {
    margin-top: var(--f-length-1);
  }
}
</style>
