<template>
    <img :src="`/icons/${ icon }.svg`" :width="width" :height="height" style="min-width: min-content; min-height: min-content;"/>
</template>
<script setup>
defineProps({
    icon: {
        type: String
    },
    width: {
        type: [String, Number]
    },
    height: {
        type: [String, Number]
    }
});
</script>