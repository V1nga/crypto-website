<template>
    <FMakeSize
        :min-width="minWidth"
        :min-height="minHeight"
        :width="width"
        :height="height"
        :max-width="maxWidth"
        :max-height="maxHeight"

        :class="{ 'relative': scroll }" class="h-full"
    >
        <div :class="{ 'absolute': scroll }" class="h-full overflow-y-auto">
            <div
                v-for="(item, index) of items"
                :key="index"
                class="cursor-pointer"
                @mouseover="onMouseOver(index)"
                @mouseleave="onMouseLeave(index)"
                @click="onClickSelect(item)"
            >
                <slot
                    name="item"
                    :item="item"
                    :is-mouse-over="isMouseOver && isMouseOver[index]"
                    :is-selected="(value || (selectedItem && selectedItem[itemValue])) === item[itemValue]"
                >
                    {{ item }}
                </slot>
            </div>
        </div>
    </FMakeSize>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import MakeSizeProps from '../../props/MakeSizeProps';
import FMakeSize from './FMakeSize.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    scroll: {
        type: Boolean
    },
    mandatory: {
      type: Boolean
    },
    items: {
        type: Array
    },
    itemTitle: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    ...MakeSizeProps,
    minHeight: {
        type: [String, Number],
        default: 300
    }
});

const isMouseOver = ref({});
const onMouseOver = (index) => {
    isMouseOver.value[index] = true;
};
const onMouseLeave = (index) => {
    isMouseOver.value[index] = false;
};

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