<template>
    <FPage title="Транзакции">
        <template #title-append>
            <div class="flex-grow flex justify-end">
                <FTextField
                    v-model="searchText"
                    :min-width="230"
                    outlined
                    placeholder="Искать по ID транзакции или ID клиента"
                    class="w-full lg:w-[410px]"
                >
                    <template #prepend>
                        <FIcon icon="search" class="mx-2"/>
                    </template>
                </FTextField>
            </div>
        </template>
        <template #default>
            <FCard no-paddings no-shadows-mobile>
                <FTable :headers="transactionsHeaders" :items="transactionsItems">
                    <template #item-status="{ item }">
                        <div>
                            <FChip v-bind:[item.statusColor]=true>{{ item.status }}</FChip>
                            <div class="mt-1 text-xs text-secondary font-bold flex flex-nowrap">{{ item.statusDate }}</div>
                        </div>
                    </template>
                    <template #item-edit="{ item }">
                        <div class="text-right pr-8">
                            <FArrowButton secondary @click="openDialog(item)"/>
                        </div>
                    </template>
                    <template #mobile-item="{ item }">
                        <div class="p-4 flex flex-nowrap">
                            <div>
                                <p class="mb-2 font-semibold">{{ item.id  }}</p>
                                <FChip v-bind:[item.statusColor]=true>{{ item.status }}</FChip>
                            </div>
                            <div class="flex-grow flex flex-nowrap justify-end">
                                <div>
                                    <p class="mb-1 text-right font-semibold">{{ item.sum }}</p>
                                    <div class="font-semibold flex flex-nowrap gap-2">
                                        <span>На карту</span>
                                        <span>*{{ item.requisites && item.requisites.split(' ')[3] }}</span>
                                        <FIcon :icon="item.cardIssuer"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <FDivider/>
                    </template>
                </FTable>
                <FPagination :items-per-page="20" :length="780"/>
            </FCard>
            <TransactionDialog
                v-if="dialogData"
                v-model="dialogVisible"
                :money="12987.87"
                :currency="'USDT'"
                :status-text="dialogData.status"
                :status-color="dialogData.statusColor"
                :status-date="dialogData.statusDate"
                :transaction="dialogData"
                :transaction-id="dialogData.id"
                :headers="[
                    { text: 'ID клиента', field: 'clientId' },
                    { text: 'Дата / время закрытия', field: 'date' },
                    { text: 'Дата создания', field: 'createDate' },
                    { text: 'Реквизиты', field: 'requisites' }
                ]"
                :comments="comments"
            >
                <template #transaction-requisites="{ transaction }">
                    <div class="font-semibold flex flex-nowrap">
                        {{ transaction.requisites }}
                        <FIcon :icon="transaction.cardIssuer" class="ml-2"/>
                    </div>
                </template>
            </TransactionDialog>
        </template>
    </FPage>
</template>
<script setup>
import { ref } from 'vue';
import FPage from '../../components/layout/FPage.vue';
import FTextField from '../../components/kit/FTextField.vue';
import FCard from '../../components/kit/FCard.vue';
import FTable from '../../components/kit/FTable.vue';
import FChip from '../../components/kit/FChip.vue';
import FArrowButton from '../../components/kit/FArrowButton.vue';
import TransactionDialog from '../../components/layout/TransactionDialog.vue';
import FIcon from '../../components/kit/FIcon.vue';
import FDivider from '../../components/kit/FDivider.vue';
import FPagination from '../../components/kit/FPagination.vue';

const searchText = ref(null);

const dialogData = ref(null);
const dialogVisible = ref(false);
const openDialog = (data) => {
    dialogData.value = data;
    dialogVisible.value = !dialogVisible.value;
};

const comments = [
    { login: "email@email.com", date: "23.09.2020 23:00", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet" },
    { login: "email@email.com", date: "23.09.2020 23:00", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet" },
    { login: "email@email.com", date: "23.09.2020 23:00", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet" },
    { login: "email@email.com", date: "23.09.2020 23:00", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet" },
    { login: "email@email.com", date: "23.09.2020 23:00", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet" },
    { login: "email@email.com", date: "23.09.2020 23:00", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet" },
    { login: "email@email.com", date: "23.09.2020 23:00", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet" }
];
const transactionsHeaders = [
  { text: 'ID транзакции', field: 'id' },
  { text: 'ID клиента', field: 'clientId' },
  { text: 'Дата, время закр.', field: 'date' },
  { text: 'Сумма платежа', field: 'sum' },
  { text: 'Дата создания', field: 'createDate' },
  { text: 'Статус / Дата', field: 'status' },
  { text: '', field: 'edit' }
];
const transactionsItems = [
    { id: 34234234234, clientId: 342324234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Успешный платеж', statusColor: 'success', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Ожидание оплаты', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Подтв. об оплате', statusColor: 'primary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Подтв. об оплате', statusColor: 'primary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Подтв. об оплате', statusColor: 'primary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Подтв. об оплате', statusColor: 'primary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Подтв. об оплате', statusColor: 'primary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Подтв. об оплате', statusColor: 'primary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Подтв. об оплате', statusColor: 'primary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Подтв. об оплате', statusColor: 'primary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Подтв. об оплате', statusColor: 'primary', statusDate: '12.12.2023 23:45' }
];
</script>