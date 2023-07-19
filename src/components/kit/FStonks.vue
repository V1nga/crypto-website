<template>
    <div class="flex font-semibold text-lg">
        <FIcon :icon="number > 0 ? 'stonks' : 'not-stonks'"/>

        <div :class="number > 0 ? 'text-success' : 'text-danger'" class="ml-2">
            <span>
                <slot name="prepend">
                    {{ number > 0 ? "+" : "" }}
                </slot>
            </span>
            <span>
                <slot>{{ number }}</slot>
            </span>
            <span v-if="append">
                {{ append }}
            </span>
        </div>
    </div>
</template>
<script setup>
import FIcon from './FIcon.vue';

defineProps({
    number: {
        type: Number
    },
    append: {
        type: String
    }
});
</script>