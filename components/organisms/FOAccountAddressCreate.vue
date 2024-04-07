<template>
  <section class="f-account-address-create">
    <FMAccountHeading :title="$t('account.addresses.create.title')" back-url="/account/addresses" :back-text="$t('account.addresses.back')" />
    <FMFormAddress :inline-desktop="true" @next="navigateTo('/account/addresses')" />
  </section>
</template>

<script lang="ts" setup>
</script>
