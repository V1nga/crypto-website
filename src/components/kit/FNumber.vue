<template>
    <div>{{ sum }}</div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
    number: {
        type: Number,
        required: true
    }
});

const sum = computed(() => {
    return new Intl.NumberFormat("en-US").format(props.number);
});
</script>