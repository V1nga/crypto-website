import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import './style.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import App from './App.vue';
import HomePage from './pages/client/HomePage.vue';
import TransactionPage from './pages/client/TransactionsPage.vue';
import WithdrawMoneyPage from './pages/client/WithdrawMoneyPage.vue';
import CreateWithdrawalRequestPage from './pages/client/CreateWithdrawalRequestPage.vue';
import ProblematicPaymentsPage from './pages/client/ProblematicPaymentsPage.vue';
import SettingsPage from './pages/client/SettingsPage.vue';
import AdminHomePage from './pages/admin/HomeAdminPage.vue';
import TransactionAdminPage from './pages/admin/TransactionAdminPage.vue';
import WithdrawMoneyAdminPage from './pages/admin/WithdrawMoneyAdminPage.vue';
import ProblematicPaymentsAdminPage from './pages/admin/ProblematicPaymentsAdminPage.vue';
import UsersAdminPage from './pages/admin/UsersAdminPage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/transactions', component: TransactionPage },
    { path: '/withdraw-money', component: WithdrawMoneyPage },
    { path: '/create-withdrawal-requrest', component: CreateWithdrawalRequestPage },
    { path: '/problematic-payments', component: ProblematicPaymentsPage },
    { path: '/settings', component: SettingsPage },

    { path: '/admin', component: AdminHomePage },
    { path: '/admin/transactions', component: TransactionAdminPage },
    { path: '/admin/withdraw-money', component: WithdrawMoneyAdminPage },
    { path: '/admin/problematic-payments', component: ProblematicPaymentsAdminPage },
    { path: '/admin/users', component: UsersAdminPage },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const app = createApp(App);

app.component('VueDatePicker', VueDatePicker);
app.use(router);
app.mount('#app');
