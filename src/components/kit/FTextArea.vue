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
            <div class="border-[1px] border-secondary-light rounded-xl px-1 py-2 flex bg-white">
                <textarea
                    v-model="value"
                    cols="40"
                    rows="5"
                    :placeholder="placeholder"
                    class="outline-0 mx-2 text-sm w-full h-auto"
                />
            </div>
        </template>
    </FInputBase>
</template>
<script setup>
import { computed } from 'vue';
import FInputBase from './FInputBase.vue';
import MakeSizeProps from '../../props/MakeSizeProps';

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
    width: {
      type: [Number, String],
      default: '100%'
    },
    maxWidth: {
      type: [Number, String],
      default: '100%'
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
textarea {
  resize: none
}
</style>