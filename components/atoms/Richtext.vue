<template>
  <div class="f-richtext">
    <slot />
    <span v-if="content" v-html="content"></span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  content?: string;
}>();
</script>

<style lang="scss">
.f-richtext {
  font-family: var(--f-font-family-text);
  line-height: var(--f-text-letter-spacing);
  font-weight: 400;
  font-size: var(--f-text-m-font-size);

  @each $size in ("xl", "l", "m", "s", "xs") {
    $tag: if(
      $size == "m",
      "h2",
      if($size == "s", "h3", if($size == "xs", "h4", "h5"))
    );
    #{$tag}:not(.f-title) {
      font-weight: var(--f-title-#{$size}-font-weight);
      text-transform: var(--f-title-#{$size}-text-transform);
      letter-spacing: var(--f-title-#{$size}-letter-spacing);
      line-height: var(--f-title-#{$size}-line-height);
      font-size: var(--f-title-#{$size}-sm-font-size);

      @include media(">=tablet", "<desktop") {
        font-size: var(--f-title-#{$size}-md-font-size);
      }
      @include media(">=desktop") {
        font-size: var(--f-title-#{$size}-lg-font-size);
      }
    }
  }

  .f-subtitle {
    margin: var(--richtext-margin-s) 0 var(--richtext-margin-s);
  }

  .f-title,
  h2:not(.f-title),
  h3:not(.f-title),
  h4:not(.f-title),
  h5:not(.f-title) {
    margin-bottom: var(--richtext-margin-s);
    margin-top: var(--richtext-margin-l);

    &.is-s,
    &.is-xs,
    h3:not(.f-title),
    h4:not(.f-title) {
      margin-top: var(--richtext-margin-m);
      margin-bottom: var(--richtext-margin-xs);
    }

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  p,
  ul,
  ol {
    margin: var(--richtext-margin-xs) 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  img,
  video {
    margin: var(--richtext-margin-s) 0;
    width: 100%;
    height: auto;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a:not(.f-btn):not(.f-link) {
    text-decoration: underline;

    @include hover {
      text-decoration: none;
    }
  }

  .btn {
    margin-top: var(--richtext-margin-s);
  }

  ol {
    list-style: decimal;
  }

  ul {
    list-style: disc;
  }

  ol,
  ul {
    list-style-position: inside;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: 700;
  }

  .f-text,
  p {
    & > *:last-child {
      margin-bottom: 0;
    }

    & > *:first-child {
      margin-top: 0;
    }
  }
}
</style>
