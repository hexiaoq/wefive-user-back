const materialRouter = [
    {
        path: '/material/busId=:busId',
        name: 'material',
        component: () => import('../../views/material/Material.vue')
    },
    {
        path: '/addMaterial/busId=:busId',
        name: 'addMaterial',
        component: () => import('../../views/material/AddMaterial.vue')
    },
];

export default materialRouter;
