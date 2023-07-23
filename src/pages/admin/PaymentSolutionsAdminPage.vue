<template>
    <FPage title="Платёжные решения">
        <template #title-append>
            <div class="w-full flex justify-end">
                <FButton @click="createPaymentSolutionMessageBoxOpen">
                    <FIcon icon="plus" class="mr-3"/>
                    Создать группу
                </FButton>
            </div>
        </template>
        <template #default>
            <FCard>
                <FTable
                    :headers="paymentSolutionsHeaders"
                    :items="paymentSolutionsItems"
                >
                    <template #item-minSum>
                        <FTextField :max-width="140" outlined placeholder="0.00"/>
                    </template>
                    <template #item-maxSum>
                        <FTextField :max-width="140" outlined placeholder="0.00"/>
                    </template>
                    <template #item-edit="{ item }">
                        <div class="text-right pr-8">
                            <FArrowButton secondary @click="createPaymentSolutionDialogOpen(item)"/>
                        </div>
                    </template>
                </FTable>
            </FCard>
            <FMessageBox
                v-model="createPaymentSolutionMessageBoxVisible"
                title="Создать платёжное решение"
            >
                <div class="flex flex-col gap-4">
                    <FTextField outlined label="Название" placeholder="Введите название..."/>
                    <div class="flex flex-nowrap gap-x-4">
                        <FTextField outlined width="50%" label="Минимальная сумма" placeholder="0.00"/>
                        <FTextField outlined width="50%" label="Максимальная сумма" placeholder="0.00"/>
                    </div>
                </div>
            </FMessageBox>
            <FDialog v-model="createPaymentSolutionDialogVisible">
                <div v-if="createPeymentSolutionDialogItem" class="p-6">
                    <div class="text-xl font-bold">{{ createPeymentSolutionDialogItem.name }}</div>
                    <div class="mt-4 flex gap-4">
                        <FTextField
                            v-model="createPeymentSolutionDialogItem.minSum"
                            outlined
                            width="50%"
                            label="Минимальная сумма"
                        />
                        <FTextField
                            v-model="createPeymentSolutionDialogItem.maxSum"
                            outlined
                            width="50%"
                            label="Минимальная сумма"
                        />
                    </div>
                </div>
                <div class="h-full p-6 bg-white">
                    <div class="flex flex-nowrap">
                        <div class="font-bold">Список реквизитов</div>
                        <div class="flex-grow flex justify-end">
                            <FButton base class="text-primary font-bold" @click="createRequisitesMessageBoxOpen">
                                <FIcon icon="plus-primary" class="mr-2"/>
                                Добавить
                            </FButton>
                        </div>
                    </div>
                    <div v-if="requisitesItems.length === 0" class="mt-16 flex flex-wrap justify-center gap-4">
                        <div class="text-center text-secondary font-semibold">Список реквизитов пуст. Добавьте один или несколько реквизитов</div>
                        <FButton @click="createRequisitesMessageBoxOpen">
                            <FIcon icon="plus" class="mr-3"/>
                            Добавить реквизиты
                        </FButton>
                    </div>
                    <div v-else class="mt-2">
                        <div
                            v-for="(requisite, index) of requisitesItems"
                            :key="index"
                            class="group/requisite-row mb-2 cursor-pointer hover:text-primary font-semibold flex flex-nowrap gap-x-3"
                        >
                            {{ requisite.cardNumber }}
                            <FIcon :icon="requisite.cardIssuer"/>
                            <div class="group-hover/requisite-row:block hidden w-[20px]">
                                <FIcon icon="rubbish"/>
                            </div>
                            <div class="font-bold flex-grow flex justify-end whitespace-nowrap">
                                <FNumber :number="requisite.money" :minimum-fraction-digits="2"/>
                                <div class="text-uppercase ml-1">{{ requisite.currency  }}</div>
                            </div>
                        </div>
                    </div>
                    <FMessageBox
                        v-model="createRequisitesMessageBoxVisible"
                        absolute
                        title="Добавить реквизиты"
                    >
                        <div class="flex flex-col gap-4">
                            <div class="flex flex-nowrap gap-x-20">
                                <FRadio value="card">
                                    <div class="ml-2 font-semibold">Карта</div>
                                </FRadio>
                                <FRadio value="crypto">
                                    <div class="ml-2 font-semibold">Крипта</div>
                                </FRadio>
                            </div>
                            <FTextArea
                                label="Номера карт"
                                placeholder="Напишите одну или несколько номеров карт..."
                            />
                        </div>
                    </FMessageBox>
                </div>
            </FDialog>
        </template>
    </FPage>
</template>
<script setup>
import { ref } from 'vue'; 
import FPage from '../../components/layout/FPage.vue';
import FButton from '../../components/kit/FButton.vue';
import FIcon from '../../components/kit/FIcon.vue';
import FCard from '../../components/kit/FCard.vue';
import FTable from '../../components/kit/FTable.vue';
import FTextField from '../../components/kit/FTextField.vue'
import FArrowButton from '../../components/kit/FArrowButton.vue';
import FMessageBox from '../../components/kit/FMessageBox.vue';
import FDialog from '../../components/kit/FDialog.vue';
import FRadio from '../../components/kit/FRadio.vue';
import FTextArea from '../../components/kit/FTextArea.vue';
import FNumber from '../../components/kit/FNumber.vue';

const createPaymentSolutionMessageBoxVisible = ref(false);
const createPaymentSolutionMessageBoxOpen = () => {
    createPaymentSolutionMessageBoxVisible.value = true;
}

const createPeymentSolutionDialogItem = ref(null);
const createPaymentSolutionDialogVisible = ref(false);
const createPaymentSolutionDialogOpen = (item) => {
    createPeymentSolutionDialogItem.value = item;
    createPaymentSolutionDialogVisible.value = true;
}

const createRequisitesMessageBoxVisible = ref(false);
const createRequisitesMessageBoxOpen = () => {
    createRequisitesMessageBoxVisible.value = true;
}
const requisitesItems = ref([
    { cardNumber: '3434 4343 4344 3434', cardIssuer: 'visa', money: '3456.09', currency: 'USD' },
    { cardNumber: '2323 2323 2323 4567', cardIssuer: 'visa', money: '3456.09', currency: 'USD' },
    { cardNumber: '2323 2323 2323 4567', cardIssuer: 'mastercard', money: '456.09', currency: 'USD' },
    { cardNumber: '2323 2323 2323 4567', cardIssuer: 'visa', money: '3456.09', currency: 'EUR' },
    { cardNumber: '2323 2323 2323 4567', cardIssuer: 'visa', money: '3456.09', currency: 'EUR' },
]);

const paymentSolutionsHeaders = [
    { text: 'Название платежного решения', field: 'name' },
    { text: 'Мин. сумма', field: 'minSum' },
    { text: 'Макс. сумма', field: 'maxSum' },
    { text: '', field: 'edit' }
];
const paymentSolutionsItems = [
    { name: 'Платёжное решение 1', minSum: 0, maxSum: 0 },
    { name: 'Платёжное решение 2', minSum: 0, maxSum: 0 },
    { name: 'Платёжное решение 3', minSum: 0, maxSum: 0 },
    { name: 'Платёжное решение 4', minSum: 0, maxSum: 0 },
    { name: 'Платёжное решение 5', minSum: 0, maxSum: 0 },
    { name: 'Платёжное решение 6', minSum: 0, maxSum: 0 },
    { name: 'Платёжное решение 7', minSum: 0, maxSum: 0 }
];
</script>