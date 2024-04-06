<template>
  <FOSectionText
    :title="$t('pages.faq.title')"
    align="center"
    title-tag="h1"
    title-size="l"
    max-width="l"
    class="fp-faq"
  >
    <ul class="fp-faq__menu">
      <li
        v-for="(category, key) in categories"
        :key="category"
        class="fp-faq__category"
        :class="{ 'is-active': active === key }"
        @click.prevent="selectCategory(key)"
      >
        <FAIcon :icon="data[key]" />
        <FATitle size="xs" :title="$t(`pages.faq.categories.${key}.title`)" />
      </li>
    </ul>
    <div ref="content" class="fp-faq__content">
      <div v-if="activeCategory" :key="activeCategory.title" class="fp-faq__list">
        <FATitle class="fp-faq__subtitle" size="s" :title="$t(`pages.faq.categories.${active}.title`)" />
        <FMCollapse
          v-for="(question, index) in questions"
          :key="index"
          title-tag="h2"
          title-size="xs"
          :is-title="true"
          :title="question.title"
          :content="question.answer"
        />
      </div>
    </div>
  </FOSectionText>
</template>

<script setup lang="ts">
const { t } = useI18n();

const active = ref<null | string>(null);
const content = ref();

// Simplification de l'accès aux catégories et aux questions
const categories = computed(() => ({
  order: "order",
  sell: "sell",
  shipping: "shipping",
  account: "account",
  customer_service: "customer_service",
}));

const activeCategory = computed(() => (categories.value[active.value] ? active.value : null));

const questions = computed(() => {
  if (!activeCategory.value) {
    return [];
  }
  const numberOfQuestions = 10;
  const questions = Array.from({ length: numberOfQuestions }, (_, i) => ({
    title: t(`pages.faq.categories.${activeCategory.value}.questions.${i + 1}.title`),
    answer: t(`pages.faq.categories.${activeCategory.value}.questions.${i + 1}.answer`),
  }));
  return questions.filter((x) => x.title?.length && x.answer?.length);
});

const data = {
  order: "cart",
  customer_service: "mail",
  sell: "shirt",
  account: "user",
  shipping: "shipping",
};

const selectCategory = (value) => {
  if (active.value === value) {
    active.value = null;
  } else {
    active.value = value;
    content.value?.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style lang="scss">
.fp-faq {
  --gap: var(--f-length-2);

  &__category {
    padding: var(--f-length-3);
    background-color: var(--f-color-background-light);
    cursor: pointer;
    border: solid 1px var(--f-color-background-light);

    &.is-active {
      border-color: var(--f-color-border);
    }
  }

  &__subtitle {
    padding: var(--f-length-3) var(--f-length-2);
    background-color: var(--f-color-background-light);
  }

  &__menu {
    display: grid;
    user-select: none;
    gap: var(--gap);
    margin-top: var(--f-length-4);
    grid-template-columns: repeat(5, 1fr);

    @include media("<desktop") {
      grid-template-columns: repeat(3, 1fr);
    }

    @include media("<tablet") {
      grid-template-columns: repeat(2, 1fr);
    }

    .f-icon {
      font-size: 40px;
      margin-bottom: var(--f-length-1);
    }
  }

  &__content {
    padding-top: var(--f-header-height);
  }
}
</style>
