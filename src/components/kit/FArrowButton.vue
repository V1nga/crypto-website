<template>
    <button
      :disabled="disabled"
      :class="buttonClasses"
      class="font-bold"
      @mouseover="onMouseOver"
      @mouseleave="onMouseLeave"
    >
      <div class="flex flex-nowrap">
        <slot>{{ text }}</slot>
        <img :src="`/icons/${ buttonColor.icon }.svg`" class="ml-3"/>
      </div>
    </button>
</template>
<script setup>
import { ref, computed } from 'vue';

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
        icon: props.secondary ? 'arrow-secondary' : 'arrow-primary'
    };

    if(props.disabled) {
        color.text = 'secondary';
        color.icon = 'arrow-secondary';
    } else if(isMouseOver.value || props.active) {
        color.text = 'primary-dark';
        color.icon = 'arrow-primary-dark';
    }

    return color;
});

const buttonClasses = computed(() => [
    `text-${ buttonColor.value.text }`
]);
</script>