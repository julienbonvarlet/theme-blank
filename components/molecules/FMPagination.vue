<template>
  <div class="f-pagination">
    <button v-if="previousPage" class="f-pagination__button" @click.prevent="go(previousPage)">
      <FAIcon :icon="IconNames.Left" />
    </button>
    <ul>
      <template v-if="activePage != firstPage && previousPage != firstPage">
        <li>
          <FAText class="f-pagination__page" size="s" @click.prevent="go(firstPage)">{{ firstPage }}</FAText>
        </li>
        <li>
          <FAText class="f-pagination__page" size="s">•</FAText>
        </li>
      </template>
      <li v-if="previousPage">
        <FAText class="f-pagination__page" size="s" @click.prevent="go(previousPage)">{{ previousPage }}</FAText>
      </li>
      <li v-if="activePage" class="is-selected">
        <FAText class="f-pagination__page" size="s">{{ activePage }}</FAText>
      </li>
      <li v-if="nextPage">
        <FAText class="f-pagination__page" size="s" @click.prevent="go(nextPage)">{{ nextPage }}</FAText>
      </li>
      <template v-if="activePage != lastPage && nextPage != lastPage">
        <li>
          <FAText class="f-pagination__page" size="s">•</FAText>
        </li>
        <li>
          <FAText class="f-pagination__page" size="s" @click.prevent="go(lastPage)">{{ lastPage }}</FAText>
        </li>
      </template>
    </ul>
    <button v-if="nextPage" class="f-pagination__button" @click.prevent="go(nextPage)">
      <FAIcon :icon="IconNames.Right" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { IconNames } from "~/types/enums";

const emit = defineEmits(["go"]);
const go = (page: Number) => emit("go", page);

const props = defineProps<{
  previousPage: Number;
  nextPage: Number;
  activePage: Number;
  firstPage: Number;
  lastPage: Number;
}>();
</script>

<style lang="scss">
.f-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--f-length-1);
  $self: &;
  user-select: none;
  margin-top: var(--f-length-4);

  ul {
    display: flex;
    align-items: center;
  }

  li {
    display: flex;
    align-items: center;
  }

  .is-selected {
    #{$self}__page {
      text-decoration: underline;
      pointer-events: none;
    }
  }

  &__button {
    background: transparent;
    border: 0;
    box-shadow: none;
    font-size: var(--f-text-m-font-size);
  }

  &__dot,
  &__button,
  &__page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 30px;
    min-width: 30px;
  }

  &__button,
  &__page {
    cursor: pointer;
  }
}
</style>
