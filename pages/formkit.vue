<template>
  <div>
    <h1>formkit</h1>
    <FormKit v-model="value" type="form" :actions="false">
      <FormKit
        type="text"
        label="Your username"
        value="calypso"
        help="Pick a username people will remember!"
      />
      <FormKit
        name="genre"
        type="radio"
        label="Genre"
        decorator-icon="checkbox"
        :options="[
          { label: 'Femme', value: 'woman' },
          { label: 'Homme', value: 'man' },
        ]"
      />
      <FormKit
        name="genre2"
        type="radio"
        label="Genre"
        decorator-icon="checkbox"
        :config="{
          classes: {
            options: 'is-inline',
          },
        }"
        :options="[
          { label: 'Femme', value: 'woman' },
          { label: 'Homme', value: 'man' },
        ]"
      />
      <FormKit
        name="checkbox"
        type="checkbox"
        label="Checkbox exemple"
        decorator-icon="checkbox"
        :options="[
          { label: 'Femme', value: 'woman' },
          { label: 'Homme', value: 'man' },
        ]"
      />
      <FormKit
        name="email"
        type="email"
        label="Email"
        validation="required|email"
        validation-visibility="live"
      />

      <FormKit
        type="date"
        label="Birthday"
        help="Enter your birth day"
        validation="required|date_after:2023-01-01"
        validation-visibility="live"
      />
      <FormKit
        type="password"
        name="password"
        value="super-secret"
        label="Password"
        help="Enter a new password"
        validation="required"
        validation-visibility="live"
        suffix-icon="eyeClosed"
        @suffix-icon-click="handleIconClick"
      />
      <FormKit
        type="password"
        name="password_confirm"
        label="Confirm password"
        help="Confirm your new password"
        validation="required|confirm"
        validation-visibility="live"
        validation-label="Password confirmation"
        suffix-icon="eyeClosed"
        @suffix-icon-click="handleIconClick"
      />
      <FormKit
        type="select"
        label="Which country is the smallest?"
        name="small_country"
        :options="['Monaco', 'Vatican City', 'Maldives', 'Tuvalu']"
      />
      <FormKit
        type="textarea"
        name="instructions"
        label="Your Essay"
        placeholder="Remember to write in complete sentences."
        :help="`${value.instructions ? value.instructions.length : 0} / 120`"
        validation="length:0,120"
        validation-visibility="live"
        :validation-messages="{
          length: 'Instructions cannot be more than 120 characters.',
        }"
      />
      <button type="submit">Validate</button>
    </FormKit>
    <pre wrap>{{ value }}</pre>
  </div>
</template>

<script setup>
const value = ref();

const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};
</script>
