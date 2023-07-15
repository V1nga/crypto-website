<template>
    <div class="filter drop-shadow-xl" :class="cardClasses">
        <slot/>
    </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
    color: {
        type: String,
        default: 'white'
    },
    rounded: {
        type: String,
        default: 'lg'
    },
    noPaddings: {
        type: Boolean
    }
});

const cardClasses = computed(() => [
    `bg-${ props.color }`,
    `rounded-${ props.rounded}`,
    props.noPaddings ? '' : 'p-4'
]);
</script>