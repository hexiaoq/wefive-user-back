const departRouter = [
    {
        path: '/departTable',
        name: 'departTable',
        component: () => import('../../views/department/departTable.vue')
    },
    {
        path: '/departAdd',
        name: 'departAdd',
        component: () => import('../../views/department/departAdd.vue')
    },
];

export default departRouter;
