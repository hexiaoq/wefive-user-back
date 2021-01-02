const businessRouter = [
    {
        path: '/businessTable/deptId=:deptId',
        name: 'businessTable',
        component: () => import('../../views/business/BusinessTable.vue')
    },
    {
        path: '/businessAdd/deptId=:deptId',
        name: 'businessAdd',
        component: () => import('../../views/business/BusinessAdd.vue')
    },
    {
        path: '/busAddTemplate/deptId=:deptId',
        name: 'busAddTemplate',
        component: () => import('../../views/business/BusAddTemplate.vue')
    },
];

export default businessRouter;
