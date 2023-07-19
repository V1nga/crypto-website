<template>
    <FDialog v-model="visible" class="text-dark">
        <div class="text-center py-12">
            <slot name="header-prepend" :transaction="transaction"/>
            <slot name="header" :transaction="transaction">
                <FMoney :money="money" :currency="currency" :color="moneyColor" textSize="5xl" slug-text-size="2xl"/>
                <div class="flex flex-nowrap justify-center mt-4">
                    <slot name="header-status" :status-color="statusColor" :status-text="statusText">
                        <FChip v-bind:[statusColor]=true>{{ statusText }}</FChip>
                    </slot>
                    <div class="text-dark font-semibold ml-2">
                        <slot name="header-date" :date="statusDate">{{ statusDate }}</slot>
                    </div>
                </div>
            </slot>
            <slot name="header-append"/>
        </div>
        <div class="bg-white p-4">
            <slot>
                <slot name="transaction-id" :transaction="transaction">
                    <p class="text-secondary">ID транзакции</p>
                    <p class="text-2xl font-bold">{{ transactionId }}</p>
                </slot>

                <div class="mt-4 grid grid-cols-2 gap-y-2 text-md text-dark">
                    <template
                        v-for="(header, index) of headers"
                        :key="index"
                    >
                        <p class="font-bold">
                            {{ header.text }}
                        </p>
                        <p class="font-semibold">
                            <slot :name="`transaction-${ header.field }`" :transaction="transaction">{{ transaction[header.field] }}</slot>
                        </p>
                    </template>
                </div>
            </slot>
        </div>
        <div class="px-4 py-6">
            <p class="font-bold text-xl mb-5">Комментарии</p>
            <div v-for="(comment, index) of comments" :key="index" class="mb-10">
                <slot name="comment-prepend" :comment="comment"/>
                <slot name="comment" :comment="comment">
                    <p class="text-primary font-bold">
                        <slot name="comment-login" :comment="comment">
                            {{ comment.login }} <span class="text-dark">оставил комментарий</span>
                        </slot>
                    </p>
                    <p class="text-secondary font-semibold">
                        <slot name="comment-date" :comment=comment>{{ comment.date }}</slot>
                    </p>
                    <FCard class="mt-2 font-semibold">
                        <slot name="comment-text" :comment="comment">{{ comment.text }}</slot>                       
                    </FCard>
                </slot>
                <slot name="comment-append" :comment="comment"/>
            </div>
        </div>
        <template #footer>
            <div class="p-3">
                <FTextField placeholder="Оставить комментарий...">
                    <template #prepend>
                        <button>
                            <FIcon icon="clip" class="ml-2 mr-5 my-1"/>
                        </button>
                    </template>
                    <template #append>
                        <button>
                            <FIcon icon="paper-airplane" class="mr-2"/>
                        </button>
                    </template>
                </FTextField>
            </div>
        </template>
    </FDialog>
</template>
<script setup>
import { computed } from 'vue';
import FDialog from '../kit/FDialog.vue';
import FMoney from '../kit/FMoney.vue';
import FChip from '../kit/FChip.vue';
import FCard from '../kit/FCard.vue';
import FIcon from '../kit/FIcon.vue';
import FTextField from '../kit/FTextField.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    money: {
        type: [String, Number],
        required: true
    },
    moneyColor: {
        type: String,
        default: 'primary'
    },
    currency: {
        type: [String, Number],
        required: true
    },
    statusText: {
        type: [String, Number],
        required: true
    },
    statusColor: {
        type: String,
        required: true
    },
    statusDate: {
        type: String,
        required: true
    },
    headers: {
        type: Array,
        required: true
    },
    transaction: {
        type: Object,
        required: true
    },
    transactionId: {
        type: [String, Number],
        required: true
    },
    comments: {
        type: Array,
        default: []
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
</script>