<template>
    <div class="grid grid-cols-2 grid-cols-[min-content_1fr] gap-y-5">
        <div class="cursor-pointer pr-4" @click="model = value">
            <input
                v-model="model"
                :value="value"
                :name="group"
                type="radio"
                class="w-4 h-4 appearance-none rounded-full border-gray-light border-[2px] checked:border-[6px] checked:border-primary"
            />
        </div>
        <div class="font-bold cursor-pointer" @click="model = value">
            <slot>{{ text }}</slot>
        </div>
        <div class="col-start-2">
            <Transition>
                <div v-if="model === value">
                    <slot name="hideable-content"/>
                </div>
            </Transition> 
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: [String, Number]
    },
    value: {
        type: [String, Number]
    },
    group: {
        type: String
    },
    text: {
        type: String
    }
});

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>