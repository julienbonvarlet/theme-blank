<template>
  <section class="f-account-address-edit">
    <FMAccountHeading
      :title="$t('account.addresses.edit.title')"
      back-url="/account/addresses"
      :back-text="$t('account.addresses.back')"
    />
    <FMFormAddress
      :address="address"
      :inline-desktop="true"
      :success-message="$t('account.addresses.edit.success')"
    />
  </section>
</template>

<script lang="ts" setup>
const router = useRouter();

const props = defineProps<{
  address: Object;
}>();
</script>
