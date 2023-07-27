<template>
    <FPage>
        <template #title-prepend>
            <FArrowButton reverse active class="my-1 ml-3" @click="$router.push('/withdraw-money')"/>
        </template>
        <template #default>
            <FCard class="p-7">
                <FCardTitle size="2xl">Создать заявку на вывод</FCardTitle>
                <div class="grid lg:grid-cols-3 gap-y-10 lg:gap-x-16">
                    <div class="lg:col-span-2">
                        <FTextField
                            outlined
                            placeholder="Введите сумму вывода"
                        >
                            <template #label>
                                <div class="font-bold flex items-center whitespace-nowrap">
                                    <div class="hidden md:block">Сумма вывода</div>
                                    <div class="flex-grow flex flex-nowrap items-center md:justify-end">
                                        Доступно для вывода:
                                        <FMoney :money="12987.89" currency="USDT" text-size="lg" slug-text-size="lg" class="ml-2"/>
                                    </div>
                                </div>
                            </template>
                            <template #append>
                                <div class="mr-2 text-sm text-dark font-semibold">USDT</div>
                            </template>
                        </FTextField>
                        <FDivider class="my-8"/>
                        <FRadio v-model="withdrawType" text="Вывод средств в фиате" value="fiat" group="withdrawal-type" class="mb-4">
                            <template #hideable-content>
                                <div>
                                    <div class="mb-4">
                                        <FSelect
                                            v-model="withdrawTypeCard"
                                            mandatory
                                            label="Выберите способ вывода"
                                            :items="[{ text: 'На карту VISA / Mastercard', value: 'visa/mastercard' }]"
                                        />
                                    </div>
                                    <div class="flex flex-wrap gap-4">
                                        <div class="flex-grow">
                                            <FTextField
                                                outlined
                                                label="Номер карты"
                                                placeholder="0000 0000 0000 0000"
                                            />
                                        </div>
                                        <div class="flex-none">
                                            <FTextField
                                                :width="160"
                                                outlined
                                                label="Действительно до"
                                                placeholder="00 / 00"
                                                text-align="center"
                                            />
                                        </div>
                                        <div class="flex-none">
                                            <FTextField
                                                :width="100"
                                                outlined
                                                label="CVV код"
                                                placeholder="000"
                                                text-align="center"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </FRadio>
                        <FRadio v-model="withdrawType" text="Вывод средств в криптовалюте" value="crypto" group="withdrawal-type">
                            <template #hideable-content>
                                <div class="flex flex-col gap-y-5">
                                    <FSelect
                                        v-model="cryptoCurrencyType"
                                        mandatory
                                        label="Криптовалюта"
                                        :items="[{ text: 'Bitcoin BTC', value: 'bitcoin' }]"
                                    />
                                    <FSelect
                                        v-model="cryptoRurrencyNetwork"
                                        mandatory
                                        label="Сеть"
                                        :items="[{ text: 'BNB Chain (BEP-20)', value: 'bnb-chain' }]"
                                    />
                                    <div class="flex justify-center flex-wrap gap-x-4">
                                        <div class="flex-grow">
                                            <FTextField
                                                outlined
                                                modelValue="TA3X93FV5674LX2w4oQKsoi9oU5iVF7Gnf"
                                                label="Адрес кошелька"
                                                text-size="lg"
                                                font-size="semibold"
                                            >
                                                <template #append>
                                                    <button class="mr-2">
                                                        <FIcon icon="copy"/>
                                                    </button>
                                                </template>
                                            </FTextField>

                                            <div class="mt-4 text-xs font-semibold">
                                                <p class="text-secondary">Expected arrival: <span class="text-dark">15 network confirmation</span></p>
                                                <p class="text-secondary">Expected unlock: <span class="text-dark">15 network confirmation</span></p>
                                                <p>Отправляйте только Bitcoin на этот адрес</p>
                                                <p>Используйте только сеть <a href="#" class="text-primary hover:text-primary-dark">BNB Chain.</a></p>
                                            </div>
                                        </div>
                                        <div class="flex-none">
                                            <img src="/qr.svg"/>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </FRadio>
                        <FButton fill class="mt-8 py-3" @click="onClickSubmit">Подать заявку на вывод средств</FButton>
                    </div>
                    <div class="order-first lg:order-last font-semibold">
                        <p class="font-bold">Tips</p>
                        <p class="my-4 text-sm text-dark">Lorem ipsum dolor sit amet consectetur. Tellus condimentum quam enim curabitur aenean.</p>
                        <li class="mb-4 text-sm text-dark">Lorem ipsum dolor sit amet consectetur. Sit sed cursus amet at ultricies eget ac eleifend euismod.</li>
                        <li class="text-sm text-dark">3Lorem ipsum dolor sit amet consectetur. </li>
                    </div>
                </div>
            </FCard>
            <FMessageBox v-model="submitMessageBoxVisible" :width="600">
                <template #body>
                    <div class="p-8 text-center grid justify-items-center gap-4">
                        <img src="/hourglass.svg"/>
                        <p class="text-2xl text-dark font-bold">Ваша заявка отправлена в обработку</p>
                        <p class="text-sm">Lorem ipsum dolor sit amet consectetur. Tellus condimentum quam enim curabitur aenean. Lorem ipsum dolor sit amet consectetur. Tellus condimentum quam enim curabitur aenean.</p>
                        <FButton class="mt-6" @click="$router.push('/')">Вернуться на главную</FButton>
                    </div>
                </template>
            </FMessageBox>
        </template>
    </FPage>
</template>
<script setup>
import { ref } from 'vue';
import FPage from '../../components/layout/FPage.vue';
import FArrowButton from '../../components/kit/FArrowButton.vue';
import FCard from '../../components/kit/FCard.vue';
import FCardTitle from '../../components/kit/FCardTitle.vue';
import FTextField from '../../components/kit/FTextField.vue';
import FMoney from '../../components/kit/FMoney.vue';
import FDivider from '../../components/kit/FDivider.vue';
import FRadio from '../../components/kit/FRadio.vue';
import FButton from '../../components/kit/FButton.vue';
import FIcon from '../../components/kit/FIcon.vue';
import FMessageBox from '../../components/kit/FMessageBox.vue';
import FSelect from '../../components/kit/FSelect.vue';

const withdrawType = ref('fiat');
const withdrawTypeCard = ref(null);
const cryptoCurrencyType = ref(null);
const cryptoRurrencyNetwork = ref(null);

const submitMessageBoxVisible = ref(false);
const onClickSubmit = () => {
    submitMessageBoxVisible.value = true;
}
</script>