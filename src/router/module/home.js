const homeRouter = [
    {
        path: '/home',
        name: 'home',
        // 元信息
        meta: {
            // true 代表这个路由需要认证
            auth: false,
        },
        component: () => import('../../views/home/Home.vue')
    },
    {
        path: '/homeAdmin',
        name: 'homeAdmin',
        // 元信息
        meta: {
            // true 代表这个路由需要认证
            auth: false,
        },
        component: () => import('../../views/home/HomeAdmin.vue')
    },
];

export default homeRouter;
