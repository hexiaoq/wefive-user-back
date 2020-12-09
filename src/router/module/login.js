const loginRouter = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../../views/login/Login.vue')
    },
    {
        path: '/loginAdmin',
        name: 'loginAdmin',
        component: () => import('../../views/login/LoginAdmin.vue')
    },
];

export default loginRouter;
