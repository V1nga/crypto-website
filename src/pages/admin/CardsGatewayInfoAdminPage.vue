<template>
    <FPage>
        <template #body-prepend>
            <div class="px-8 py-4 bg-white flex flex-col gap-4">
                <div class="flex flex-nowrap items-center">
                    <FArrowButton reverse active class="my-1 mr-5" @click="$router.push('/admin/cards')"/>
                    <div class="font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    <div class="flex-grow flex justify-end">
                        <FCheckBox>Активный</FCheckBox>
                    </div>
                </div>
                <div class="flex flex-wrap gap-4">
                    <div class="flex-grow">
                        <FTextField
                            :min-width="330"
                            outlined
                            placeholder="Искать по тексту"
                            class="w-full lg:w-[330px]"
                        >
                            <template #prepend>
                                <FIcon icon="search" class="ml-2"/>
                            </template>
                        </FTextField>
                    </div>
                    <div class="flex-grow lg:flex-grow-0 flex flex-nowrap lg:justify-end gap-4">
                        <FDatePicker class="w-full lg:w-[240px]"/>
                        <FTimePicker class="w-full lg:w-[180px]"/>
                    </div>
                </div>
            </div>
        </template>
        <template #default>
            <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                <FCard
                    v-for="(item, index) of items"
                    :key="index"
                    class="text-sm font-semibold"
                >
                    <div class="flex flex-nowrap gap-4">
                        <div class="font-bold">{{ item.id }}</div>
                        <div class="flex-grow flex justify-end">{{ item.date }}</div>
                    </div>
                    <div class="mt-2 text-secondary">{{ item.text }}</div>
                </FCard>
            </div>
        </template>
    </FPage>
</template>
<script setup>
import { ref } from 'vue';
import FPage from '../../components/layout/FPage.vue';
import FArrowButton from '../../components/kit/FArrowButton.vue';
import FTextField from '../../components/kit/FTextField.vue';
import FDatePicker from '../../components/kit/FDatePicker.vue';
import FTimePicker from '../../components/kit/FTimePicker.vue';
import FCard from '../../components/kit/FCard.vue';
import FIcon from '../../components/kit/FIcon.vue';
import FCheckBox from '../../components/kit/FCheckBox.vue';

const items = ref([
    { id: 8728, date: '16:00 6/07/2023', text: '8728 На ваш баланс сотового телефона 7ххххх98 зачислен платеж 100р' },
    { id: 8728, date: '16:00 6/07/2023', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ...' },
    { id: 8728, date: '16:00 6/07/2023', text: '8728 На ваш баланс сотового телефона 7ххххх98 зачислен платеж 100р' },
    { id: 8728, date: '16:00 6/07/2023', text: '8728 На ваш баланс сотового телефона 7ххххх98 зачислен платеж 100р' },
    { id: 8728, date: '16:00 6/07/2023', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ...' },
    { id: 8728, date: '16:00 6/07/2023', text: '8728 На ваш баланс сотового телефона 7ххххх98 зачислен платеж 100р' },
    { id: 8728, date: '16:00 6/07/2023', text: '8728 На ваш баланс сотового телефона 7ххххх98 зачислен платеж 100р' },
    { id: 8728, date: '16:00 6/07/2023', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ...' },
    { id: 8728, date: '16:00 6/07/2023', text: '8728 На ваш баланс сотового телефона 7ххххх98 зачислен платеж 100р' },
    { id: 8728, date: '16:00 6/07/2023', text: '8728 На ваш баланс сотового телефона 7ххххх98 зачислен платеж 100р' },
    { id: 8728, date: '16:00 6/07/2023', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ...' },
    { id: 8728, date: '16:00 6/07/2023', text: '8728 На ваш баланс сотового телефона 7ххххх98 зачислен платеж 100р' }
]);
</script>