<template>
    <div>
        <div
            v-if="title || $slots.title || $slots['title-prepend' || $slots['title-append'] || $slots['title-footer']]"
            class="px-7 py-4 bg-white sm:filter sm:drop-shadow"
        >
            <div
                v-if="title || $slots.title || $slots['title-prepend'] || $slots['title-append']"
                class="flex flex-wrap md:flex-nowrap items-center gap-4"
            >
                <slot name="title-prepend"/>
                <div v-if="title || $slots.title" class="font-bold text-xl my-2 whitespace-nowrap">
                    <slot name="title">{{ title }}</slot>       
                </div>
                <slot name="title-append"/>
            </div>
            <div  v-if="$slots['title-footer']">
                <slot name="title-footer"/>
            </div>
        </div>
        <div class="h-full flex flex-col">
            <div class="sm:p-6 2xl:p-10 grid grid-cols-1">
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