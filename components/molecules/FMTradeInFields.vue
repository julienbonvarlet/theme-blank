<template>
  <FMTradeInStep class="f-ti-fields" :title="title">
    <div v-if="!values?.length">
      <FMFormMessage :text="$t('trade_in.error.no_option')" />
      <FAButton :label="$t('trade_in.error.button')" @click.prevent="emit('backToSku')" />
    </div>
    <div v-else>
      <div class="f-ti-fields__list">
        <FAFieldBox v-for="field in fields" :key="field" v-bind="field" size="m" class="f-ti-fields__field" :class="`f-ti-fields__field--${type}`" @input="handleFieldChange">
          <template v-if="type === 'seller'" #content>
            <FAIcon :icon="IconNames.User" />
          </template>
          <template v-else-if="type === 'state'" #content>
            <FAText size="s" :text="t(`global.conditions.${field.value}.subtitle`)" />
          </template>
        </FAFieldBox>
      </div>
      <div class="f-ti-fields__cta">
        <FAButton type="primary" :label="$t('trade_in.add_product.button_continue')" :disabled="!selectionMade" @click.prevent="emit('next')" />
        <FAButton type="secondary" :label="t('global.back')" @click.prevent="back" />
      </div>
    </div>
  </FMTradeInStep>

  <FMPopin
    v-if="name === 'state' && model"
    :key="model"
    extra-class="f-popin-condition"
    :visible="confirmCondition"
    :title="t(`global.conditions.${model}.title`)"
    :text="t(`global.conditions.${model}.text`)"
    @on-close="confirmCondition = false"
  >
    <div class="f-popin-condition__images">
      <img v-for="img in images[model].examples" :key="img" :src="img" :alt="model" width="200" height="400" loading="lazy" />
    </div>
    <FAButton :label="t('trade_in.add_product.button_continue')" @click.prevent="emit('next')" />
  </FMPopin>
</template>

<script lang="ts" setup>
import { IconNames } from '~/types/enums';

const { t } = useI18n();

const emit = defineEmits(["input", "next", "backToSku"]);

const confirmCondition = ref(false);

const images = {
  new: {
    picto: "https://demo.faume.co/cdn/shop/files/clothes.png?v=1694055484",
    examples: [
      "https://demo.faume.co/cdn/shop/products/ae7a16961fffa14c09032a93ab2d1fa3.jpg?v=1693922960",
      "https://demo.faume.co/cdn/shop/products/d858fe071afc3a903a0c365424dd488f.jpg?v=1693922903",
    ],
  },
  excellent: {
    picto: "https://demo.faume.co/cdn/shop/files/tshirt_3.png?v=1694055484",
    examples: ["https://demo.faume.co/cdn/shop/products/6eee1f3b69bc6b9772faff4f2cbfb43a.jpg?v=1690992230"],
  },
  very_good: {
    picto: "https://demo.faume.co/cdn/shop/files/tshirt_4.png?v=1694055484",
    examples: [
      "https://demo.faume.co/cdn/shop/products/a260c9860a7e3236662ea52bf5762e0e_ca0893e1-809b-4127-ac5a-5b20696a14f1.jpg?v=1690991736",
      "https://demo.faume.co/cdn/shop/products/bf506d7bdce26144f5fe6fe8d63c7dd3_fa5e6e39-9c96-42c2-8aa9-a2c9f322b69d.jpg?v=1690991608",
    ],
  },
  good: {
    picto: "https://demo.faume.co/cdn/shop/files/tshirt_4.png?v=1694055484",
    examples: ["https://demo.faume.co/cdn/shop/products/bf506d7bdce26144f5fe6fe8d63c7dd3_fa5e6e39-9c96-42c2-8aa9-a2c9f322b69d.jpg?v=1690991608"],
  },
};

const props = defineProps<{
  title: string;
  values?: any[];
  model?: string | number;
  name: string;
  type: "text" | "color" | "state" | "seller";
}>();

const getFieldLabel = (value: string | number) => {
  switch (props.type) {
    case "color":
      return null;
    case "state":
      return t(`global.conditions.${value}.title`);
    default:
      return value;
  }
};

const selectionMade = computed(() => props.model !== undefined && props.model !== null);

const fields = computed(() => {
  if (!props.values?.length) {
    return [];
  }
  return props.values.map((value) => ({
    name: props.name,
    label: getFieldLabel(value),
    value: value,
    image: props.type === "state" ? images[value]?.picto : null,
    selected: value === props.model,
    //colorCode: props.type === 'color' ? '#aaa' : null // {TODO} à mettre à jour
  }));
});

const handleFieldChange = (value) => {
  emit("input", value);
  if (props.name === "state") {
    confirmCondition.value = true;
  } else {
    emit("next");
  }
};

const next = () => {
  if (props.name === "state") {
    confirmCondition.value = true;
  } else {
    emit("next");
  }
};

const back = () => {
  window.history.back();
};

onMounted(() => {
  if (!props.model && props.values?.length === 1) {
    emit("input", props.values[0]);
    emit("next");
  }
});
</script>

<style lang="scss">
.f-ti-fields {
  $self: &;

  .f-button {
    margin-top: var(--f-length-4);
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    $box: ".f-field-box";
    --gap: var(--f-length-2);
    gap: var(--gap);

    #{$self}__field {
      &--state,
      &--seller {
        border-radius: 0;
        min-height: auto;
        height: auto;
        padding: var(--f-length-3) var(--f-length-2);

        @include media("<tablet") {
          padding: var(--f-length-2) var(--f-length-1);
        }

        #{$box} {
          &__text {
            font-family: var(--f-font-family-title);
            font-size: var(--f-title-xs-lg-font-size);
            font-weight: var(--f-title-xs-lg-font-weight);
            text-transform: var(--f-title-xs-text-transform);
            margin: var(--f-length-3) 0 var(--f-length-2);
          }

          &__content {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            height: auto;
            border-radius: 0;
          }
        }
      }

      &--state {
        width: calc((100% - var(--gap) - var(--gap)) / 3);
        max-width: 250px;
        align-items: flex-start;
        justify-content: flex-start;

        @include media("<tablet") {
          width: 100%;
        }

        img {
          width: 100%;
          height: auto;
          max-width: 100px;
        }
      }

      &--seller {
        min-width: 100px;

        .f-icon {
          font-size: var(--f-length-3);
        }

        #{$box} {
          &__content {
            flex-direction: column-reverse;
          }

          &__text {
            margin: var(--f-length-1) 0 0;
            padding: 0;
          }
        }
      }
    }
  }

  &__cta {
    display: flex;
    flex-direction: column;
    gap: var(--f-length-2);
    justify-content: center;
    align-items: center;

    .f-button {
      margin-left: 0;
      margin-right: 0;

      & + .f-button {
        margin-top: 0;
      }
    }

    @include media(">tablet") {
      flex-direction: row-reverse;
      align-items: flex-end;
    }
  }
}

.f-popin-condition {
  &__images {
    display: flex;
    justify-content: center;
    gap: var(--f-length-1);
    overflow-x: auto;

    img {
      flex-shrink: 0;
      width: 200px;
      height: auto;
      object-fit: contain;
    }
  }
}
</style>
