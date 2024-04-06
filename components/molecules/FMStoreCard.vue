<template>
  <div ref="el" class="f-store-card" :class="{ 'is-active': isFocus }" @click.stop="emit('focusStore', props.store)">
    <FMCardText
      :title="store.properties.store.name"
      :text="`${store.properties.store.street}`"
      :description="`${store.properties.store.zip}, ${store.properties.store.city}
      <br>${store.properties.store.phone}`"
      title-tag="h3"
    />
    <FMCollapse v-if="showPlanning" title-tag="h2" title-size="m" :title="t('pages.stores.hours')">
      <FAText v-for="(value, key) in translatedSchedule" :key="key" size="xs" class="f-store-card__planning-item">
        <span>{{ key }} : </span><span>{{ value }}</span>
      </FAText>
    </FMCollapse>
    <div class="f-store-card__status">
      <FATagDefault
        icon="dot"
        class="f-store-card__status-tag"
        :class="isStoreOpen ? 'is-open' : 'is-closed'"
        :text="isStoreOpen ? t('pages.stores.open_today') : t('pages.stores.closed')"
      />
      <FAButtonIcon icon="time" />
    </div>
    <FAButton
      class="f-store-card__cta"
      :label="t('pages.stores.button')"
      :to="{
        name: 'sell-rdv',
        params: { id: props.store.properties.store.id },
      }"
      size="m"
      type="primary"
      @click.stop=""
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    store: object;
    showPlanning?: boolean;
    isFocus?: boolean;
  }>(),
  {
    showPlanning: true,
    isFocus: false,
  },
);

// emit focusStore event
const emit = defineEmits(["focusStore"]);

// Expose the ref
const el = ref<HTMLElement | null>(null);
defineExpose({
  el,
});

const currentDay = new Date().toLocaleDateString("en-GB", { weekday: "long" }).toLowerCase();
const isStoreOpen = computed(() => {
  // Test if the current day in the schedule contain a number ex : 9h00 - 12h00
  // to differentiate from "closed" for example
  return /\d/.test(props.store.properties.store.schedule[currentDay]);
});

// TODO: Translation logic for schedule should be moved to a more centralized solution when integrating i18n
const translatedSchedule = computed(() => {
  const schedule = { ...props.store.properties.store.schedule };
  const dayMappings = {
    monday: t("global.days.monday"),
    tuesday: t("global.days.tuesday"),
    wednesday: t("global.days.wednesday"),
    thursday: t("global.days.thursday"),
    friday: t("global.days.friday"),
    saturday: t("global.days.saturday"),
    sunday: t("global.days.sunday"),
  };

  const translated = {};

  // Define the desired order of the days
  const orderedDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  for (const dayKey of orderedDays) {
    if (dayKey in schedule) {
      translated[dayMappings[dayKey]] = schedule[dayKey];
    } else {
      // If the key has no match, leave it as is
      translated[dayKey] = schedule[dayKey];
    }
  }

  return translated;
});
</script>

<style lang="scss">
.f-store-card {
  padding: 15px;
  max-width: 250px;
  width: 100%;

  &.is-active {
    background-color: var(--f-color-background-light);
  }

  &__planning {
    margin-top: var(--f-length-2);
    &-item {
      display: flex;
      justify-content: space-between;
    }
  }

  .f-tag-default {
    font-size: 10px;
  }
  &__status {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--f-length-1);
    width: 100%;
    max-width: 200px;
    margin-top: var(--f-length-2);

    &-tag {
      position: relative;
      height: 42px;
      border-radius: 30px;
      flex-grow: 1;
      color: var(--f-color-success);
      &.is-closed {
        color: var(--f-color-error);
      }
    }
  }
  &__cta {
    margin-top: var(--f-length-1);
  }
}
</style>
