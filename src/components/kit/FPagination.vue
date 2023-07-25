<template>
    <div class="px-12 py-4 flex flex-nowrap items-center gap-3">
        <span class="font-semibold">Показано</span>
        <FSelect
            v-model="_itemsPerPage"
            :width="90"
            :items="[
                { text: '10', value: 10 },
                { text: '20', value: 20 },
                { text: '30', value: 30 }
            ]"
            mandatory
        />
        <span class="font-semibold">из {{ length }}</span>
        <div class="flex-grow flex flex-nowrap justify-end items-center gap-2">
            <FArrowButton
                :disabled="value === 1"
                secondary
                reverse
                class="mr-5"
                @click="value > 1 ? value -= 1 : null"
            />
            <template v-if="(pageButtonsCount - 1) < currentPage">
                <button class="w-[38px] h-[38px] rounded-full" @click="value = 1">1</button>
                <FIcon icon="dots"/>
            </template>
            <button
                v-for="(button, index) of pageButtons"
                :key="index"
                :class="{ 'bg-primary text-white': currentPage === button }"
                class="w-[38px] h-[38px] rounded-full"
                @click="value = button"
            >
                {{ button }}
            </button>
            <template v-if="currentPage + (Math.floor(pageButtonsCount / 2) + 1) < pageCount">
                <FIcon icon="dots"/>
                <button class="w-[38px] h-[38px] rounded-full" @click="value = pageCount">{{ pageCount }}</button>
            </template>
            <FArrowButton
                :disabled="value === pageCount"
                secondary 
                class="ml-5"
                @click="value < pageCount ? value += 1 : null"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import FIcon from './FIcon.vue';
import FArrowButton from './FArrowButton.vue';
import FSelect from './FSelect.vue';

const emit = defineEmits(['update:modelValue', 'change']);
const props = defineProps({
    modelValue: {
        type: Number
    },
    itemsPerPage: {
        type: Number,
        default: 10
    },
    length: {
        type: Number
    }
});

const currentPage = ref(1);
const value = computed({
  get() {
    return props.modelValue ?? currentPage.value;
  },
  set(value) {
    currentPage.value = value;
    emit('update:modelValue', value);
    emit('change', value);
  }
});

const _itemsPerPage = ref(props.itemsPerPage);
watch(_itemsPerPage, (newValue, oldValue) => {
    const page = Math.round(value.value * (oldValue / newValue));
    value.value = page < 1 ? 1 : page > pageCount.value ? pageCount.value : page;
});

const pageCount = computed(() => Math.round(props.length / _itemsPerPage.value));
const pageArray = computed(() => {
    const pages = [];

    for(let i = 0; i < pageCount.value; i++) {
        pages.push(i+1);
    }

    return pages;
});

const pageButtonsCount = 5;
const pageButtons = computed(() => {
    const buttonCount = pageButtonsCount;
    const pageIndex = currentPage.value - 1;

    if(currentPage.value - buttonCount < 0) {
        return pageArray.value.slice(0, buttonCount);
    } else if((currentPage.value - 1) + buttonCount > pageArray.value.length) {
        return pageArray.value.slice(pageArray.value.length - buttonCount, pageArray.length)
    } else {
        return pageArray.value.slice(pageIndex - Math.floor(buttonCount / 2), currentPage.value + Math.floor(buttonCount / 2))
    }
});
</script>