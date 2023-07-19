import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import './style.css';
import App from './App.vue';
import HomePage from './pages/client/HomePage.vue';
import TransactionPage from './pages/client/TransactionsPage.vue';
import WithdrawMoneyPage from './pages/client/WithdrawMoneyPage.vue';
import CreateWithdrawalRequestPage from './pages/client/CreateWithdrawalRequestPage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/transactions', component: TransactionPage },
    { path: '/withdraw-money', component: WithdrawMoneyPage },
    { path: '/create-withdrawal-requrest', component: CreateWithdrawalRequestPage }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const app = createApp(App);

app.use(router);
app.mount('#app');
