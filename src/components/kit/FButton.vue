<template>
    <button
        :disabled="disabled"
        :class="buttonClasses"
        class="px-4 py-2 font-bold rounded-xl"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
    >
        <div class="flex flex-nowrap whitespace-nowrap" :class="buttonContentClasses">
            <slot name="prepend" :isMouseOver="isMouseOver" :isActive="active"/>
            <slot :isMouseOver="isMouseOver" :isActive="active">{{ text }}</slot>
            <slot name="append" :isMouseOver="isMouseOver"/>
        </div>
    </button>
</template>
<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    text: {
        type: String
    },
    color: {
        type: String
    },
    textColor: {
        type: String
    },
    light: {
        type: Boolean,
        deafult: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    fill: {
        type: Boolean
    },
    active: {
        type: Boolean
    },
    contentAlign: {
        type: String,
        default: 'center'
    }
});

const isMouseOver = ref(false);
const onMouseOver = () => {
    isMouseOver.value = true;
};
const onMouseLeave = () => {
    isMouseOver.value = false;
};

const buttonColor = computed(() => {
    if(props.disabled) {
        return 'gray-light';
    } else if(isMouseOver.value || props.active) {
        return props.light ? 'primary-light-2' : 'primary-dark';
    } else if(props.color) {
        return props.color;
    } else {
        return props.light ? 'primary-light' : 'primary';
    }
});
const buttonTextColor = computed(() => {
    if(props.disabled) {
        return 'placeholder';
    } else if(isMouseOver.value || props.active) {
        return props.light ? 'primary-dark' : 'white';
    } else if(props.textColor) {
        return props.textColor;
    } else {
        return props.light ? 'primary' : 'white';
    }
});
const buttonClasses = computed(() => [
    props.fill ? 'w-full' : '',
    `bg-${ buttonColor.value }`,
    `text-${ buttonTextColor.value }`
]);
const buttonContentClasses = computed(() => [
    `place-content-${ props.contentAlign }`
])  
</script>