<template>
  <FMCardInline v-if="address" class="f-address-card" v-bind="cardInlineData">
    <FATagDefault v-if="address.isDefault" :text="$t('account.addresses.default')" />
    <template v-if="displayCta" #right>
      <div class="f-address-card__cta">
        <FAButton size="s" type="secondary" :to="editRoute" :label="$t('account.addresses.button_edit')" icon="write" />
        <FALink size="s" :text="$t('account.addresses.button_delete')" @click.prevent="displayDelete = true" />
      </div>
    </template>
  </FMCardInline>

  <FMPopin v-if="displayDelete" :title="$t('account.addresses.delete.title')" :text="$t('account.addresses.delete.text')" :visible="true">
    <FMCtaContainer>
      <FAButton :label="$t('account.addresses.delete.button_no')" type="secondary" @click.prevent="displayDelete = false" />
      <FAButton :label="$t('account.addresses.delete.button_yes')" @click.prevent="deleteAddress" />
    </FMCtaContainer>
  </FMPopin>
</template>

<script setup lang="ts">
const addressesStore = useAddressesStore();
const { formatAddressCardText } = useAddressFormatter();

const displayDelete = ref(false);

const props = withDefaults(
  defineProps<{
    address: { isDefault?: boolean; id: string };
    isDefault?: boolean;
    displayCta?: boolean;
  }>(),
  {
    displayCta: true,
  },
);

const editRoute = computed(() => `/account/addresses/${props.address.id}`);

const deleteAddress = () => {
  addressesStore.deleteAddress(props.address.id);
  displayDelete.value = false;
};
const cardInlineData = computed(() => formatAddressCardText(props.address));
</script>

<style lang="scss">
.f-address-card {
  padding: var(--f-length-2);
  background-color: var(--f-color-background-light);
  white-space: break-spaces;

  .f-tag-default {
    margin-top: var(--f-length-1);
  }

  &__cta {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--f-length-1);
  }
}
</style>
