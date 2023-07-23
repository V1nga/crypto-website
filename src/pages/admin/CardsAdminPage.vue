<template>
    <FPage>
        <template #title-prepend>
            <FTabs
                v-model="tab"
                :items="['Карты', 'Сим-Шлюз']"
            />
        </template>
        <template v-if="tab === 1" #title-append>
            <div class="w-full flex justify-end">
                <FTextField
                    :width="270"
                    outlined
                    placeholder="Искать по названию шлюза"
                >
                    <template #prepend>
                        <FIcon icon="search" class="ml-2"/>
                    </template>
                </FTextField>
            </div>
        </template>
        <template #default>
            <FCard v-if="tab === 0" class="p-6 h-full flex flex-nowrap gap-x-12">
                <div class="mb-12 w-[400px] flex flex-col gap-4">
                    <FButton light fill @click="addCardMessageBoxOpen">
                        <FIcon icon="plus-primary" class="mr-3"/>
                        Добавить карты
                    </FButton>
                    <div class="h-full">
                        <div class="mb-4 text-sm font-bold">Добавленные карты</div>
                        <FList
                            v-model="selectedCard"
                            
                            mandatory
                            :items="addedCards"
                            item-value="cardNumber"
                        >
                            <template #item="{ item, isSelected }">
                                <div
                                    :class="[{ 'text-secondary': !isSelected }, { 'text-primary': isSelected }, { 'bg-primary-light': isSelected }]"
                                    class="p-3 rounded-xl flex flex-nowrap gap-x-4"
                                >
                                    <FIcon :icon="isSelected ? 'card-primary' : 'card'"/>
                                    {{ item.cardNumber }}
                                    <div class="w-[40px] flex justify-center items-center">
                                        <div><FIcon :icon="item.cardIssuer"/></div>
                                    </div>
                                </div>
                            </template>
                        </FList>
                    </div>
                </div>
                <FCard v-if="selectedCard" no-paddings class="relative w-full">
                    <div class="p-6 pb-24 bg-active font-bold grid grid-cols-5 gap-4">
                        <div class="col-span-2">
                            <p class="text-sm">Номер карты</p>
                            <p>{{ selectedCard }}</p>
                        </div>
                        <div>
                            <p class="text-sm">Дата создания</p>
                            <p>12.12.2023</p>
                        </div>
                        <div class="col-span-2">
                            <p class="text-sm">Сим-шлюз</p>
                            <FSelect
                                :items="[
                                    { text: 'Value 1', value: 'value-1' },
                                    { text: 'Value 2', value: 'value-2' },
                                    { text: 'Value 3', value: 'value-3' },
                                    { text: 'Value 4', value: 'value-4' }
                                ]"
                            >
                                <template #input="{ item, isMenuVisible }">
                                    <div class="cursor-pointer flex flex-nowrap items-center gap-3">
                                        {{ (item && item.text) ?? 'Не выбрано' }}
                                        <FIcon :icon="isMenuVisible ? 'pencil-primary' : 'pencil'"/>
                                    </div>
                                </template>
                            </FSelect>
                        </div>
                        <div>
                            <p class="text-sm">Сумма</p>
                            <FMoney :money="3346" currency="USD" text-size="2xl" slug-text-size="md"/>
                        </div>
                        <div>
                            <p class="text-sm">Попыток пополнения</p>
                            <FNumber :number="3346" class="text-xl text-primary"/>
                        </div>
                        <div>
                            <p class="text-sm">Успешных попыток</p>
                            <FNumber :number="2345" class="text-xl text-success"/>
                        </div>
                        <div>
                            <p class="text-sm">Не успешных попыток</p>
                            <FNumber :number="1345" class="text-xl text-danger"/>
                        </div>
                        <div>
                            <p class="text-sm mb-1">Статус карты</p>
                            <FChip success class="py-[2px]">Активная</FChip>
                        </div>
                    </div>
                    <FTable
                        :headers="transactionsHeaders"
                        :items="transactionsItems"
                        class="-mt-14"
                    >
                        <template #item-statusDate="{ item }">
                            <div>
                                <FChip v-bind:[item.statusColor]=true>{{ item.statusText }}</FChip>
                                <div class="mt-2 text-sm text-secondary font-bold flex flex-nowrap items-center gap-2">
                                    {{ item.statusDate }}
                                    <button>
                                        <FIcon icon="person"/>
                                    </button>
                                </div>
                            </div>
                        </template>
                    </FTable>
                    <div class="absolute top-6 right-6">
                        <FButton light square>
                            <FIcon icon="rubbish-primary"/>
                        </FButton>
                    </div>
                </FCard>
                <FMessageBox
                    v-model="addCardMessageBoxVisible"
                    title="Добавить карту (-ы)"
                >
                    <div class="flex flex-col gap-4">
                        <FSelect
                            label="Платёжное решение"
                            placeholder="Выбрать платежное решение"
                        />
                        <FTextArea label="Номера карт" placeholder="Напишите одну или несколько номеров карт..."/>
                    </div>
                </FMessageBox>
            </FCard>
            <FCard v-else no-paddings>
                <FTable
                    :headers="gatewayHeaders"
                    :items="gatewayItems"
                >
                    <template #item-statusText="{ item }">
                        <div class="w-full flex justify-end">
                            <FChip v-bind:[item.statusColor]=true>{{ item.statusText }}</FChip>
                        </div>
                    </template>
                    <template #item-edit>
                        <FArrowButton secondary @click="$router.push('/admin/cards/gateway/1')"/>
                    </template>
                </FTable>
            </FCard>
        </template>
    </FPage>
</template>
<script setup>
import { ref } from 'vue';
import FPage from '../../components/layout/FPage.vue';
import FTabs from '../../components/kit/FTabs.vue';
import FCard from '../../components/kit/FCard.vue';
import FButton from '../../components/kit/FButton.vue';
import FNumber from '../../components/kit/FNumber.vue';
import FChip from '../../components/kit/FChip.vue';
import FMoney from '../../components/kit/FMoney.vue';
import FIcon from '../../components/kit/FIcon.vue';
import FTable from '../../components/kit/FTable.vue';
import FMessageBox from '../../components/kit/FMessageBox.vue';
import FList from '../../components/kit/FList.vue';
import FSelect from '../../components/kit/FSelect.vue';
import FTextArea from '../../components/kit/FTextArea.vue';
import FArrowButton from '../../components/kit/FArrowButton.vue';
import FTextField from '../../components/kit/FTextField.vue';

const tab = ref(0);
const selectedCard = ref(null);

const addCardMessageBoxVisible = ref(false);
const addCardMessageBoxOpen = () => {
    addCardMessageBoxVisible.value = true;
}

const addedCards = ref([
    { cardNumber: '2345 3456 5678 5678', cardIssuer: 'visa' },
    { cardNumber: '2345 3456 5678 5671', cardIssuer: 'visa' },
    { cardNumber: '2345 3456 5678 5672', cardIssuer: 'visa' },
    { cardNumber: '2345 3456 5678 5673', cardIssuer: 'visa' },
    { cardNumber: '2345 3456 5678 5674', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5675', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5676', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5677', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5679', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5618', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5628', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5638', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5648', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5658', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5668', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5178', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5278', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5378', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5478', cardIssuer: 'mastercard' },
    { cardNumber: '2345 3456 5678 5578', cardIssuer: 'mastercard' }
]);

const transactionsHeaders = [
    { text: 'Клиент', field: 'client' },
    { text: 'Сумма вывода', field: 'sum' },
    { text: 'Курс вывода', field: 'currencyExchange' },
    { text: 'Дата созд.', field: 'createDate' },
    { text: 'Статус / Дата', field: 'statusDate' }
];
const transactionsItems = [
{ client: 'email@email.com', sum: '0.123454 BTC', currencyExchange: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', statusText: 'Отклонено', statusColor: 'danger' },
{ client: 'email@email.com', sum: '0.123454 BTC', currencyExchange: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', statusText: 'Отклонено', statusColor: 'danger' },
{ client: 'email@email.com', sum: '0.123454 BTC', currencyExchange: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', statusText: 'Отклонено', statusColor: 'danger' },
{ client: 'email@email.com', sum: '0.123454 BTC', currencyExchange: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', statusText: 'Отклонено', statusColor: 'danger' },
{ client: 'email@email.com', sum: '0.123454 BTC', currencyExchange: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', statusText: 'Отклонено', statusColor: 'danger' },
{ client: 'email@email.com', sum: '0.123454 BTC', currencyExchange: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', statusText: 'Отклонено', statusColor: 'danger' },
{ client: 'email@email.com', sum: '0.123454 BTC', currencyExchange: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', statusText: 'Отклонено', statusColor: 'danger' },
{ client: 'email@email.com', sum: '0.123454 BTC', currencyExchange: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', statusText: 'Отклонено', statusColor: 'danger' },
{ client: 'email@email.com', sum: '0.123454 BTC', currencyExchange: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', statusText: 'Отклонено', statusColor: 'danger' },
{ client: 'email@email.com', sum: '0.123454 BTC', currencyExchange: '25,098.09 USDT', createDate: '12.12.2023', statusDate: '12.12.2023 23:45', statusText: 'Отклонено', statusColor: 'danger' }
];


const gatewayHeaders = ref([
    { text: 'Название шлюза', field: 'name' },
    { text: 'Статус шлюза', field: 'statusText' },
    { text: '', field: 'edit' }
]);
const gatewayItems = ref([
    { name: 'Лореми ипсум долор сит амет', statusText: 'Не активный', statusColor: 'danger' },
    { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. U...', statusText: 'Активный', statusColor: 'success' },
    { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. U...', statusText: 'Активный', statusColor: 'success' },
    { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. U...', statusText: 'Активный', statusColor: 'success' },
    { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. U...', statusText: 'Активный', statusColor: 'success' },
    { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. U...', statusText: 'Активный', statusColor: 'success' },
    { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. U...', statusText: 'Активный', statusColor: 'success' }
]);
</script>