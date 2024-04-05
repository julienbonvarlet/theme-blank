<template>
  <div class="f-credits-explanation">
    <FMAccountHeading
      :title="$t('account.trade_ins.credits_explanation.title')"
      size="s"
    />
    <div class="f-credits-explanation__list">
      <FMIconInfo
        v-for="(step, i) in steps"
        :key="step"
        v-bind="step"
        :image="images[i]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "#imports";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const images = [
  "https://faume.imgix.net/apple-touch-icon.png",
  "https://faume.imgix.net/apple-touch-icon.png",
  "https://faume.imgix.net/apple-touch-icon.png",
  "https://faume.imgix.net/apple-touch-icon.png",
];

const steps = computed(() => {
  const tutorialSteps = [];
  for (let i = 1; i <= 4; i++) {
    tutorialSteps.push({
      title: t(`account.trade_ins.credits_explanation.steps.${i}.title`),
      text: t(`account.trade_ins.credits_explanation.steps.${i}.text`),
    });
  }
  return tutorialSteps;
});
</script>

<style lang="scss">
.f-credits-explanation {
  margin: var(--f-length-5) 0;

  &__list {
    display: grid;
    gap: var(--f-length-3);
    grid-template-columns: repeat(4, 1fr);
    align-items: flex-start;

    @include media("<=tablet") {
      gap: var(--f-length-2);
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
