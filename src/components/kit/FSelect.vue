<template>
    <FInputBase
        :min-width="minWidth"
        :min-height="minHeight"
        :width="width"
        :height="height"
        :max-width="maxWidth"
        :max-height="maxHeight"
        :label="label"
        class="relative"
    >
        <template #label>
            <slot name="label"/>
        </template>
        <template #default>
            <div
                v-click-out-side="hideSelectMenu"
                @click="toggleShowSelectMenu"
            >
              <slot name="input" :is-menu-visible="isMenuVisible" :item="selectedItem">
                <div
                  class="p-2 cursor-pointer border-[1px] border-secondary-light rounded-xl flex bg-white"
                  :class="{ 'border-primary': isMenuVisible }"
                >
                  <div class="pl-1 w-full whitespace-nowrap text-left" :class="`text-${ textSize } font-${ fontSize }`">
                    <template v-if="selectedItem">
                      <slot name="selected-item" :item="selectedItem">
                        {{ selectedItem[itemTitle] }}
                      </slot>
                    </template>
                    <template v-else>
                      {{ placeholder ?? 'Выберите' }}
                    </template>
                  </div>
                  <FIcon :icon="isMenuVisible ? 'arrow-down-primary' : 'arrow-down-secondary'" class="mx-2"/>
                </div>
              </slot>
            </div>
            <div
                v-show="isMenuVisible"
                class="f-select-menu mt-2 p-2 rounded-xl absolute filter drop-shadow-2xl bg-white w-full flex flex-col gap-y-2"
              >
                <div
                  v-for="(item, index) of items"
                  :key="index"
                  class="p-2 text-left font-semibold rounded-xl cursor-pointer"
                  :class="{ 'bg-primary-light text-primary': (value || (selectedItem && selectedItem[itemValue])) === item[itemValue] }"
                  @click="onClickSelect(item)"
                >
                  <slot name="item" :item="item">{{ item[itemTitle] }}</slot>
                </div>
              </div>
        </template>
    </FInputBase>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { clickOutSide as vClickOutSide } from '@mahdikhashan/vue3-click-outside';
import MakeSizeProps from '../../props/MakeSizeProps';
import FInputBase from './FInputBase.vue';
import FIcon from '../../components/kit/FIcon.vue';

const emit = defineEmits(['update:modelValue', 'change']);
const props = defineProps({
    modelValue: {
        type: [String, Number]
    },
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    mandatory: {
      type: Boolean
    },
    textSize: {
      type: String,
      default: 'sm'
    },
    fontSize: {
      type: String,
      default: 'semibold'
    },
    items: {
      type: Array,
      default: []
    },
    itemTitle: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    ...MakeSizeProps
});

const isMenuVisible = ref(false);
const toggleShowSelectMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
}
const hideSelectMenu = () => {
  isMenuVisible.value = false;
}

const selectedItem = ref(null);
const onClickSelect = (item) => {
  selectedItem.value = item;
  value.value = item[props.itemValue];
};

const value = computed({
  get() {
    if(selectedItem != props.modelValue) {
      selectedItem.value = props.items.find(item => props.modelValue === item[props.itemValue]);
    }

    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
    emit('change', value);
  }
});

onMounted(() => {
  if(props.modelValue) {
    selectedItem.value = props.items.find(item => props.modelValue === item[props.itemValue]);
  } else if (props.mandatory) {
    selectedItem.value = props.items?.length > 0 ? props.items[0] : null;
    value.value = selectedItem.value[props.itemValue];
  }
});
</script>
<style scoped>
.f-select-menu {
  z-index: 102;
}
</style>