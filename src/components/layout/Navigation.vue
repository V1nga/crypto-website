<template>
    <div class="bg-white px-5 py-6 filter drop-shadow-xl w-1/6 min-w-min">
        <img src="../../assets/logo.svg" alt="Finance logo" class="ml-3"/>

        <div class="pt-6">
            <FButton
                v-for="(item, index) of navigationItems"
                :key="index"
                :active="item.active"
                fill
                light
                content-align="left"
                color="transparent"
                text-color="secondary"
                class="py-3 mb-2"
            >
                <template #prepend="{ isMouseOver, isActive }">
                    <img :src="`/icons/${ item.logo }${ isMouseOver || isActive ? '' : '-gray' }.svg`" :alt="`${ item.text }-logo`" class="pr-4">
                </template>
                <template #default>
                    <div class="text-sm font-semibold">{{ item.text }}</div>
                </template>
            </FButton>
        </div>
    </div>
</template>
<script setup>
import FButton from '../kit/FButton.vue';

const navigationItems = [
    { text: 'Главная', logo: 'home', active: true },
    { text: 'Транзакции', logo: 'transaction', active: false  },
    { text: 'Вывод средств', logo: 'wallet', active: false  },
    { text: 'Проблемные платежи', logo: 'warning', active: false  },
    { text: 'Платежные решения', logo: 'noun-bulb-money', active: false  },
    { text: 'Настройки', logo: 'cog', active: false  },
    { text: 'Выйти', logo: 'logout', active: false  }
];
</script>