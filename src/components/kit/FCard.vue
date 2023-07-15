<template>
    <div class="filter drop-shadow-xl p-4" :class="cardClasses">
        <slot/>
    </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
    color: {
        type: String,
        default: "white"
    },
    rounded: {
        type: String,
        default: "lg"
    }
});

const cardClasses = computed(() => [
    `bg-${ props.color }`,
    `rounded-${ props.rounded}`
]);
</script>