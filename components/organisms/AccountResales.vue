<template>
  <div class="f-account-resales">
    <FMAccountHeading :title="$t('account.trade_ins.title')" />
    <FALoader v-if="!resales" size="l" />
    <FAText
      v-else-if="!resales?.length"
      :text="$t('account.trade_ins.empty')"
    />
    <FMAccountList
      v-else-if="resales"
      :items="resales.filter((x) => x.items?.length)"
      name="resale"
    />
    <FMPagination v-if="resales?.length && pagination" v-bind="pagination" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  resales?: Array;
  pagination?: Object;
}>();
</script>
