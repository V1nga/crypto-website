import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import './style.css';
import App from './App.vue';
import HomePage from './pages/client/HomePage.vue';
import TransactionPage from './pages/client/TransactionsPage.vue';
import WithdrawMoneyPage from './pages/client/WithdrawMoneyPage.vue';
import CreateWithdrawalRequestPage from './pages/client/CreateWithdrawalRequestPage.vue';
import ProblematicPaymentsPage from './pages/client/ProblematicPaymentsPage.vue';
import SettingsPage from './pages/client/SettingsPage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/transactions', component: TransactionPage },
    { path: '/withdraw-money', component: WithdrawMoneyPage },
    { path: '/create-withdrawal-requrest', component: CreateWithdrawalRequestPage },
    { path: '/problematic-payments', component: ProblematicPaymentsPage },
    { path: '/settings', component: SettingsPage }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const app = createApp(App);

app.use(router);
app.mount('#app');
