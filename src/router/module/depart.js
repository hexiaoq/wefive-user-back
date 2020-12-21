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
    {
        path: '/departEdit/deptId=:id',
        name: 'departEdit',
        component: () => import('../../views/department/departEdit.vue')
    },
];

export default departRouter;
