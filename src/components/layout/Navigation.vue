<template>
    <div class="bg-white px-5 py-6 filter drop-shadow-xl w-1/6 min-w-min z-50">
        <img src="../../assets/logo.svg" alt="Finance logo" class="ml-3"/>

        <div class="pt-6">
            <FButton
                v-for="(item, index) of navigationItems"
                :key="index"
                :active="$route.path === item.path"
                fill
                light
                content-align="left"
                color="transparent"
                text-color="secondary"
                class="py-3 mb-2"
                @click="onClickNav(item)"
            >
                <template #prepend="{ isMouseOver, isActive }">
                    <FIcon :icon="`${ item.logo }${ isMouseOver || isActive ? '' : '-gray' }`" class="pr-4"/>
                </template>
                <template #default>
                    <div class="text-sm font-semibold">{{ item.text }}</div>
                </template>
            </FButton>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import FIcon from '../kit/FIcon.vue';
import FButton from '../kit/FButton.vue';

const navigationItems = [
    { text: 'Главная', logo: 'home', path: '/' },
    { text: 'Транзакции', logo: 'transaction', path: '/transactions'  },
    { text: 'Вывод средств', logo: 'wallet', path: '/withdraw-money'  },
    { text: 'Проблемные платежи', logo: 'warning', path: '/problematic-payments'  },
    { text: 'Платежные решения', logo: 'noun-bulb-money', path: '/payment-solutions'  },
    { text: 'Настройки', logo: 'cog', path: '/settings'  },
    { text: 'Выйти', logo: 'logout', path: '/logout'  }
];


const router = useRouter();
const onClickNav = (navigationItem) => {
    router.push(navigationItem.path);
};
</script>