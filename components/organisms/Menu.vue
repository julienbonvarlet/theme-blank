<template>
  <FMPopin
    position="left"
    class="f-menu"
    :visible="open"
    @on-close="emit('onClose')"
  >
    <template #heading>
      <Transition>
        <FABack v-if="active !== 0" @click.prevent="active = 0" />
      </Transition>
    </template>
    <template #bottom>
      <div class="f-menu__container">
        <Transition name="slide-fade">
          <div v-if="active === 0" class="f-menu__list is-first">
            <ul>
              <li v-for="(link, i) in menu">
                <p
                  v-if="link.links?.length"
                  class="f-menu__link-primary"
                  @click.prevent="active = i + 1"
                >
                  <span>{{ getLinkTitle(link) }}</span>
                  <FAIcon icon="right" />
                </p>
                <FAButton
                  v-else-if="link.to?.name === 'sell'"
                  :to="link.to"
                  :label="getLinkTitle(link)"
                  size="l"
                />
                <NuxtLink v-else class="f-menu__link-primary" :to="link.to">{{
                  getLinkTitle(link)
                }}</NuxtLink>
              </li>
            </ul>
            <ul class="f-menu__grid">
              <li v-for="link in menuGrid" :key="link">
                <FMIconInfo v-bind="link" />
              </li>
            </ul>
          </div>
        </Transition>
        <template v-for="(link, i) in menu">
          <Transition name="slide-fade">
            <div
              v-if="link.links && active === i + 1"
              class="f-menu__list is-second"
            >
              <FMCollapse
                v-for="sub_link in link.links"
                :title="getLinkTitle(sub_link)"
                :open="true"
                text-size="s"
              >
                <ul>
                  <li v-for="sub_sub_link in sub_link.links">
                    <NuxtLink
                      class="f-menu__link-secondary"
                      :to="{
                        name: 'collection',
                        params: { id: sub_sub_link.slug },
                      }"
                    >
                      {{ getLinkTitle(sub_sub_link) }}
                    </NuxtLink>
                  </li>
                </ul>
              </FMCollapse>
            </div>
          </Transition>
        </template>
      </div>
    </template>
  </FMPopin>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  watch,
  useI18n,
  useRoute,
  useMenuStore,
} from "#imports";

const { t } = useI18n();
const { menu, getLinkTitle } = useMenuStore();

const route = useRoute();
const emit = defineEmits(["onClose"]);
const props = defineProps<{
  open: boolean;
}>();

const active = ref(0);
const fullPath = computed(() => route.fullPath);

const menuGrid = computed(() => [
  {
    to: { name: "account" },
    title: t("sections.mobile_menu.account"),
    icon: "user",
  },
  {
    to: { name: "faq" },
    title: t("sections.mobile_menu.faq"),
    icon: "faq",
  },
  {
    to: { name: "contact" },
    title: t("sections.mobile_menu.contact"),
    icon: "mail",
  },
  {
    to: { name: "order_follow" },
    title: t("sections.mobile_menu.order_tracking"),
    icon: "shipping",
  },
]);

watch(fullPath, () => {
  emit("onClose");
});
</script>

<style lang="scss">
.f-menu {
  user-select: none;

  &.f-popin {
    --f-popin-padding-y: var(--f-length-2);
    --f-popin-padding-x: var(--f-length-5);

    .f-button {
      width: -webkit-fill-available;
      margin: var(--f-length-2) var(--f-popin-padding-x);
    }
  }

  .f-popin {
    &__close {
      margin-left: auto;
    }

    &__heading {
      padding: var(--f-length-1) var(--f-length-2);
    }
  }

  &__link-primary {
    padding: var(--f-length-2) var(--f-popin-padding-x);
    border-top: solid 1px var(--f-color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    min-height: 40px;
    text-transform: var(--f-title-xs-text-transform);
    cursor: pointer;
    font-size: var(--f-title-xs-font-size);
    font-weight: var(--f-title-xs-font-weight);
    letter-spacing: var(--f-title-xs-letter-spacing);
  }

  &__link-secondary {
    padding: var(--f-length-2) var(--f-popin-padding-x);
    width: 100%;
    display: block;
    font-size: var(--f-text-m-font-size);
  }

  .f-collapse {
    margin-bottom: var(--f-length-2);

    &__heading {
      padding-right: var(--f-popin-padding-x);
      padding-left: var(--f-popin-padding-x);
      background-color: var(--f-color-background-light);
      border: 0;
    }

    &__text {
      padding: 0;

      & > ul > li:not(:last-of-type) {
        border-bottom: solid 1px var(--f-color-border);
      }
    }
  }

  a {
    cursor: pointer;
  }

  &__grid {
    display: grid;
    gap: var(--f-length-1);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin: var(--f-popin-padding-x);

    & > li {
      border: solid 1px var(--f-color-border);
      padding: var(--f-length-2);
      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1.2;
    }
  }

  .f-icon-info {
    --icon-info-gap: var(--f-length-2);

    .f-icon {
      font-size: var(--f-length-3);
    }
  }

  &__list {
    &.is-second {
      margin-bottom: var(--f-length-10);
    }
  }
}
</style>
