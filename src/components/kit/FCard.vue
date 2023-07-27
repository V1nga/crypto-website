<template>
    <FMakeSize
        :min-width="minWidth"
        :min-height="minHeight"
        :width="width"
        :height="height"
        :max-width="maxWidth"
        :max-height="maxHeight"
        
        class="filter"
        :class="cardClasses"
    >
        <slot/>
    </FMakeSize>
</template>
<script setup>
import { computed } from 'vue';
import FMakeSize from './FMakeSize.vue';
import MakeSizeProps from '../../props/MakeSizeProps';

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
    },
    noShadowsMobile: {
        type: Boolean
    },
    ...MakeSizeProps
});

const cardClasses = computed(() => [
    `bg-${ props.color }`,
    `rounded-${ props.rounded}`,
    props.noPaddings ? '' : 'p-4',
    props.noShadowsMobile ? 'drop-shadow-none sm:drop-shadow' : 'drop-shadow'
]);
</script>