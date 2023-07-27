<template>
    <FMakeSize
        :min-width="minWidth"
        :min-height="minHeight"
        :width="width"
        :height="height"
        :max-width="maxWidth"
        :max-height="maxHeight"
        
        class="f-card drop-shadow-none"
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
    props.noShadowsMobile ? 'sm:drop-shadow-md' : 'drop-shadow-none f-card-shadow'
]);
</script>
<style scoped>
.f-card-shadow { 
    box-shadow: 0px 2px 8px 0px #14172514;
}
</style>