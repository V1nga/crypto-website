<template>
    <FPage title="Пользователи">
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
                <FTextField :max-width="330" outlined placeholder="Искать по ID транзакции" class="flex-grow">
                    <template #prepend>
                        <FIcon icon="search" class="ml-1"/>
                    </template>
                </FTextField>
                <div class="flex-grow justify-end flex gap-4">
                    <FSelect
                        :max-width="200"                    
                        :items="[{ text: 'На рассмотрении', value: 'pending' }, { text: 'Отклонен', value: 'canceled' }, { text: 'Одобрен', value: 'success' }]"
                        placeholder="Статус"
                        class="flex-grow"
                    />
                    <FDatePicker
                        v-model="datePickerValue"
                        :max-width="240"
                        range
                        class="flex-grow"
                    />
                    <FTimePicker
                        v-model="timePickerValue"
                        :max-width="160"
                        class="flex-grow"
                    />                  
                </div>
            </div>
        </template>
        <template #default>
            <FCard no-paddings>
                <FTable :headers="usersHeaders" :items="usersItems">
                    <template #item-status="{ item }">
                        <div>
                            <FChip v-bind:[item.statusColor]=true>{{ item.status }}</FChip>
                            <div class="flex flex-nowrap text-secondary font-bold text-sm mt-1">{{ item.statusDate }}</div>
                        </div>
                    </template>
                    <template #item-edit="{ item }">
                        <div class="text-right pr-8">
                            <FArrowButton secondary @click="$router.push(`${ $route.path }/${ item.id }`)"/>
                        </div>
                    </template>
                </FTable>
            </FCard>
        </template>
    </FPage>
</template>
<script setup>
import { ref } from 'vue';
import FPage from '../../components/layout/FPage.vue';
import FButton from '../../components/kit/FButton.vue';
import FArrowButton from '../../components/kit/FArrowButton.vue';
import FIcon from '../../components/kit/FIcon.vue';
import FCard from '../../components/kit/FCard.vue';
import FTable from '../../components/kit/FTable.vue';
import FChip from '../../components/kit/FChip.vue';
import FTextField from '../../components/kit/FTextField.vue';
import FSelect from '../../components/kit/FSelect.vue';
import FTimePicker from '../../components/kit/FTimePicker.vue';
import FDatePicker from '../../components/kit/FDatePicker.vue';

const datePickerValue = ref(null);
const timePickerValue = ref(null);

const isFiltersVisible = ref(false);

const usersHeaders = [
    { text: 'Email клиента', field: 'email' },
    { text: 'ID клиента', field: 'id' },
    { text: 'Роль', field: 'role' },
    { text: 'Статус', field: 'status' },
    { text: 'Дата последнего входа', field: 'lastEnterDate' },
    { text: '', field: 'edit' }
];
const usersItems = [
    { email: 'email@email.com', id: '32234234', role: 'Пользователь', status: 'Активный', statusColor: 'success', lastEnterDate: '12/12/2023 12:34' },
    { email: 'email@email.com', id: '32234234', role: 'Пользователь', status: 'Не активный', statusColor: 'danger', lastEnterDate: '12/12/2023 12:34' },
    { email: 'email@email.com', id: '32234234', role: 'Пользователь', status: 'Не активный', statusColor: 'danger', lastEnterDate: '12/12/2023 12:34' },
    { email: 'email@email.com', id: '32234234', role: 'Пользователь', status: 'Не активный', statusColor: 'danger', lastEnterDate: '12/12/2023 12:34' },
    { email: 'email@email.com', id: '32234234', role: 'Пользователь', status: 'Не активный', statusColor: 'danger', lastEnterDate: '12/12/2023 12:34' },
    { email: 'email@email.com', id: '32234234', role: 'Пользователь', status: 'Не активный', statusColor: 'danger', lastEnterDate: '12/12/2023 12:34' },
    { email: 'email@email.com', id: '32234234', role: 'Пользователь', status: 'Не активный', statusColor: 'danger', lastEnterDate: '12/12/2023 12:34' }
];
</script>