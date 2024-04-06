<template>
  <div class="f-tags-container">
    <div
      v-for="(tag, index) in tags"
      :key="tag + index"
      :class="{
        'f-tags-container__tag': !tagImages,
        'f-tags-container__tag-image-container': tagImages && tagImages[tag],
        'is-selected': isSelected(tag),
        'is-disabled': isTagDisabled(tag),
      }"
      @click="selectTag(tag)"
    >
      <span v-if="!tagImages">{{ tag }}</span>
      <img v-if="tagImages && tagImages[tag]" :src="tagImages[tag]" class="f-tags-container__tag-image" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  tags: {
    type: Array,
    required: true,
  },
  tagType: {
    type: String,
    required: true,
  },
  tagImages: {
    type: Object,
    required: true,
  },
  selectTag: {
    type: Function,
    required: true,
  },
  isTagDisabled: {
    type: Function,
    required: true,
  },
  isSelected: {
    type: Function,
    required: true,
  },
});

const isSelected = (tag) => {
  return props.isSelected ? props.isSelected(tag) : false;
};
const selectTag = (tag) => {
  if (isTagDisabled(tag)) {
    return;
  } // Ne pas sélectionner si le tag est désactivé
  props.selectTag(tag);
};
const isTagDisabled = (tag) => {
  return props.isTagDisabled ? props.isTagDisabled(tag) : false;
};
</script>

<style lang="scss">
.f-tags-container {
  display: flex;
  align-items: center;
  gap: var(--f-length-1);
  flex-wrap: wrap;
  $self: &;

  &__tag {
    font-size: 10px;
    color: #666;
    display: flex;
    border-radius: 99px;
    border: 1px solid #666;
    width: fit-content;
    padding: 4px var(--f-length-1);
    gap: var(--f-length-1);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;

    &:hover,
    &.is-selected {
      color: #fff;
      background-color: #000;
      border: 1px solid #000;
    }

    &.is-disabled {
      opacity: 0.5;
      pointer-events: none;
      overflow: hidden;
      &:after {
        content: "";
        position: absolute;
        opacity: 0.5;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom right, transparent calc(50% - 1px), #666 calc(50% - 1px), #666 50%, transparent 50%);
      }
    }
  }

  &__tag-image-container {
    position: relative;
    padding: 0;
    &.is-selected {
      #{$self}__tag-image {
        border: 1px solid #000;
      }
    }
    &.is-disabled {
      opacity: 0.5;
      pointer-events: none;
      overflow: hidden;
      &:after {
        content: "";
        opacity: 0.5;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom right, transparent calc(50% - 1px), #666 calc(50% - 1px), #666 50%, transparent 50%);
      }
    }
  }

  &__tag-image {
    border: 1px solid #dedede;
    width: var(--f-length-6);
    height: auto;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      border: 1px solid #000;
    }

    &.is-disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
