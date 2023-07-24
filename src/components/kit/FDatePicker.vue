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
            <VueDatePicker v-model="value" :range="range" :partial-range="false">
                <template #trigger>
                    <div class="cursor-pointer border-[1px] border-secondary-light rounded-xl px-3 py-2 flex flex-nowrap gap-x-3 bg-white">
                        <FIcon icon="calendar"/>
                        <div class="font-semibold">
                          <template v-if="range">
                              {{ value ? `${ new Date(value[0]).toLocaleDateString("ru-RU") } - ${ new Date(value[1]).toLocaleDateString("ru-RU") }` : 'Выберите даты' }}
                          </template>
                          <template v-else>
                              {{ value ? new Date(value).toLocaleDateString("ru-RU") : 'Дата' }}
                          </template>
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
    range: {
      type: Boolean
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