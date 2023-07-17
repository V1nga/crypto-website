<template>
    <FPage title="Транзакции">
        <template #title-append>
            <div class="w-full flex justify-end">
                <FTextField v-model="searchText" outlined placeholder="Искать по ID транзакции или ID клиента" class="w-4/12 lg:w-3/12">
                    <template #prepend>
                        <img src="/icons/search.svg" class="mx-2"/>
                    </template>
                </FTextField>
            </div>
        </template>
        <template #default>
            <FCard no-paddings>
                <FTable :headers="transactionsHeaders" :items="transactionsItems">
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
            <FDialog v-model="dialogVisible" v-if="dialogData" class="text-dark">
                <div class="text-center py-12">
                    <FMoney :number="12987.87" currency="USDT" textSize="5xl" slug-text-size="2xl"/>
                    <div class="flex flex-nowrap justify-center mt-4">
                        <FChip v-bind:[dialogData.statusColor]=true>{{ dialogData.status }}</FChip>
                        <div class="text-dark font-semibold ml-2">{{ dialogData.statusDate }}</div>
                    </div>
                </div>
                <div class="bg-white p-4">
                    <p class="text-secondary">ID транзакции</p>
                    <p class="text-xl font-bold">{{ dialogData.id }}</p>
                    <div class="mt-4 grid grid-cols-2 gap-y-2 text-md text-dark">
                        <p class="font-bold">ID клиента</p>
                        <p class="font-semibold">{{ dialogData.clientId }}</p>
                        <p class="font-bold">Дата / время закрытия</p>
                        <p class="font-semibold">{{ dialogData.date }}</p>
                        <p class="font-bold">Дата создания</p>
                        <p class="font-semibold">{{ dialogData.createDate }}</p>
                        <p class="font-bold">Реквизиты</p>
                        <p class="font-semibold flex flex-nowrap">
                            {{ dialogData.requisites }}
                            <img :src="`/icons/${ dialogData.cardIssuer }.svg`" class="ml-2"/>
                        </p>
                    </div>
                </div>
                <div class="px-4 py-6">
                    <p class="font-bold text-xl mb-5">Комментарии</p>
                    <div v-for="(comment, index) of comments" :key="index" class="mb-10">
                        <p class="text-primary font-bold">{{ comment.login }} <span class="text-dark">оставил комментарий</span></p>
                        <p class="text-secondary font-semibold">{{ comment.date }}</p>
                        <FCard class="mt-2 font-semibold">{{ comment.text }}</FCard>
                    </div>
                    <FTextField placeholder="Оставить комментарий..." class="dialog-comment-field">
                        <template #prepend>
                            <button>
                                <img src="/icons/clip.svg" class="ml-2 mr-5 my-1"/>
                            </button>
                        </template>
                        <template #append>
                            <button>
                                <img src="icons/paper-airplane.svg" class="mr-2"/>
                            </button>
                        </template>
                    </FTextField>
                </div>
            </FDialog>
        </template>
    </FPage>
</template>
<script setup>
import { ref } from 'vue';
import FPage from '../../components/kit/FPage.vue';
import FTextField from '../../components/kit/FTextField.vue';
import FCard from '../../components/kit/FCard.vue';
import FTable from '../../components/kit/FTable.vue';
import FChip from '../../components/kit/FChip.vue';
import FArrowButton from '../../components/kit/FArrowButton.vue';
import FDialog from '../../components/kit/FDialog.vue';
import FMoney from '../../components/kit/FMoney.vue';

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
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Ожидание оплаты', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Ожидание оплаты', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Ожидание оплаты', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Ожидание оплаты', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Ожидание оплаты', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Ожидание оплаты', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Ожидание оплаты', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Ожидание оплаты', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Ожидание оплаты', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Ожидание оплаты', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Ожидание оплаты', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Подтв. об оплате', statusColor: 'primary', statusDate: '12.12.2023 23:45' }
];
</script>
<style scoped>
.dialog-comment-field {
    position: sticky;
    left: 15px;
    bottom: 15px;
    right: 15px;
}
</style>