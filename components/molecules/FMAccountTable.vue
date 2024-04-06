<template>
  <table class="f-account-table">
    <tbody>
      <tr v-for="item in lines" :key="item">
        <th>
          <FAText weight="bold">{{ item.title }} :</FAText>
        </th>
        <td>
          <FAText>{{ item.value }}</FAText>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    lines: Array;
  }>(),
  {
    lines: () => [],
  },
);
</script>

<style lang="scss">
.f-account-table {
  width: fit-content;
  border-collapse: collapse;
  border: 0;

  td,
  th {
    text-align: left;
    padding-bottom: var(--f-length-1);
  }

  th {
    padding-right: var(--f-length-2);
  }
}
</style>
