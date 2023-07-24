<template>
    <div class="rounded-xl font-semibold bg-active flex flex-nowrap gap-x-1">
        <div
            v-for="(item, index) of items"
            :key="index"
            :class="{ 'text-white bg-primary': index === selectedItem }"
            class="p-2 px-4 cursor-pointer whitespace-nowrap rounded-xl flex items-center flex-nowrap"
            @click="value = index"
        >
            {{  item  }}
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";

const emit = defineEmits(['update:modelValue', 'change']);
const props = defineProps({
    modelValue: {
        type: Number
    },
    items: {
        type: Array
    }
});

const selectedItem = ref(0);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    selectedItem.value = value;
    emit('update:modelValue', value);
    emit('change', value);
  }
});

onMounted(() => {
    if(!props.modelValue) {
        value.value = 0;
    }
});
</script>