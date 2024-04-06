<template>
  <div class="fp-appointment">
    <FMSectionContainer
      class="fp-appointment__header"
      :padding-x="true"
      max-width="xl"
      :padding-y="true"
    >
      <FATitle class="fp-appointment__title" size="l">{{
        $t("pages.appointment.title")
      }}</FATitle>
      <FAText>{{
        $t("pages.appointment.confirmation.confirm_message")
      }}</FAText>
    </FMSectionContainer>
    <FMSectionContainer :padding-x="true" max-width="m" :padding-y="true">
      <div class="fp-appointment__content">
        <div class="fp-appointment__step">
          <div class="fp-appointment__step-icon">
            <FAIcon icon="time" />
          </div>
          <FAText class="fp-appointment__step-text" size="xs">
            {{ $t("pages.appointment.confirmation.step1") }}
          </FAText>
        </div>
        <FAProgressBar class="fp-appointment__progress" :percent="50" />
        <div class="fp-appointment__step">
          <div class="fp-appointment__step-icon">
            <FAIcon icon="check" />
          </div>
          <FAText class="fp-appointment__step-text is-last" size="xs">
            {{ $t("pages.appointment.confirmation.step2") }}
          </FAText>
        </div>
      </div>
      <div class="fp-appointment__info">
        <FAText size="s">{{
          $t("pages.appointment.confirmation.success_message")
        }}</FAText>
      </div>
    </FMSectionContainer>
  </div>
</template>

<script setup lang="ts">
const percent = ref(0);
onMounted(() => (percent.value = 60));
</script>

<style lang="scss">
.fp-rdv-success {
  &__progress {
    --f-progress-bar-color-primary: var(--f-color-background-light);
    --f-progress-bar-color-secondary: var(--f-color-white);
    margin-inline: calc(-1 * var(--f-progress-bar-border-radius));
  }

  &__title {
    margin-bottom: var(--f-length-4);
  }

  &__header {
    text-align: center;
  }

  &__content {
    padding-inline: var(--f-length-3);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }

  &__step {
    width: 60px;
    aspect-ratio: 1;
    text-align: center;
    position: relative;
    flex-shrink: 0;

    &-text {
      position: absolute;
      top: calc(100% + var(--f-length-3));
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      text-transform: uppercase;
      transform: translateX(-50%);

      @include media("<=tablet") {
        width: 100px;
        white-space: normal;
      }
    }

    &-icon {
      background-color: var(--f-color-background-light);
      border-radius: 50%;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .f-icon {
        font-size: 30px;
      }
    }
  }

  &__info {
    margin-top: var(--f-length-10);
    text-align: center;
    padding: var(--f-length-3);
    background-color: var(--f-color-background-light);
    display: table;
    margin-inline: auto;
  }
}
</style>
