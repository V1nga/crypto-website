<template>
    <div
      class="f-text-field"
      :style="`width: ${ width }${ Number.isInteger(width) ? 'px' : '' }; max-width: ${ maxWidth }${ Number.isInteger(maxWidth) ? 'px' : '' };`"
    >
      <div v-if="label || $slots.label" class="text-sm text-dark font-semibold mb-1">
        <slot name="label">{{ label }}</slot>
      </div>
      <div
        class="border-2 rounded-xl px-1 py-2 flex bg-white"
        :class="outlined ? 'border-primary-light' : 'border-white filter drop-shadow-xl'"
      >
          <slot name="prepend"/>
          <input v-model="value" :placeholder="placeholder" class="mx-2 text-sm w-full" :class="`text-${ textAlign } text-${ textSize } font-${ fontSize }`"/>
          <slot name="append"/>
      </div>
    </div>
</template>
<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: String
    },
    label: {
        type: String
    },
    placeholder: {
        type: String
    },
    outlined: {
        type: Boolean
    },
    textAlign: {
      type: String,
      default: 'left'
    },
    textSize: {
      type: String,
      default: 'md'
    },
    fontSize: {
      type: String,
      default: 'medium'
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    maxWidth: {
      type: [Number, String],
      default: '100%'
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
  min-width: 100px;
}

input:focus {
    outline: none;
}
</style>