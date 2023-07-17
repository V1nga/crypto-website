<template>
    <div
      class="f-text-field border-2 rounded-xl px-1 py-2 flex bg-white"
      :class="outlined ? 'border-primary-light' : 'border-white filter drop-shadow-xl'"
    >
        <slot name="prepend"/>
        <input v-model="value" :placeholder="placeholder" class="text-sm w-full"/>
        <slot name="append"/>
    </div>
</template>
<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: String
    },
    placeholder: {
        type: String
    },
    outlined: {
        type: Boolean
    }
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>
<style scoped>
.f-text-field {
  min-width: 150px;
}

input:focus {
    outline: none;
}
</style>