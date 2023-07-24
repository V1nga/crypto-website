<template>
    <div v-if="value">
        <div class="px-7 pb-4 hidden lg:flex flex-wrap gap-4 bg-white filter drop-shadow-lg">
            <slot/>
        </div>
        <div class="p-5 w-full fixed left-0 bottom-0 bg-white rounded-t-xl lg:hidden filters-shadow z-50">
          <div class="flex flex-nowrap">
            <div class="font-bold">Фильтры</div>
            <div class="flex-grow flex justify-end">
              <button @click="value = !value">
                <FIcon icon="close"/>
              </button>
            </div>
          </div>
          <div class="mt-4">
            <slot name="mobile"/>
          </div>
          <div class="mt-4 flex flex-nowrap gap-4">
            <FButton light class="flex-grow">Отменить</FButton>
            <FButton class="flex-grow">Применить</FButton>
          </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import FIcon from '../kit/FIcon.vue';
import FButton from '../kit/FButton.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: Boolean
    }
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>
<style scoped>
.filters-shadow {
  box-shadow: 0px -25px 56px 0px #0000001D;
}
</style>