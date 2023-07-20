<template>
    <div
        v-show="visible"
        :class="absolute ? 'absolute' : 'fixed'"
        class="f-messagebox-overlay flex justify-center items-center"
    >
        <FCard :width="width" no-paddings class="filter drop-shadow-5xl">
            <slot name="body">
                <FCardTitle v-if="title" class="m-5">{{ title }}</FCardTitle>
                <div class="mx-5">
                    <slot/>
                </div>
                <div class="f-messagebox-buttons mt-4 px-5 py-3 flex flex-nowrap justify-end gap-x-2">
                    <FButton light @click="onClickCancel">Отменить</FButton>
                    <FButton @click="onClickApply">Применить</FButton>
                </div>
            </slot>
        </FCard>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import FCard from './FCard.vue';
import FCardTitle from './FCardTitle.vue';
import FButton from './FButton.vue';
import MakeSizeProps from '../../props/MakeSizeProps';

const emit = defineEmits(['update:modelValue', 'click:cancel', 'click:apply']);
const props = defineProps({
    modelValue: {
        type: Boolean
    },
    title: {
        type: String
    },
    absolute: {
        type: Boolean
    },
    width: {
        type: [String, Number],
        default: 430
    }
});

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

const onClickCancel = () => {
    visible.value = false;
    emit('click:cancel');
};
const onClickApply = () => {
    visible.value = false;
    emit('click:apply');
};
</script>
<style scoped>
.f-messagebox-overlay {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FFFFFFB2;
    z-index: 101;
}

.f-messagebox-buttons {
    box-shadow: 0px -3px 6px 0px #0000000D;
}
</style>