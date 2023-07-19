<template>
    <FMakeSize
        :min-width="minWidth"
        :min-height="minHeight"
        :width="width"
        :height="height"
        :max-width="maxWidth"
        :max-height="maxHeight"
        class="f-select"
    >
      <div v-if="label || $slots.label" class="text-sm text-dark font-semibold mb-1">
          <slot name="label">{{ label }}</slot>
      </div>
        <select
            v-model="value"
            class="appearance-none w-full outline-0 border-2 rounded-xl px-1 py-2 bg-white border-primary-light focus:border-primary px-2"
            :class="`text-${ textSize } font-${ fontSize }`"
        >
            <slot/>
        </select>
    </FMakeSize>
</template>
<script setup>
import { computed } from 'vue'
import MakeSizeProps from '../../props/MakeSizeProps';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: String
    },
    label: {
      type: String
    },
    textSize: {
      type: String,
      default: 'md'
    },
    fontSize: {
      type: String,
      default: 'semibold'
    },
    ...MakeSizeProps
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
.f-select select {
    background-image: url("/icons/arrow-down-secondary.svg");
    background-repeat: no-repeat;
    background-position-x: calc(100% - 10px);
    background-position-y: 50%;
}
.f-select select:focus {
    background-image: url("/icons/arrow-down-primary.svg");
}
</style>