<template>
    <div v-if="value">
        <div class="px-7 pb-4 flex flex-wrap gap-4 bg-white filter drop-shadow-lg">
            <slot/>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
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