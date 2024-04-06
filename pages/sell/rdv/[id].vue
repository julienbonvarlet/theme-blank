<template>
  <div class="fp-rdv">
    <FOBookResaleAppointment
      :store="currentStore"
      :available-days="availableDays"
      :available-slots="availableSlots"
      @date-changed="fetchAvailableSlots"
      @validate="sendAppointment"
    />
  </div>
</template>

<script setup lang="ts">
// TODO: Should be typed from the api
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

/* HANDLE RETRIEVE STORE DATA */
//Retreive current store id from route params
const route = useRoute();
const storeId = route.params.id.toString();

// Fetch stores data
const { data: currentStore } = await useAsyncData<Store[]>(
  "products",
  //TODO: use SDK to fetch data when backend is ready
  () => $API.realStore.apiCustomerRealStoresIdGet(storeId),
);

/* HANDLE DAY SELECTOR */
// Day of today as YYYY-MM-DD format :
const dayOfToday = new Intl.DateTimeFormat("fr-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(Date.now());

const config = useRuntimeConfig();
const { data: storeDays } = await useFetch(
  `https://api.faume.co/${config.clientSlug}/booking/days/${storeId}/${dayOfToday}`,
);

const availableDays = computed(() => {
  return storeDays.value?.map((entry: any) => {
    const entryDateObj = new Date(entry.date);
    return {
      value: entry.date,
      label:
        entryDateObj
          .toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          .charAt(0)
          .toUpperCase() +
        entryDateObj
          .toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          .slice(1),
      attrs: { disabled: !entry.is_open },
    };
  });
});

/* HANDLE SLOT SELECTOR */
const availableSlots = ref(null);

const formatHour = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h");
};

const fetchAvailableSlots = async (date: any) => {
  if (date) {
    const { data: result } = await useFetch(`https://api.faume.co/blue-collection/booking/slots/${storeId}/${date}/30`);
    availableSlots.value = result.value
      .map((entry: any) => {
        if (entry.is_open) {
          return {
            value: entry.begin,
            label: formatHour(entry.begin),
            attrs: { disabled: !entry.is_open_booking },
          };
        } else {
          return null;
        }
      })
      .filter(Boolean);
  } else {
    availableSlots.value = [];
  }
};

/* HANDLE FORM SUBMIT */
const sendAppointment = async (payload: object) => {
  await $API.booking.apiCustomerBookingsPost(payload);
  const router = useRouter();
  router.push({ name: "sell-rdv-success" });
};
</script>
