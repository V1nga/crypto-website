<template>
    <div :class="`text-${ color } font-${ fontWeight }`">
        <span :class="`text-${ textSize }`">
            <slot>{{ sum?.toString().split(".")[0] }}</slot>
        </span>
        <span :class="`text-${ slugTextSize }`">
            <span>.{{ sum?.toString().split(".")[1] }}</span>
            <span class="ml-1">
                <slot name="currency">{{ currency }}</slot>
            </span>
        </span>
    </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
    money: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'primary-dark'
    },
    textSize: {
        type: String,
        default: '4xl'
    },
    slugTextSize: {
        type: String,
        default: 'xl'
    },
    fontWeight: {
        type: String,
        default: 'semibold'
    }
});

const sum = computed(() => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(props.money);
});

</script>