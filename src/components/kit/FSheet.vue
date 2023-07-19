<template>
    <div :style="style">
        <slot/>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import makeSizeProps from '../../props/MakeSizeProps';

const props = defineProps({
    ...makeSizeProps
});

const style = computed(() => {
    const styles = [];

    if(props.minWidth) {
        styles.push(`minWidth: ${ props.minWidth }${ Number.isInteger(props.minWidth) ? 'px' : '' }`);
    }
    if(props.minHeight) {
        styles.push(`minHeight: ${ props.minHeight }${ Number.isInteger(props.minHeight) ? 'px' : '' }`);
    }
    if(props.width) {
        styles.push(`width: ${ props.width }${ Number.isInteger(props.width) ? 'px' : '' }`);
    }
    if(props.height) {
        styles.push(`height: ${ props.height }${ Number.isInteger(props.height) ? 'px' : '' }`);
    }
    if(props.maxWidth) {
        styles.push(`maxWidth: ${ props.maxWidth }${ Number.isInteger(props.maxWidth) ? 'px' : '' }`);
    }
    if(props.maxWidth) {
        styles.push(`maxWidth: ${ props.maxWidth }${ Number.isInteger(props.maxWidth) ? 'px' : '' }`);
    }

    return styles;
});
</script>