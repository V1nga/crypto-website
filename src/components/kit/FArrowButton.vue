<template>
    <button
      :disabled="disabled"
      :class="buttonClasses"
      class="font-bold"
      @mouseover="onMouseOver"
      @mouseleave="onMouseLeave"
    >
      <div class="flex flex-nowrap px-3 py-2" :class="{ 'rounded-lg bg-primary-light': active }">
        <slot>{{ text }}</slot>
        <FIcon :icon="buttonColor.icon" :class="!!$slots.default || text ? 'ml-3' : ''"/>
      </div>
    </button>
</template>
<script setup>
import { ref, computed } from 'vue';
import FIcon from './FIcon.vue';

const props = defineProps({
    text: {
        type: String
    },
    secondary: {
        type: Boolean
    },
    disabled: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean
    },
    reverse: {
        type: Boolean
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
        text: props.secondary ? 'secondary' : 'primary',
        icon: props.secondary ? `arrow-${ props.reverse ? 'left' : 'right' }-secondary` : `arrow-${ props.reverse ? 'left' : 'right' }-primary`
    };

    if(props.disabled) {
        color.text = 'secondary';
        color.icon =  `arrow-${ props.reverse ? 'left' : 'right' }-secondary`;
    } else if(isMouseOver.value || props.active) {
        color.text = 'primary-dark';
        color.icon = `arrow-${ props.reverse ? 'left' : 'right' }-primary-dark`;
    }

    return color;
});

const buttonClasses = computed(() => [
    `text-${ buttonColor.value.text }`
]);
</script>