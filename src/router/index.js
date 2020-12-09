import Vue from 'vue'
import VueRouter from 'vue-router'
import loginRouter from "./module/login";
import homeRouter from "./module/home";
import departRouter from "./module/depart";
import goverRouter from "./module/gover";
import businessRouter from "./module/business";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'app',
        component: () => import('../views/init/Init.vue')
    },
    {
      path: '/init',
      name: 'init',
      component: () => import('../views/init/Init.vue')
    },
    {
        path: '/edit',
        name: 'edit',
        // 元信息
        meta: {
            // true 代表这个路由需要认证
            auth: false,
        },
        component: () => import('../views/home/Gover1.vue')
    },
    {
        path: '/business',
        name: 'business',
        // 元信息
        meta: {
            // true 代表这个路由需要认证
            auth: false,
        },
        component: () => import('../views/business/Business.vue')
    },
    {
        path: '/comment',
        name: 'comment',
        // 元信息
        meta: {
            // true 代表这个路由需要认证
            auth: false,
        },
        component: () => import('../views/comment/Comment.vue')
    },
    ...loginRouter,
    ...homeRouter,
    ...departRouter,
    ...goverRouter,
    ...businessRouter,

];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router
