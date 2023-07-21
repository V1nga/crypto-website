<template>
    <FPage title="Диспуты">
        <template #title-append>
            <div class="w-full flex justify-end gap-x-4">
                <FButton light @click="isFiltersVisible = !isFiltersVisible">
                    <div class="flex flex-nowrap gap-x-2">
                        <FIcon icon="pyramid-down"/>
                        <span>{{ isFiltersVisible ? 'Скрыть' : 'Показать' }} фильтр</span>
                    </div>
                </FButton>
            </div>
        </template>
        <template #body-prepend>            
            <div v-show="isFiltersVisible" class="px-7 pb-4 flex flex-wrap gap-4 bg-white filter drop-shadow-lg">
                <div class="border-[1px] border-primary-light w-full"/>
                <FTextField outlined placeholder="Искать по ID, реквизитам или email" width="100%">
                    <template #prepend>
                        <FIcon icon="search" class="ml-1"/>
                    </template>
                </FTextField>
                <FSelect
                    :max-width="200"                    
                    :items="[{ text: 'На рассмотрении', value: 'pending' }, { text: 'Отклонен', value: 'canceled' }, { text: 'Одобрен', value: 'success' }]"
                    placeholder="Статус"
                    class="flex-grow"
                />
                <FDatePicker
                    v-model="datePickerValue"
                    :max-width="280"
                    range
                    class="flex-grow"
                />       
                <FSelect
                    :max-width="200"                    
                    :items="[{ text: 'USDT', value: 'usdt' }]"
                    placeholder="Валюта"
                    class="flex-grow"
                />
                <FSelect
                    :max-width="200"                    
                    :items="[{ text: 'На карту', value: 'card' }]"
                    placeholder="Метод оплаты"
                    class="flex-grow"
                />
                <div class="flex-grow flex flex-nowrap items-center justify-end gap-x-2 text-dark font-semibold">
                    Сумма от:
                    <FTextField :max-width="90" outlined placeholder="00"/>
                    до
                    <FTextField :max-width="90" outlined placeholder="00"/>
                </div>
            </div>
        </template>
        <template #default>
            <FCard no-paddings>
                <FTable :headers="disputsHeaders" :items="disputsItems">
                    <template #item-requisites="{ item }">
                        <div class="flex flex-nowrap">
                            {{ item.requisites }}
                            <FIcon :icon="item.cardIssuer" class="ml-2"/>
                        </div>
                    </template>
                    <template #item-status="{ item }">
                        <div>
                            <FChip v-bind:[item.statusColor]=true>{{ item.status }}</FChip>
                            <div class="flex flex-nowrap text-secondary font-bold text-sm mt-1">{{ item.statusDate }}</div>
                        </div>
                    </template>
                    <template #item-edit="{ item }">
                        <div class="text-right pr-8">
                            <FArrowButton secondary @click="openDialog(item)"/>
                        </div>
                    </template>
                </FTable>
            </FCard>
            <TransactionDialog
                v-if="dialogData"
                v-model="dialogVisible"
                :money="12987.87"
                money-color="danger"
                :currency="'USDT'"
                :status-text="dialogData.status"
                :status-color="dialogData.statusColor"
                :status-date="dialogData.statusDate"
                :transaction="dialogData"
                :transaction-id="dialogData.id"
                :headers="[
                    { text: 'ID клиента', field: 'clientId' },
                    { text: 'Статус диспута', field: 'status' },
                    { text: 'Дата / время закрытия', field: 'closeDate' },
                    { text: 'Дата создания', field: 'createDate' },
                    { text: 'Метод закрытия', field: 'method' },
                    { text: 'Кем закрыто', field: 'closer' },
                    { text: 'Реквизиты', field: 'requisites' }
                ]"
                :comments="comments"
            >
                <template #header-append>
                    <div class="whitespace-nowrap mt-1">
                        <span class="font-bold text-dark mr-1">Кем изменен статус:</span>
                        <span class="font-semibold text-primary">{{ dialogData.closer }}</span>
                    </div>
                </template>
                <template #transaction-id="{ transaction }">
                    <div class="grid grid-cols-2">
                        <div>
                            <p class="text-secondary font-semibold">ID транзакции</p>
                            <p class="text-2xl font-bold">{{ transaction.transactionId }}</p>
                        </div>
                        <div>
                            <p class="text-secondary font-semibold">ID диспута</p>
                            <p class="text-2xl font-bold">{{ transaction.id }}</p>
                        </div>
                    </div>
                </template>
                <template #transaction-status="{ transaction }">                
                    <div class="flex">
                        <FChip v-bind:[transaction.statusColor]=true>{{ transaction.status }}</FChip>
                        <div class="w-full flex justify-end">
                            <button>
                                <FIcon icon="pencil"/>
                            </button>
                        </div>
                    </div>
                </template>
                <template #transaction-closer="{ transaction }">
                    <div class="text-primary">{{ transaction.closer }}</div>
                </template>
                <template #transaction-requisites="{ transaction }">
                    <div class="font-semibold flex flex-nowrap">
                        {{ transaction.requisites }}
                        <FIcon :icon="transaction.cardIssuer" class="ml-2"/>
                    </div>
                </template>
                <template #comment-login="{ comment }">
                    <div class="flex flex-nowrap whitespace-nowrap items-center gap-x-1">
                        {{ comment.login }}
                        <span class="text-dark">изменил статус с</span>
                        <FChip v-bind:[comment.previousStatusColor]=true>{{ comment.previousStatus }}</FChip>
                        <span class="text-dark">на</span>
                        <FChip v-bind:[comment.statusColor]=true>{{ comment.status }}</FChip>
                    </div>
                </template>
                <template #comment-append="{ comment }">
                    <FCard
                        v-for="(attachment, index) of comment.attachments"
                        :key="index"
                        no-paddings
                        class="mt-2 px-4 py-2 flex flex-nowrap items-center"
                    >
                        <div class="whitespace-nowrap">
                            <p class="font-bold">{{ attachment.fileName }}</p>
                            <p class="font-semibold text-secondary">{{ attachment.fileSize }}</p>
                        </div>
                        <div class="flex justify-end w-full">
                            <button>
                                <FIcon icon="rubbish"/>
                            </button>
                        </div>
                    </FCard>
                </template>
            </TransactionDialog>
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
import FChip from '../../components/kit/FChip.vue';
import FArrowButton from '../../components/kit/FArrowButton.vue';
import FTextField from '../../components/kit/FTextField.vue';
import TransactionDialog from '../../components/layout/TransactionDialog.vue';
import FSelect from '../../components/kit/FSelect.vue';
import FTimePicker from '../../components/kit/FTimePicker.vue';
import FDatePicker from '../../components/kit/FDatePicker.vue';

const dialogData = ref(null);
const dialogVisible = ref(false);
const openDialog = (data) => {
    dialogData.value = data;
    dialogVisible.value = !dialogVisible.value;
};

const datePickerValue = ref(null);

const isFiltersVisible = ref(false);

const comments = [
    { login: "email@email.com", date: "23.09.2020 23:00", status: 'Обработка', statusColor: 'warning', previousStatus: 'Созданная заявка', previousStatusColor: 'secondary', text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet", attachments: [ { fileName: 'чек об оплате.jpeg', fileSize: '2.57 MB' } ] },
];
const disputsHeaders = [
  { text: 'ID диспута', field: 'id' },
  { text: 'ID транзакции', field: 'transactionId' },
  { text: 'Метод', field: 'method' },
  { text: 'Реквизиты', field: 'requisites' },
  { text: 'Сумма вывода', field: 'sum' },
  { text: 'Курс вывода', field: 'exchangeRate' },
  { text: 'Дата созд. диспута', field: 'createDate' },
  { text: 'Статус диспута', field: 'status' },
  { text: '', field: 'edit' }
];
const disputsItems = [
    { id: '32432432', clientId: '324324324234', closeDate: '02.09.2022 09:56', closer: 'email@email.com', transactionId: '3434234', method: 'На карту', requisites: '*4567', cardIssuer: 'mastercard', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 22:34', status: 'Новый диспут', statusColor: 'secondary' },
    { id: '32432432', clientId: '324324324234', closeDate: '02.09.2022 09:56', closer: 'email@email.com', transactionId: '3434234', method: 'На карту', requisites: '*4567', cardIssuer: 'mastercard', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 22:34', status: 'Отклонено', statusColor: 'danger' },
    { id: '32432432', clientId: '324324324234', closeDate: '02.09.2022 09:56', closer: 'email@email.com', transactionId: '3434234', method: 'На карту', requisites: '*4567', cardIssuer: 'mastercard', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 22:34', status: 'Взят в работу', statusColor: 'warning' },
    { id: '32432432', clientId: '324324324234', closeDate: '02.09.2022 09:56', closer: 'email@email.com', transactionId: '3434234', method: 'На карту', requisites: '*4567', cardIssuer: 'mastercard', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 22:34', status: 'Одобрено', statusColor: 'success' },
    { id: '32432432', clientId: '324324324234', closeDate: '02.09.2022 09:56', closer: 'email@email.com', transactionId: '3434234', method: 'На карту', requisites: '*4567', cardIssuer: 'mastercard', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 22:34', status: 'Одобрено', statusColor: 'success' },
    { id: '32432432', clientId: '324324324234', closeDate: '02.09.2022 09:56', closer: 'email@email.com', transactionId: '3434234', method: 'На карту', requisites: '*4567', cardIssuer: 'mastercard', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 22:34', status: 'Одобрено', statusColor: 'success' }
];
</script>