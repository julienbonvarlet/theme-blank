<template>
  <div
    class="f-promotional-code"
    :class="{ 'is-copy': isCopied }"
    @click.prevent="copyCode"
  >
    <FAText weight="bold" size="xs">{{ code }}</FAText>
    <FAText class="f-promotional-code__confirm" size="xs" weight="bold">{{
      $t("account.gift_cards.copied")
    }}</FAText>
    <FAIcon icon="copy" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string;
}>();

const isCopied = ref(false);

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 3000);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
</script>

<style lang="scss">
.f-promotional-code {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  background-color: var(--f-color-background-very-light);
  border: solid 1px var(--f-color-border);
  padding: var(--f-length-1) var(--f-length-2);
  cursor: pointer;
  text-transform: uppercase;
  gap: var(--f-length-1);
  transition:
    color ease 0.2s,
    border-color ease 0.2s;
  position: relative;
  overflow: hidden;
  $self: &;

  &:hover {
    border-style: dashed;
  }

  &__confirm {
    position: absolute;
    z-index: var(--z-index-above);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--f-color-background-success);
    color: var(--f-color-text-success);
    transition: transform ease-in-out 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &:not(.is-copy) {
    #{$self}__confirm {
      transform: translateY(101%);
    }
  }
}
</style>
