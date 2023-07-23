<template>
    <div>
        <div v-if="title || $slots.title || $slots['title-prepend'] || $slots['title-append']" class="flex flex-nowrap items-center bg-white px-7 py-4 filter drop-shadow">
            <slot name="title-prepend"/>
            <div v-if="title || $slots.title" class="font-bold text-xl my-2 whitespace-nowrap">
                <slot name="title">{{ title }}</slot>       
            </div>
            <slot name="title-append"/>
        </div>
        <div class="h-full flex flex-col">
            <div class="p-6 2xl:p-10 grid grid-cols-1">
                <slot/>
            </div>
            <div class="order-first">
                <slot name="body-prepend"/>
            </div>
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