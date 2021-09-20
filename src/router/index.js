import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: {
            name: 'Gallery'
        }
    },
    {
        path: '/gallery',
        name: 'Gallery',
        component: () => import('@/pages/Gallery'),
    }
];

export default new VueRouter({
    mode: 'history',
    routes
})
