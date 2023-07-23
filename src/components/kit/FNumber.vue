<template>
    <div>{{ sum }}</div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
    number: {
        type: Number,
        required: true
    },
    minimumFractionDigits: {
        type: Number,
        default: 0
    }
});

const sum = computed(() => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: props.minimumFractionDigits }).format(props.number);
});
</script>