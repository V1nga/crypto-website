<template>
    <FPage>
        <template #body-prepend>
            <div class="py-6 bg-white filter drop-shadow-xl flex flex-col gap-4">
                <div class="px-10 flex flex-wrap lg:flex-nowrap gap-4">
                    <FArrowButton reverse active @click="$router.push('/admin/users')"/>
                    <div class="flex-grow flex flex-nowrap gap-4 justify-end">
                        <div
                            v-if="user.blocked"
                            class="p-2 whitespace-nowrap font-semibold text-danger bg-danger-light rounded-xl hidden lg:flex flex-nowrap gap-x-2 items-center"              
                        >
                            <FIcon icon="danger"/>
                            Пользователь заблокирован
                        </div>
                        <FButton
                            :color="!user.blocked ? 'danger' : null" 
                            :hover-color="!user.blocked ? 'danger-dark' : null"
                        >
                            {{ user.blocked ? 'Разблокировать' : 'Заблокировать' }}
                        </FButton>
                        <FButton light square>
                            <FIcon icon="cog"/>
                        </FButton>
                    </div>
                </div>
                <div
                    v-if="user.blocked"
                    class="mx-10 p-2 whitespace-nowrap font-semibold text-danger bg-danger-light rounded-xl lg:hidden flex flex-nowrap gap-x-2 items-center"              
                >
                    <FIcon icon="danger"/>
                    Пользователь заблокирован
                </div>
                <div class="px-10 font-bold grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    <div>
                        <p class="text-sm">Пользователь</p>
                        <p>{{ user.email  }}</p>
                    </div>
                    <div>
                        <p class="text-sm">ID пользователя</p>
                        <p>{{ user.id  }}</p>
                    </div>
                    <div>
                        <p class="text-sm">Баланс, USD</p>
                        <FButton base @click="showBalanceCorrectMessageBox('usd')">
                            <template #default="{ isMouseOver }">
                                <div class="text-primary flex flex-nowrap gap-x-2">
                                    <FNumber :number="user.balance.usd" :minimum-fraction-digits="2"/>
                                    <div class="w-[20px]">
                                        <FIcon v-show="isMouseOver" icon="pencil"/>
                                    </div> 
                                </div>
                            </template>
                        </FButton>
                    </div>
                    <div>
                        <p class="text-sm">Баланс, EUR</p>
                        <FButton base @click="showBalanceCorrectMessageBox('eur')">
                            <template #default="{ isMouseOver }">
                                <div class="w-full text-primary flex flex-nowrap gap-x-2">
                                    <FNumber :number="user.balance.eur" :minimum-fraction-digits="2"/>
                                    <div class="w-[20px]">
                                        <FIcon v-show="isMouseOver" icon="pencil"/>
                                    </div>                                    
                                </div>
                            </template>
                        </FButton>
                    </div>
                    <div>
                        <p class="text-sm">Баланс, RUB</p>
                        <FButton base @click="showBalanceCorrectMessageBox('rub')">
                            <template #default="{ isMouseOver }">
                                <div class="text-primary flex flex-nowrap gap-x-2">
                                    <FNumber :number="user.balance.rub" :minimum-fraction-digits="2"/>
                                    <div class="w-[20px]">
                                        <FIcon v-show="isMouseOver" icon="pencil"/>
                                    </div> 
                                </div>
                            </template>
                        </FButton>
                    </div>
                    <div>
                        <p class="text-sm">Баланс, UAH</p>
                        <FButton base @click="showBalanceCorrectMessageBox('uah')">
                            <template #default="{ isMouseOver }">
                                <div class="text-primary flex flex-nowrap gap-x-2">
                                    <FNumber :number="user.balance.uah" :minimum-fraction-digits="2"/>
                                    <div class="w-[20px]">
                                        <FIcon v-show="isMouseOver" icon="pencil"/>
                                    </div> 
                                </div>
                            </template>
                        </FButton>
                    </div>
                </div>
                <FDivider/>
                <div class="px-10 flex flex-nowrap gap-x-4">
                    <FTabs
                        v-model="tab"
                        :items="['Транзакции', 'История входов']"
                    />
                    <div class="flex-grow flex flex-nowrap justify-end">
                        <FButton square light>
                            <div class="flex flex-nowrap gap-x-2">
                                <FIcon icon="pyramid-down"/>
                                <span class="hidden lg:block">Показать фильтр</span>
                            </div>
                        </FButton>
                    </div>
                </div>
            </div>
        </template>
        <template #default>
            <FCard no-paddings>
                <FTable v-if="tab === 0" :headers="transactionsHeaders" :items="transactionsItems">
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
                <FTable
                    v-else-if="tab === 1"
                    :headers="[
                        { text: 'ID', field: 'id' },
                        { text: 'Дата / Время', field: 'date' },
                        { text: 'User_agent', field: 'userAgent' }
                    ]"
                    :items="[
                        { id: 34234234234, date: '12.12.2023 23:45', userAgent: 'dsgsdsdgdsg' },
                        { id: 34234234234, date: '12.12.2023 23:45', userAgent: 'dsgsdsdgdsg' },
                        { id: 34234234234, date: '12.12.2023 23:45', userAgent: 'dsgsdsdgdsg' },
                        { id: 34234234234, date: '12.12.2023 23:45', userAgent: 'dsgsdsdgdsg' },
                        { id: 34234234234, date: '12.12.2023 23:45', userAgent: 'dsgsdsdgdsg' },
                        { id: 34234234234, date: '12.12.2023 23:45', userAgent: 'dsgsdsdgdsg' },
                        { id: 34234234234, date: '12.12.2023 23:45', userAgent: 'dsgsdsdgdsg' }
                    ]"
                >
                </FTable>
            </FCard>

            <FMessageBox
                v-model="balanceCorrectMessageBoxVisible"
                title="Корректировать баланс"
            >
                <div class="flex flex-col gap-4">
                    <div class="flex flex-wrap gap-x-8 gap-y-2">
                        <div class="w-full text-sm font-semibold">Причина</div>
                        <FRadio value="refill">
                            <div class="ml-2 font-semibold">Пополнение</div>
                        </FRadio>
                        <FRadio value="debiting">
                            <div class="ml-2 font-semibold">Списание</div>
                        </FRadio>
                    </div>
                    <div class="flex gap-x-8">
                        <FTextField
                            outlined
                            width="50%"
                            label="Сумма"
                            placeholder="0.00"
                        />
                        <FSelect
                            v-model="correctCurrency"
                            :items="[
                                { text: 'USD', value: 'usd' },
                                { text: 'RUB', value: 'rub' },
                                { text: 'UAH', value: 'uah' },
                                { text: 'EUR', value: 'eur' }
                            ]"
                            width="50%"
                            label="Валюта"
                        />
                    </div>
                    <FTextArea label="Доп. информация" placeholder="Напишите что-нибудь..."/>
                </div>
            </FMessageBox>
        </template>
    </FPage>
</template>
<script setup>
import { ref } from 'vue';
import FPage from '../../components/layout/FPage.vue';
import FArrowButton from '../../components/kit/FArrowButton.vue';
import FButton from '../../components/kit/FButton.vue';
import FIcon from '../../components/kit/FIcon.vue';
import FNumber from '../../components/kit/FNumber.vue';
import FDivider from '../../components/kit/FDivider.vue';
import FTabs from '../../components/kit/FTabs.vue';
import FCard from '../../components/kit/FCard.vue';
import FTable from '../../components/kit/FTable.vue';
import FChip from '../../components/kit/FChip.vue';
import FMessageBox from '../../components/kit/FMessageBox.vue';
import FRadio from '../../components/kit/FRadio.vue';
import FSelect from '../../components/kit/FSelect.vue';
import FTextField from '../../components/kit/FTextField.vue';
import FTextArea from '../../components/kit/FTextArea.vue';

const correctCurrency = ref(null);
const balanceCorrectMessageBoxVisible = ref(false);
const showBalanceCorrectMessageBox = (currency) => {
    correctCurrency.value = currency;
    balanceCorrectMessageBoxVisible.value = true;
};

const tab = ref(null);
const user = ref({
    id: '2134123123',
    email: 'email@email.com',
    balance: {
        usd: 3346.00,
        eur: 345567.98,
        rub: 345567.98,
        uah: 1345567.98
    },
    blocked: true
});

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
    { id: 34234234234, clientId: 34234234234, date: '12.12.2023 23:35', requisites: '1323 3434 3434 4567', cardIssuer: 'visa', sum: '0.123454 BTC', createDate: '12.12.2023 23:35', status: 'Подтв. об оплате', statusColor: 'primary', statusDate: '12.12.2023 23:45' }
];
</script>