<template>
    <FPage title="Вывод средств">
        <template #title-append>
            <div class="w-full flex justify-end">
                <div class="flex flex-nowrap items-center mr-6">
                    <div class="text-dark font-semibold mr-2">Доступно для вывода:</div>
                    <FMoney :money="12987.89" currency="USDT" text-size="2xl" slug-text-size="sm" font-weight="bold"/>
                </div>
                <FButton @click="$router.push('/create-withdrawal-requrest')">Подать заявку на вывод</FButton>
            </div>
        </template>
        <template #default>
            <FCard no-paddings>
                <FTable :headers="transactionsHeaders" :items="transactionsItems">
                    <template #item-requisites="{ item }">
                        <div class="flex flex-nowrap">
                            {{ item.requisites }}
                            <FIcon :icon="item.cardIssuer" class="ml-2"/>
                        </div>
                    </template>
                    <template #item-status="{ item }">
                        <div>
                            <FChip v-bind:[item.statusColor]=true>{{ item.status }}</FChip>
                            <div class="flex flex-nowrap text-secondary font-bold text-sm mt-1">
                                {{ item.statusDate }}
                                <button v-if="item.statusChanger">
                                    <FIcon icon="person" class="ml-2"/>
                                </button>
                            </div>
                        </div>
                    </template>
                    <template #item-edit="{ item }">
                        <div class="text-right pr-8">
                            <FArrowButton secondary @click="openTransactionDialog(item)"/>
                        </div>
                    </template>
                </FTable>
            </FCard>
            <TransactionDialog
                v-if="transactionDialogData"
                v-model="transactionDialogVisible"
                :money="12987.87"
                :currency="'USDT'"
                :status-text="transactionDialogData.status"
                :status-color="transactionDialogData.statusColor"
                :status-date="transactionDialogData.statusDate"
                :transaction="transactionDialogData"
                :transaction-id="transactionDialogData.id"
                :headers="[
                    { text: 'ID клиента', field: 'clientId' },
                    { text: 'Дата / время закрытия', field: 'closeDate' },
                    { text: 'Дата создания', field: 'createDate' },
                    { text: 'Метод закрытия', field: 'closeMethod' },
                    { text: 'Кем закрыто', field: 'closer' },
                    { text: 'Реквизиты', field: 'requisites' }
                ]"
                :comments="comments"
            >
                <template #header-date="{ date }">
                    <div class="flex flex-nowrap items-center gap-x-1">
                        {{ date }}
                        <button>
                            <FIcon icon="pencil"/>
                        </button>
                    </div>
                </template>
                <template #header-append>
                    <div class="whitespace-nowrap">
                        <span class="font-bold text-dark mr-1">Кем изменен статус:</span>
                        <span class="font-semibold text-primary">{{ transactionDialogData.closer }}</span>
                    </div>
                </template>
                <template #transaction-id="{ transaction }">
                    <div class="flex flex-nowrap items-center">
                        <div>
                            <p class="text-secondary">ID транзакции</p>
                            <p class="text-xl font-bold">{{ transaction.id }}</p>
                        </div>
                        <div class="w-full flex justify-end">
                            <FButton color="danger" hover-color="danger-dark" @click="openDisputMessageBox">Создать диспут</FButton>
                        </div>
                        <FMessageBox v-model="disputMessageBoxVisible" title="Создать диспут" absolute>
                            <FTextField
                                outlined
                                label="Доп. информация"
                                placeholder="Напишите что-нибудь..."
                                class="mb-5"
                            />
                            <FTextArea
                                label="Доп. информация"
                                placeholder="Напишите что-нибудь..."
                                class="mb-5"
                            />
                        </FMessageBox>
                    </div>
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
import FMoney from '../../components/kit/FMoney.vue';
import FCard from '../../components/kit/FCard.vue';
import FTable from '../../components/kit/FTable.vue';
import FChip from '../../components/kit/FChip.vue';
import FArrowButton from '../../components/kit/FArrowButton.vue';
import FButton from '../../components/kit/FButton.vue';
import TransactionDialog from '../../components/layout/TransactionDialog.vue';
import FMessageBox from '../../components/kit/FMessageBox.vue';
import FTextField from '../../components/kit/FTextField.vue';
import FIcon from '../../components/kit/FIcon.vue';
import FTextArea from '../../components/kit/FTextArea.vue';

const transactionDialogData = ref(null);
const transactionDialogVisible = ref(false);
const openTransactionDialog = (data) => {
    transactionDialogData.value = data;
    transactionDialogVisible.value = !transactionDialogVisible.value;
};

const disputMessageBoxVisible = ref(false);
const openDisputMessageBox = () => disputMessageBoxVisible.value = true;

const comments = [
    { login: "email@email.com", date: "23.09.2020 23:00", status: 'Обработка', statusColor: 'warning', previousStatus: 'Созданная заявка', previousStatusColor: 'secondary', text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet", attachments: [ { fileName: 'чек об оплате.jpeg', fileSize: '2.57 MB' } ] },
];
const transactionsHeaders = [
  { text: 'Способ', field: 'method' },
  { text: 'Реквизиты', field: 'requisites' },
  { text: 'Сумма вывода', field: 'sum' },
  { text: 'Курс вывода', field: 'exchangeRate' },
  { text: 'Дата созд.', field: 'createDate' },
  { text: 'Статус / Дата', field: 'status' },
  { text: '', field: 'edit' }
];
const transactionsItems = [
    { id: 342423435, clientId: 324324324234, closeDate: '02.09.2022 09:56', createDate: '02.09.2022', closeMethod: 'В ручную', closer: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'visa', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', status: 'Не успешно', statusColor: 'danger', statusChanger: '#' },
    { id: 342423435, clientId: 324324324234, closeDate: '02.09.2022 09:56', createDate: '02.09.2022', closeMethod: 'В ручную', closer: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'mastercard', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', status: 'Успешно', statusColor: 'success', statusChanger: '#' },
    { id: 342423435, clientId: 324324324234, closeDate: '02.09.2022 09:56', createDate: '02.09.2022', closeMethod: 'В ручную', closer: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'visa', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', status: 'Обработка', statusColor: 'warning', statusChanger: '#' },
    { id: 342423435, clientId: 324324324234, closeDate: '02.09.2022 09:56', createDate: '02.09.2022', closeMethod: 'В ручную', closer: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'visa', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', status: 'Обработка', statusColor: 'warning', statusChanger: '#' },
    { id: 342423435, clientId: 324324324234, closeDate: '02.09.2022 09:56', createDate: '02.09.2022', closeMethod: 'В ручную', closer: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'mastercard', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', status: 'Созданная заявка', statusColor: 'secondary', statusChanger: null },
    { id: 342423435, clientId: 324324324234, closeDate: '02.09.2022 09:56', createDate: '02.09.2022', closeMethod: 'В ручную', closer: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'visa', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', status: 'Обработка', statusColor: 'warning', statusChanger: '#' }
];
</script>