<template>
    <button
        :disabled="disabled"
        :class="base ? null : buttonClasses"
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
    hoverColor: {
        type: String,
    },
    hoverTextColor: {
        type: String
    },
    base: {
        type: Boolean
    },
    light: {
        type: Boolean,
        deafult: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    square: {
        type: Boolean
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
        color.text = props.hoverTextColor ?? (props.light ? 'primary-dark' : 'white');
        color.background = props.hoverColor ?? (props.light ? 'primary-light-2' : 'primary-dark');
    }

    return color;
});

const buttonClasses = computed(() => [
    'py-2 font-bold rounded-xl outline-0',
    props.fill ? 'w-full' : '',
    `bg-${ buttonColor.value.background }`,
    `text-${ buttonColor.value.text }`,
    `px-${ props.square ? 3 : 4 }`
]);
const buttonContentClasses = computed(() => [
    `place-content-${ props.contentAlign }`
])  
</script>
<style scoped>
</style>