<template>
    <div>
        <div v-if="title || $slots.title" class="flex items-center bg-white px-7 py-4 filter drop-shadow">
            <div class="font-bold text-xl">
                <slot name="title">{{ title }}</slot>       
            </div>
            <slot name="title-append"/>
        </div>
        <div class="p-6 2xl:p-10 grid grid-cols-1">
            <slot/>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String
    }
});
</script>