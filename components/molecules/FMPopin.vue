<template>
  <Teleport to="body">
    <div v-if="isVisible" class="f-popin" :class="[positionClass, extraClass]" v-bind="attrs" @click.self.prevent="close">
      <div class="f-popin__inner">
        <div class="f-popin__heading">
          <slot name="heading" />
          <FATitle v-if="title" size="s">{{ title }}</FATitle>
          <button class="f-popin__close" @click.prevent="close">
            <FAIcon :icon="IconNames.Cross" />
          </button>
        </div>
        <div v-if="text || $slots.default" class="f-popin__content">
          <FAText v-if="text" :text="text" />
          <slot />
        </div>
        <slot name="bottom" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { IconNames } from "~/types/enums";

const emit = defineEmits(["onClose"]);

const props = withDefaults(
  defineProps<{
    title?: string;
    text?: string;
    position?: "left" | "top" | "center" | "right" | "bottom";
    visible?: boolean;
    extraClass?: string;
  }>(),
  {
    position: "center",
  },
);

const attrs = useAttrs();

const isVisible = ref(props.visible);

const updateBodyOverflow = (hidden: boolean = true) => {
  if (hidden) {
    document.body.classList.add("is-popin-open");
  } else {
    document.body.classList.remove("is-popin-open");
  }
};

const close = () => {
  isVisible.value = false;
  emit("onClose");
  updateBodyOverflow(false);
};

watch(
  () => props.visible,
  (newValue) => {
    isVisible.value = newValue;
    updateBodyOverflow(props.visible);
  },
);

const positionClass = computed(() => `is-${props.position}`);

onMounted(() => {
  if (props.visible) {
    updateBodyOverflow(true);
  }
});
onUnmounted(() => updateBodyOverflow(false));
</script>

<style lang="scss">
.f-popin {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: var(--z-index-popin);
  background-color: var(--f-popin-background);
  display: flex;
  $self: &;

  &__inner {
    background-color: var(--f-color-background-very-light);
    max-height: 100%;
    overflow-y: auto;
  }

  &__content,
  &__heading {
    padding: var(--f-popin-padding-y) var(--f-popin-padding-x);
  }

  &__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: var(--f-length-3);
    padding-top: 0;
  }

  &__heading {
    position: sticky;
    z-index: var(--z-index-above);
    top: 0;
    left: 0;
    background-color: var(--f-color-background-very-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--f-length-2);
  }

  &.is-center {
    align-items: center;
    justify-content: center;
    text-align: center;

    #{$self}__heading {
      flex-direction: column-reverse;
      gap: 0;
      align-items: flex-end;

      .f-title {
        width: 100%;
        text-align: center;
      }
    }

    #{$self}__inner {
      max-height: calc(100vh - (2 * var(--f-length-2)));
      width: calc(100vw - (2 * var(--f-length-1)));
      max-width: var(--max-width-s);
    }

    .formkit-wrapper,
    .formkit-fieldset {
      margin: auto;
    }

    .formkit-input[type="submit"] {
      margin: 0 auto;
    }
  }

  &.is-left {
    justify-content: flex-start;
  }

  &.is-right {
    justify-content: flex-end;
  }

  &.is-bottom {
    align-items: flex-end;
  }

  &.is-top {
    align-items: flex-start;
  }

  &.is-right,
  &.is-left {
    #{$self}__inner {
      height: 100%;
      width: 100%;
      max-width: var(--max-width-s);
    }
  }

  &.is-bottom,
  &.is-top {
    #{$self}__inner {
      width: 100%;
    }
  }

  &__close {
    background-color: transparent;
    border: 0;
    border-radius: 0;
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: px-rem(18px);
    cursor: pointer;
  }

  .f-button {
    margin-right: auto;
    margin-left: auto;
  }

  .f-cta-container {
    justify-content: center;
    width: 100%;
    margin-top: var(--f-popin-padding-y);

    & > * {
      margin: 0;
    }
  }

  .formkit-form {
    text-align: left;
  }
}

body {
  &.is-popin-open {
    overflow-y: hidden;
  }
}
</style>
