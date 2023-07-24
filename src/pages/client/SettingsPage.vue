<template>
    <FPage title="Настройки">
        <div class="flex flex-col gap-y-6">
            <FCard>
                <div class="py-3 px-6 flex flex-wrap lg:flex-nowrap justify-center items-center gap-6">
                    <div class="flex flex-wrap md:flex-nowrap justify-center gap-6">
                        <FIcon icon="lock-1"/>
                        <div>
                            <div class="font-bold text-lg">2FA token</div>
                            <div class="text-dark font-semibold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet</div>
                        </div>    
                    </div>              
                    <div class="flex-grow flex justify-end">
                        <FButton class="w-full lg:w-min">Включить</FButton>
                    </div>
                </div>
            </FCard>
            <FCard>
                <div class="py-3 px-6 flex flex-wrap lg:flex-nowrap justify-center items-center gap-6">
                    <div class="flex flex-wrap md:flex-nowrap justify-center gap-6">
                        <FIcon icon="lock-2"/>
                        <div>
                            <div class="font-bold text-lg">Пароль</div>
                            <div class="text-dark font-semibold">Мы рекомендуем не давать свой пароль посторонним лицам и вовремя менять в целях безопасности аккаунта</div>
                        </div>
                    </div>
                    <div class="flex-grow flex justify-end">
                        <FButton @click="changePasswordMessageBoxVisible = true" class="w-full lg:w-min">Изменить</FButton>
                    </div>
                </div>
            </FCard>
        </div>
        <FMessageBox v-model="changePasswordMessageBoxVisible" title="Изменить пароль" absolute>
            <FTextField
                outlined
                label="Текущий пароль"
                placeholder="Введите пароль"
                class="mb-5"
            />
            <FTextField
                outlined
                label="Новый пароль"
                placeholder="Введите пароль"
                class="mb-5"
            />
            <FTextField
                outlined
                label="Подтвердить пароль"
                placeholder="Введите пароль"
            />
        </FMessageBox>
    </FPage>
</template>
<script setup>
import { ref } from 'vue';
import FPage from '../../components/layout/FPage.vue';
import FCard from '../../components/kit/FCard.vue';
import FIcon from '../../components/kit/FIcon.vue';
import FButton from '../../components/kit/FButton.vue';
import FMessageBox from '../../components/kit/FMessageBox.vue';
import FTextField from '../../components/kit/FTextField.vue';

const changePasswordMessageBoxVisible = ref(false);
</script>