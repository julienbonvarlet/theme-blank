<template>
  <section class="f-account-addresses">
    <FMAccountHeading :title="$t('account.addresses.title')">
      <FAButton to="/account/addresses/create" :label="$t('account.addresses.button_add')" icon="plus" />
    </FMAccountHeading>
    <FALoader v-if="!addresses" size="m" />
    <FAText v-else-if="!addresses?.length" :text="$t('account.addresses.empty')" />
    <FMAccountList v-if="addresses?.length" :items="addresses" name="address" />
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  addresses?: any[];
}>();
</script>
