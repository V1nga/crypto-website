<template>
    <FInputBase
        :min-width="minWidth"
        :min-height="minHeight"
        :width="width"
        :height="height"
        :max-width="maxWidth"
        :max-height="maxHeight"
        :label="label"
        class="f-text-field"
    >
        <template #label>
          <slot name="label"/>
        </template>
        <template #default>
            <div
                class="border-2 rounded-xl px-1 py-2 flex bg-white"
                :class="outlined ? 'border-[1px] border-secondary-light' : 'border-white filter drop-shadow-xl'"
            >
                <slot name="prepend"/>
                <input
                    v-model="value"
                    :placeholder="placeholder"
                    :class="`text-${ textAlign } text-${ textSize } font-${ fontSize }`"
                    class="outline-0 mx-2 text-sm w-full"
                    type="text"
                />
                <slot name="append"/>
            </div>
        </template>
    </FInputBase>
</template>
<script setup>
import { computed } from 'vue'
import MakeSizeProps from '../../props/MakeSizeProps';
import FInputBase from './FInputBase.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: [String, Number]
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
.f-text-field {
  min-width: 100px;
}
</style>