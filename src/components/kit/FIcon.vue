<template>
    <img :src="`/icons/${ icon }.svg`" :width="width" :height="height"/>
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