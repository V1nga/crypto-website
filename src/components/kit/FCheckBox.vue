<template>
    <div class="flex flex-nowrap">
        <div
            class="w-[36px] h-[20px] px-2 py-1 rounded-xl relative"
            :class="[
                { 'bg-primary': value && !disabled },
                { 'bg-[#98A2B333]': !value && !disabled },
                { 'bg-gray-light': disabled }
            ]"
            @click="!disabled ? value = !value : null"
        >
            <div
                class="w-[14px] h-[14px] rounded-full absolute bottom-[3px]"
                :class="[
                    'bg-white',
                    `bg-${ disabled ? '[#D3DAE6]' : 'white' }`,
                    { 'filter drop-shadow-sm': !value && !disabled }
                ]"
                :style="[
                    `${ value ? 'right' : 'left' }: 3px;`,
                ]"
            />
        </div>
        <div v-if="$slots.default" class="ml-2 text-sm font-semibold">
            <slot/>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: null
    },
    disabled: {
        type: Boolean
    }
});

const checked = ref(false);
const value = computed({
  get() {
    return props.modelValue ?? checked.value;
  },
  set(value) {
    checked.value = value;
    emit('update:modelValue', value);
  }
});
</script>