<template>
  <FTAuth :title="$t('account.identification.title')" :image="image" :message="!emailChecked || emailExists ? $t('account.identification.text') : null">
    <FMFormCheckEmail v-if="!emailChecked" @submit="handleEmailSubmit" />

    <FMFormLogin v-else-if="emailExists" :email="email" @go-to-register="toggleEmailExists" @next="navigateTo('/account')" />

    <FMFormRegister v-else :email="email" @go-to-login="toggleEmailExists" @next="navigateTo('/account')" />
  </FTAuth>
</template>

<script lang="ts" setup>
const email = ref<string | null>(null);
const emailChecked = ref<boolean>(false);
const emailExists = ref<boolean>(false);

const image_email = "https://faume.imgix.net/Faume_cover_website.jpg";
const image_login = "https://faume.imgix.net/10/home-baner.webp";
const image_register = "https://faume.imgix.net/18/home-baner.webp";

const image = computed(() => (!emailChecked.value ? image_email : emailExists.value ? image_login : image_register));

const handleEmailSubmit = (data) => {
  emailExists.value = data.exist;
  email.value = data.email;
  emailChecked.value = true;
};

const toggleEmailExists = () => {
  emailExists.value = !emailExists.value;
  window.scrollTo({ top: 0 });
};
</script>
