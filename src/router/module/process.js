const processRouter = [
    {
        path: '/process/busId=:busId',
        name: 'process',
        component: () => import('../../views/process/Process.vue')
    },
];

export default processRouter;
