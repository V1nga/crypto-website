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

      <FCard class="p-8 col-span-3">
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
    </div>
  </div>
</template>
<script setup>
import FCard from '../../components/kit/FCard.vue';
import FButton from '../../components/kit/FButton.vue';
import FMoney from '../../components/kit/FMoney.vue';
import FNumber from '../../components/kit/FNumber.vue';
import FStonks from '../../components/kit/FStonks.vue';
</script>