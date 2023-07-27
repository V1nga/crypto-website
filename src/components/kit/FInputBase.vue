<template>
    <FMakeSize
        :min-width="minWidth"
        :min-height="minHeight"
        :width="width"
        :height="height"
        :max-width="maxWidth"
        :max-height="maxHeight"
    >
        <div v-if="label || $slots.label" class="text-left text-xs text-dark font-semibold mb-1">
            <slot name="label">{{ label }}</slot>
        </div>
        <slot/>
    </FMakeSize>
</template>
<script setup>
import MakeSizeProps from '../../props/MakeSizeProps';
import FMakeSize from '../../components/kit/FMakeSize.vue';

const props = defineProps({
    label: {
      type: String
    },
    ...MakeSizeProps
});
</script>