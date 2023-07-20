<template>
    <FInputBase
        :min-width="minWidth"
        :min-height="minHeight"
        :width="width"
        :height="height"
        :max-width="maxWidth"
        :max-height="maxHeight"
        :label="label"
    >
        <template #label>
          <slot name="label"/>
        </template>
        <template #default>
            <VueDatePicker v-model="value" time-picker>
                <template #trigger>
                    <div class="cursor-pointer border-2 border-primary-light rounded-xl px-3 py-2 flex flex-nowrap gap-x-3 bg-white">
                        <FIcon icon="clock"/>
                        <div class="font-semibold">
                          {{ value ? `${ value.hours }:${ value.minutes }` : '--:--' }}
                        </div>
                    </div>
                </template>
            </VueDatePicker>
        </template>
    </FInputBase>
</template>
<script setup>
import { computed } from 'vue';
import MakeSizeProps from '../../props/MakeSizeProps';
import FInputBase from './FInputBase.vue';
import FIcon from './FIcon.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: Object
    },
    label: {
      type: String
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