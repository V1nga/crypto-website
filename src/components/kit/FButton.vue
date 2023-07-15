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
    let color = {
        text: props.textColor ?? (props.light ? 'primary' : 'white'),
        background: props.color ?? (props.light ? 'primary-light' : 'primary')
    };

    if(props.disabled) {
        color.text = 'placeholder';
        color.background = 'gray-light';
    } else if(isMouseOver.value || props.active) {
        color.text = props.light ? 'primary-dark' : 'white';
        color.background = props.light ? 'primary-light-2' : 'primary-dark'
    }

    return color;
});

const buttonClasses = computed(() => [
    props.fill ? 'w-full' : '',
    `bg-${ buttonColor.value.background }`,
    `text-${ buttonColor.value.text }`
]);
const buttonContentClasses = computed(() => [
    `place-content-${ props.contentAlign }`
])  
</script>