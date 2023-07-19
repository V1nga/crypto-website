<template>
    <option :value="value" class="rounded-lg">
        <slot>{{ text }}</slot>
    </option>
</template>
<script setup>
const props = defineProps({
    value: {
        type: [String, Number]
    },
    text: {
        type: String
    }
});
</script>