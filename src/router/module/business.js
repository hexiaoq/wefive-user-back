const businessRouter = [
    {
        path: '/businessTable',
        name: 'businessTable',
        component: () => import('../../views/business/BusinessTable.vue')
    },
    {
        path: '/businessAdd',
        name: 'businessAdd',
        component: () => import('../../views/business/BusinessAdd.vue')
    },
];

export default businessRouter;
