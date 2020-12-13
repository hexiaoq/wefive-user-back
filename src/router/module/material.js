const materialRouter = [
    {
        path: '/:id/material',
        name: 'material',
        component: () => import('../../views/material/Material.vue')
    },
];

export default materialRouter;
