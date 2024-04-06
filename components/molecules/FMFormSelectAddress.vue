<template>
  <div class="f-form-select-address">
    <FALoader v-if="!addresses" size="m" />
    <FMFormAddress v-else-if="!addresses?.length" :inline-desktop="true" />
    <div v-else class="f-form-select-address__list">
      <div
        v-for="item in addresses"
        :key="item"
        class="f-form-select-address__item"
        :class="{ 'is-selected': item['@id'] == model }"
        @click="selectAddress(item['@id'])"
      >
        <FACheckbox :radio="true" :checked="item['@id'] == model" />
        <FMCardText v-bind="formatAddressCardText(item)">
          <FATagDefault
            v-if="item.isDefault"
            :text="$t('global.form.default_address')"
          />
        </FMCardText>
        <FAButton
          :label="$t('account.addresses.button_edit')"
          size="s"
          type="secondary"
          icon="write"
          @click.prevent.stop="editAddress = item"
        />
      </div>
      <FALink
        v-if="addresses"
        :text="$t('account.addresses.button_add')"
        @click.prevent="createAddress = true"
      />
    </div>
  </div>

  <FMPopin
    v-if="createAddress"
    position="right"
    :visible="true"
    :title="$t('account.addresses.create.title')"
    @on-close="createAddress = false"
  >
    <FMFormAddress @next="createAddress = false" />
  </FMPopin>

  <FMPopin
    v-if="editAddress"
    :key="editAddress"
    position="right"
    :visible="true"
    :title="$t('account.addresses.edit.title')"
    @on-close="editAddress = null"
  >
    <FMFormAddress :address="editAddress" @next="editAddress = null" />
  </FMPopin>
</template>

<script setup lang="ts">
const emit = defineEmits(["select"]);

const { formatAddressCardText } = useAddressFormatter();
const addressesStore = useAddressesStore();

const props = defineProps<{
  model?: string;
}>();

const loading = ref(false);
const editAddress = ref<null | string | number>(null);
const createAddress = ref(false);

const addresses = computed(() => addressesStore.addresses);
const isValid = computed(() =>
  props.model ? addresses.value?.find((x) => x["@id"] === props.model) : null,
);

const selectAddress = async (id) => {
  emit("select", id);
};

watch(
  addresses,
  (newAddresses, oldAddresses) => {
    if (newAddresses?.length === 1 && !props.model) {
      selectAddress(newAddresses[0]["@id"]);
    }
  },
  { immediate: true },
);

onMounted(() => {
  addressesStore.fetchAddresses();
});
</script>

<style lang="scss">
.f-form-select-address {
  text-align: left;
  $self: &;

  .f-form-message {
    margin-left: 0;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--f-length-2);

    @include media("<desktop") {
      .f-link {
        margin: auto;
        text-align: center;
      }
    }
  }

  &__item {
    padding: var(--f-length-2);
    display: flex;
    align-items: center;
    gap: var(--f-length-2);
    border: solid 1px var(--f-color-border);
    transition: background-color ease 0.2s;

    &.is-selected {
      background-color: var(--f-color-background-light);
    }

    &:not(.is-selected) {
      .f-tag-default {
        background-color: transparent;
        border: 0;
        padding: 0;
      }
    }

    .f-card-text {
      cursor: pointer;
    }
  }

  .f-button.is-s {
    margin-left: auto;
    margin-right: 0;
  }

  .f-tag-default {
    margin-top: var(--f-length-1);
  }
}
</style>
