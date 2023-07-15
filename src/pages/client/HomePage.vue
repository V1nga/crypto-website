<template>
  <div>
    <div class="grid xl:grid-cols-4 xl:gap-4 2xl:gap-8 grid-cols-1">
      <FCard class="p-8 mb-6 xl:mb-0">
        <div class="font-semibold text-dark mb-3">Общий баланс</div>
        <FMoney :number="12987.89" currency="USDT" class="mb-3"/>
        <div class="text-sm font-semibold text-secondary mb-9">$345,678.00</div>
        <div class="absolute inset-x-0 bottom-0 p-6">
          <FButton light fill>Вывод средств</FButton>
        </div>
      </FCard>

      <FCard class="p-8 mb-6 xl:mb-0 xl:col-span-3">
        <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-x-12 gap-y-6">
          <div>
            <div class="font-semibold text-dark mb-2">Конверсия</div>
            <div class="text-primary text-4xl font-semibold">3.56%</div>
          </div>

          <div>
            <div class="font-semibold text-dark mb-2">Успешных платежей</div>
            <FNumber :number="1234" class="text-success text-4xl font-semibold"/>
          </div>

          <div>
            <div class="font-semibold text-dark mb-2">Не успешных платежей</div>
            <FNumber :number="1234" class="text-danger text-4xl font-semibold"/>
          </div>

          <div>
            <div class="font-semibold text-dark mb-2">Транзакции за сегодня</div>
            <div class="text-primary text-3xl font-semibold mb-2">129</div>
            <FStonks :number="3"/>
          </div>

          <div>
            <div class="font-semibold text-dark mb-2">Мин. сумма за сегодня</div>
            <FMoney :number="1112987.34" currency="USDT" text-size="3xl" slug-text-siz="normal" class="mb-2"/>
            <FStonks :number="3.67" append="%"/>
          </div>

          <div>
            <div class="font-semibold text-dark mb-2">Макс. сумма за сегодня</div>
            <FMoney :number="12987.34" currency="USDT" text-size="3xl" slug-text-size="normal" class="mb-2"/>
            <FStonks :number="-4.56" append="%"/>
          </div>
        </div>
      </FCard>

      <FCard no-paddings class="py-6 xl:col-span-4">
        <FCardTitle class="ml-8">Текущие выводы</FCardTitle>
        <div>
          <FTable :headers="summaryHeaders" :items="summaryItems">
            <template #item-requisites="{ item }">
              <div class="flex flex-nowrap">
                {{ item.requisites }}
                <img :src="`/icons/${ item.cardIssuer }.svg`" class="ml-2"/>
              </div>
            </template>
            <template #item-status="{ item }">
              <div>
                <FChip v-bind:[item.statusColor]=true>{{ item.status }}</FChip>
                <div class="flex flex-nowrap text-secondary font-bold text-sm mt-1">
                  {{ item.statusDate }}
                  <img src="/icons/person.svg" class="ml-2"/>
                </div>
              </div>
            </template>
            <template #item-edit>
              <div class="text-right pr-8">
                <FArrowButton secondary/>
              </div>
            </template>
          </FTable>     
        </div>
      </FCard>
    </div>
  </div>
</template>
<script setup>
import FCard from '../../components/kit/FCard.vue';
import FCardTitle from '../../components/kit/FCardTitle.vue';
import FButton from '../../components/kit/FButton.vue';
import FMoney from '../../components/kit/FMoney.vue';
import FNumber from '../../components/kit/FNumber.vue';
import FStonks from '../../components/kit/FStonks.vue';
import FTable from '../../components/kit/FTable.vue';
import FChip from '../../components/kit/FChip.vue';
import FArrowButton from '../../components/kit/FArrowButton.vue';

const summaryHeaders = [
  { text: 'Клиент', field: 'client' },
  { text: 'Способ', field: 'method' },
  { text: 'Реквизиты', field: 'requisites' },
  { text: 'Сумма вывода', field: 'sum' },
  { text: 'Курс вывода', field: 'exchangeRate' },
  { text: 'Дата созд.', field: 'createDate' },
  { text: 'Статус / Дата', field: 'status' },
  { text: '', field: 'edit' }
];
const summaryItems = [
  { client: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'visa', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', status: 'Отклонено', statusColor: 'danger', statusDate: '12.12.2023 23:45' },
  { client: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'mastercard', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', status: 'Успешно', statusColor: 'success', statusDate: '12.12.2023 23:45' },
  { client: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'visa', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', status: 'Обработка', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
  { client: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'visa', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', status: 'Обработка', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
  { client: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'visa', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', status: 'Обработка', statusColor: 'warning', statusDate: '12.12.2023 23:45' },
  { client: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'mastercard', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45' }
]
</script>