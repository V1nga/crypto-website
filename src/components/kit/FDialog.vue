<template>
    <transition name="slide-x-reverse">
        <div
            v-show="visible"
            v-click-out-side="onClickClose"
            class="f-dialog bg-active w-min max-w-full h-screen overflow-y-auto"           
            :style="`width: ${ width }${ Number.isInteger(width) ? 'px' : '' };`"
        >
            <slot/>
            <div class="f-dialog-footer">
                <slot name="footer"/>
            </div>
            <button class="f-dialog-close-btn" @click="onClickClose">
                <FIcon icon="close"/>
            </button>
        </div>
    </transition>
</template>
<script setup>
import { ref, computed } from 'vue';
import FIcon from './FIcon.vue';
import { clickOutSide as vClickOutSide } from '@mahdikhashan/vue3-click-outside';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: Boolean
    },
    width: {
        type: [Number, String],
        default: 580
    }
});

const dialogLoaded = ref(false);
const visible = computed({
  get() {
    if(props.modelValue) {
        setTimeout(() => {
            dialogLoaded.value = true;
        }, 100);
    }

    return props.modelValue;
  },
  set(value) {
    dialogLoaded.value = value;
    emit('update:modelValue', value);
  }
});

const onClickClose = () => {
    if(dialogLoaded.value) {
        visible.value = false;
    }
}
</script>
<style scoped>
.f-dialog {
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: -10px 4px 24px 0px #00000026;
    z-index: 100;
}
.f-dialog::-webkit-scrollbar {
    width: 0;
}

.f-dialog-close-btn {
    position: absolute;
    top: 26px;
    right: 26px;
}

.f-dialog-footer {
    position: sticky;
    bottom: 0;
}
</style>