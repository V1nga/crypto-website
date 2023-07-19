<template>
    <div class="font-bold text-dark mb-6" :class="`text-${ size }`">
        <slot/>
    </div>
</template>
<script setup>
defineProps({
    size: {
        type: String,
        default: 'lg'
    }
});
</script>