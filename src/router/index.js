import { createRouter, createWebHistory } from 'vue-router';
import header from '../components/header.vue';
import login from '../pages/login/index.vue';
import register from '../pages/register/index.vue';
import paymenthistory from '../pages/payment-history/index.vue';
import layoutuser from '../pages/userInfo/index.vue';
import userInfo from '../pages/userInfo/userInfo.vue';
import checkout from '../pages/payment/index.vue';
import carts from '../pages/carts/index.vue';
import home from '../pages/home/index.vue';
import main from '../layout/main.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'sd',
    component: main,
    children: [
      {
        path: 'login',
        name: 'login',
        component: login,
      },
      {
        path: 'register',
        name: 'register',
        component: register,
      },
      {
        path: 'home',
        name: 'home',
        component: home,
      },
      {
        path: 'user-info',
        name: 'user-info',
        redirect: '/user-info/info',
        component: layoutuser,
        children: [
          {
            path: 'info',
            name: 'info',
            component: userInfo,
          },
          {
            path: 'payment-history',
            component: paymenthistory,
            name: 'payment',
          },
        ],
      },
      {
        path: 'carts',
        name: 'carts',
        component: carts,
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: checkout,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
