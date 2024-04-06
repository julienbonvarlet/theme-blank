<template>
  <div class="f-timeline-step" :class="[sizeClass]">
    <div class="f-timeline-step__icon">
      <FAIcon v-if="icon" :icon="icon" />
      <img v-else-if="image" :src="image" :alt="title" />
    </div>
    <div class="f-timeline-step__text">
      <FMCardText
        :title="title"
        :text="text"
        :description="description"
        :details="details"
      />
      <FAButton
        v-if="button?.label"
        size="s"
        :label="button.label"
        :to="button.to"
        :icon="button.icon"
      />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    text?: string;
    description?: string;
    details?: string;
    icon?: (typeof IconNames)[string];
    image?: string;
    size: "s" | "m";
    button?: object;
  }>(),
  {
    size: "s",
  },
);

const sizeClass = computed(() => `is-${props.size}`);
</script>

<style lang="scss">
.f-timeline-step {
  display: flex;
  gap: var(--timeline-step-gap);
  position: relative;
  z-index: var(--z-index-default);
  --width: var(--timeline-step-s-cicle-width);
  --icon: var(--timeline-step-s-icon-width);
  text-align: left;
  $self: &;

  &:before {
    content: "";
    display: block;
    width: var(--timeline-line-width);
    background: var(--timeline-line-color);
    position: absolute;
    z-index: var(--z-index-below);
    left: calc(var(--width) / 2);
    transform: translateX(-50%);
    top: 5px;
    height: 100%;
  }

  &__icon {
    width: var(--width);
    height: var(--width);
    border-radius: 50%;
    border: var(--timeline-step-circle-border);
    background: var(--timeline-step-circle-background);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--icon);
    position: relative;
    z-index: var(--z-index-default);

    img {
      width: 70%;
      height: 70%;
      object-fit: contain;
    }
  }

  .f-button {
    gap: var(--f-length-2);
    margin: 0;
  }

  &:last-of-type::before {
    display: none;
  }

  &:not(:last-of-type) {
    padding-bottom: var(--timeline-s-gap);
  }

  &.is-m {
    --width: var(--timeline-step-m-cicle-width);
    --icon: var(--timeline-step-m-icon-width);

    &:not(:last-of-type) {
      padding-bottom: var(--timeline-m-gap);
    }

    #{$self}__text {
      padding-top: calc(var(--width) * 0.2);
    }

    #{$self}__icon {
      img {
        width: 50%;
        height: 50%;
      }
    }
  }

  &__text {
    & > *:not(:last-child) {
      margin-bottom: var(--f-length-1);
    }

    ul {
      list-style-type: disc;
      list-style-position: inside;
    }

    a:not(.f-button) {
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
