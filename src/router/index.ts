import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: '/',
                name: 'mainPage',
                component: () => import('../components/main/MainPage.vue'),
            },
            {
                path: '/organization',
                name: 'organizationPage',
                component: () => import('../components/main/OrganizationPage.vue'),
            },
            {
                path: '/athlete',
                name: 'athletePage',
                component: () => import('../components/main/AthletePage.vue'),
            },
            {
                path: '/account',
                name: 'accountPage',
                component: () => import('../components/main/AccountPage.vue'),
            },
            {
                path: '/register',
                name: 'registerPage',
                component: () => import('../components/main/RegisterPage.vue'),
                children: [
                    {
                        path: '/register/:game_id',
                        name: 'registerList',
                        component: () => import('../components/main/module/RegisterList.vue'),
                    },
                    {
                        path: '/register/:game_id/individual',
                        name: 'registerIndividual',
                        component: () => import('../components/main/IndividualPage.vue'),
                    },
                    {
                        path: '/register/:game_id/group',
                        name: 'registerGroup',
                        component: () => import('../components/main/GroupPage.vue'),
                    },
                ],
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// eslint-disable-next-line
router.beforeEach((to, from) => {
    const isLogin = localStorage.sep5_reg_token;
    if (isLogin) {
        const temp = JSON.parse(localStorage.sep5_reg_data);
        const expire = new Date(temp.expired).getTime();
        const current = Date.now();
        if (expire <= current && to.path !== '/login') {
            localStorage.removeItem('sep5_reg_token');
            localStorage.removeItem('sep5_reg_data');
            // eslint-disable-next-line
        alert('請重新登入');
            return '/login';
        }
    } else {
        // eslint-disable-next-line
      if (to.path !== '/login') {
        // eslint-disable-next-line
        alert('請先登入');
            return '/login';
        }
    }
});

export default router;
