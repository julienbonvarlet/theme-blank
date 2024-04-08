<template>
  <div class="f-book-resale-appointement">
    <FMSectionContainer class="f-book-resale-appointement__header" :padding-x="true" max-width="xl" :padding-y="true">
      <FATitle size="l" tag="h2">
        {{ $t("pages.appointment.title") }}
      </FATitle>
    </FMSectionContainer>
    <FMSectionContainer :padding-x="true" :padding-y="true" max-width="xl">
      <div class="f-book-resale-appointement__content">
        <div class="f-book-resale-appointement__left">
          <FATitle class="f-book-resale-appointement__subtitle" size="s">{{ $t("pages.appointment.subtitle_left") }}</FATitle>
          <div class="f-book-resale-appointement__store">
            <div class="f-book-resale-appointement__store-icon">
              <FAIcon :icon="IconNames.Store" />
            </div>
            <div class="f-book-resale-appointement__store-infos">
              <FAText>{{ store?.name }}</FAText>
              <FAText>{{ store?.street }}</FAText>
              <FAText>{{ store?.zip }} {{ store?.city }}</FAText>
              <FAText>{{ store?.phone }}</FAText>
            </div>
          </div>
          <FormKit v-model="bookingInfo" type="form" :actions="false">
            <FormKit type="select" :label="$t('global.form.date') + ' *'" name="date" :placeholder="$t('pages.appointment.date_placeholder')" :options="availableDays" validation="required" />
            <FormKit
              v-if="availableSlots"
              type="select"
              :label="$t('global.form.time') + ' *'"
              name="hour"
              :placeholder="$t('pages.appointment.time_placeholder')"
              :options="availableSlots"
              validation="required"
            />
          </FormKit>
        </div>
        <div class="f-book-resale-appointement__right">
          <FATitle class="f-book-resale-appointement__subtitle" size="s">{{ $t("pages.appointment.subtitle_right") }}</FATitle>
          <FormKit v-model="userInfo" type="form" :actions="false">
            <FormKit type="text" :label="$t('global.form.firstname') + ' *'" validation="required" name="firstname" />
            <FormKit type="text" :label="$t('global.form.lastname') + ' *'" validation="required" name="lastname" />
            <FormKit type="email" :label="$t('global.form.email') + ' *'" validation="required|email" name="email" />
            <FormKit type="text" :label="$t('global.form.phone') + ' *'" validation="required" name="phone" />
            <FormKit type="number" :label="$t('pages.appointment.label_products') + ' *'" name="nbProducts" number="integer" validation="required|number|between:1,5" min="1" max="5" />
            <FormKit type="textarea" :label="$t('pages.appointment.label_comment')" name="message" />

            <FAButton :label="$t('pages.appointment.button_validate')" type="primary" :is-disabled="!formValidity" @click.prevent="$emit('validate', finalPayload)" />
          </FormKit>
        </div>
      </div>
    </FMSectionContainer>
  </div>
  <FMPopin :visible="showPopin" :title="$t('pages.appointment.popin.title')">
    <FARichtext :content="$t('pages.appointment.popin.text')" />
  </FMPopin>
</template>

<script setup lang="ts">
import { IconNames } from "~/types/enums";

withDefaults(
  defineProps<{
    store: Store;
    availableDays: [];
    availableSlots: [] | null;
  }>(),
  {},
);

//declare emit validate event
const emit = defineEmits(["validate", "dateChanged"]);

// TODO: Should be typed from the api
interface DayMap {
  sunday: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
}

const dayMap: DayMap = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

interface Store {
  id: number;
  name: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  lat: string;
  long: string;
  type: string;
  close_period: any[];
  schedule: Partial<Record<keyof typeof dayMap, string | null>>;
  booking_schedule: Partial<Record<keyof typeof dayMap, string | null>>;
}

// TODO: Might be typed from sdk
type UserInfoType = {
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  nbProducts: number | string | undefined;
  message: string | undefined;
};

// Form date selector info reactive object
const bookingInfo = ref({
  date: null as string | null,
  hour: null as string | null,
});

// Listen for bookingInfo date changes, and reset hour when date get changed
watch(
  () => bookingInfo.value.date,
  () => {
    bookingInfo.value.hour = null;
    // emit the new day selected to let the parent update the available slots
    if (bookingInfo.value.date) {
      emit("dateChanged", bookingInfo.value.date);
    }
  },
);

// Form user info reactive object
const userInfo = ref<UserInfoType>({
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  phone: undefined,
  nbProducts: undefined,
  message: undefined,
});

// TODO: fix form validity using formkit
const formValidity = computed(() => {
  return bookingInfo.value.date && bookingInfo.value.hour && userInfo.value.firstname && userInfo.value.lastname && userInfo.value.email && userInfo.value.phone && userInfo.value.nbProducts;
});

const finalPayload = computed(() => {
  return {
    schedule: bookingInfo.value.hour,
    ...userInfo.value,
    // TODO: should change as soon as the API use the storeID instead of a private token
    store: "f9e8c969c2c473e33f398f5c6c382304",
  };
});

/* Handle popin visibility */
const showPopin = ref<Boolean>(false);
let timeoutFn = null;
watch(
  () => userInfo.value.nbProducts,
  () => {
    timeoutFn = setTimeout(() => {
      showPopin.value = true;
    }, 1000);
  },
);
// Remove timeout on unmount
onUnmounted(() => {
  if (timeoutFn) {
    clearTimeout(timeoutFn);
  }
});
</script>

<style lang="scss">
.f-book-resale-appointement {
  &__header {
    text-align: center;
  }

  &__store {
    display: flex;
    flex-direction: row;
    margin-bottom: var(--f-length-4);

    &-icon {
      width: 100px;
      height: 100px;
      padding: 20px;
      background-color: var(--f-color-background-light);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      font-size: 42px;
      //TODO: this margin-bottom reset occur quite often, should be a global reset?
      svg {
        margin-bottom: 0;
      }
    }

    &-infos {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: var(--f-length-2);
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--f-length-2);
    text-align: left;

    @include media("<tablet") {
      grid-template-columns: 1fr;
    }
  }

  &__subtitle {
    margin-bottom: var(--f-length-6);
  }

  &__left {
    padding: var(--f-length-4);
  }

  &__right {
    padding: var(--f-length-4);
    position: sticky;
    background-color: var(--f-color-background-light);
  }
}
</style>
