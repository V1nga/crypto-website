<template>
    <FPage>
      <div class="grid xl:grid-cols-4 xl:gap-4 2xl:gap-8 grid-cols-1">
        <FCard class="p-8 mb-6 xl:mb-0">
          <div class="mb-3 text-dark font-semibold">Общий баланс</div>
          <FMoney :money="12987.89" currency="USDT" class="mb-3"/>
          <div class="mb-9 text-xs font-semibold text-secondary">$345,678.00</div>
          <div class="p-6 inset-x-0 bottom-0 absolute">
            <FButton light fill>Вывод средств</FButton>
          </div>
        </FCard>
  
        <FCard class="p-8 mb-6 xl:mb-0 xl:col-span-3">
          <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <div class="text-sm font-semibold text-dark mb-2">Конверсия</div>
              <div class="text-primary text-4xl font-semibold">3.56%</div>
            </div>
  
            <div>
              <div class="text-sm font-semibold text-dark mb-2">Успешных платежей</div>
              <FNumber :number="1234" class="text-success text-4xl font-semibold"/>
            </div>
  
            <div>
              <div class="text-sm font-semibold text-dark mb-2">Не успешных платежей</div>
              <FNumber :number="1234" class="text-danger text-4xl font-semibold"/>
            </div>
  
            <div>
              <div class="text-sm font-semibold text-dark mb-2">Транзакции за сегодня</div>
              <div class="text-primary text-3xl font-semibold mb-2">129</div>
              <FStonks :number="3"/>
            </div>
  
            <div>
              <div class="text-sm font-semibold text-dark mb-2">Мин. сумма за сегодня</div>
              <FMoney :money="1112987.34" currency="USDT" text-size="3xl" slug-text-siz="normal" class="mb-2"/>
              <FStonks :number="3.67" append="%"/>
            </div>
  
            <div>
              <div class="text-sm font-semibold text-dark mb-2">Макс. сумма за сегодня</div>
              <FMoney :money="12987.34" currency="USDT" text-size="3xl" slug-text-size="normal" class="mb-2"/>
              <FStonks :number="-4.56" append="%"/>
            </div>
          </div>
        </FCard>
  
        <FCard no-paddings class="pt-6 pb-2 xl:col-span-4">
          <FCardTitle class="mx-8">Текущие выводы</FCardTitle>
          <div>
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
                  <div class="mt-1 text-xs font-bold flex flex-nowrap text-secondary">
                    {{ item.statusDate }}
                    <button v-if="item.statusChanger">
                        <FIcon icon="person" class="ml-2"/>
                    </button>
                  </div>
                </div>
              </template>
              <template #item-edit>
                <div class="text-right">
                  <FArrowButton secondary/>
                </div>
              </template>
            </FTable>     
            <FPagination :items-per-page="20" :length="780"/>
          </div>
        </FCard>
      </div>
    </FPage>
  </template>
  <script setup>
  import FPage from '../../components/layout/FPage.vue';
  import FCard from '../../components/kit/FCard.vue';
  import FCardTitle from '../../components/kit/FCardTitle.vue';
  import FButton from '../../components/kit/FButton.vue';
  import FMoney from '../../components/kit/FMoney.vue';
  import FNumber from '../../components/kit/FNumber.vue';
  import FStonks from '../../components/kit/FStonks.vue';
  import FTable from '../../components/kit/FTable.vue';
  import FChip from '../../components/kit/FChip.vue';
  import FArrowButton from '../../components/kit/FArrowButton.vue';
  import FIcon from '../../components/kit/FIcon.vue';
  import FPagination from '../../components/kit/FPagination.vue';
  
  const transactionsHeaders = [
    { text: 'Клиент', field: 'client' },
    { text: 'Способ', field: 'method' },
    { text: 'Реквизиты', field: 'requisites' },
    { text: 'Сумма вывода', field: 'sum' },
    { text: 'Курс вывода', field: 'exchangeRate' },
    { text: 'Дата созд.', field: 'createDate' },
    { text: 'Статус / Дата', field: 'status' },
    { text: '', field: 'edit' }
  ];
  const transactionsItems = [
    { client: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'visa', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', status: 'Отклонено', statusColor: 'danger', statusDate: '12.12.2023 23:45', statusChanger: '#' },
    { client: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'mastercard', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', status: 'Успешно', statusColor: 'success', statusDate: '12.12.2023 23:45', statusChanger: '#' },
    { client: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'visa', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', status: 'Обработка', statusColor: 'warning', statusDate: '12.12.2023 23:45', statusChanger: '#' },
    { client: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'visa', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', status: 'Обработка', statusColor: 'warning', statusDate: '12.12.2023 23:45', statusChanger: '#' },
    { client: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'visa', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', status: 'Обработка', statusColor: 'warning', statusDate: '12.12.2023 23:45', statusChanger: '#' },
    { client: 'email@email.com', method: 'На карту', requisites: '*4567', cardIssuer: 'mastercard', sum: '0.123454 BTC', exchangeRate: '25,098.09 USDT', createDate: '12.12.2023', status: 'Созданная заявка', statusColor: 'secondary', statusDate: '12.12.2023 23:45', statusChanger: null }
  ]
  </script>