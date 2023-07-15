<template>
    <div :class="chipClasses" class="px-2 rounded-md font-bold text-sm w-min">
        <slot/>
    </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
    success: {
        type: Boolean
    },
    danger: {
        type: Boolean
    },
    warning: {
        type: Boolean
    },
    secondary: {
        type: Boolean
    }
});

const chipColor = computed(() => {
    let color = { text: 'dark', background: 'gray' }

    if(props.success) {
        color.text = 'success';
        color.background = 'success-light';
    } else if(props.danger) {
        color.text = 'danger';
        color.background = 'danger-light';
    } else if(props.warning) {
        color.text = 'warning';
        color.background = 'warning-light';
    }

    return color;
});

const chipClasses = computed(() => [
    `bg-${ chipColor.value.background }`,
    `text-${ chipColor.value.text }`
]);
</script>