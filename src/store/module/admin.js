import storageService from "../../service/storageService";

// 存储用户状态和信息
const adminModule = {
    // 开启namespaced, 加上命名空间
    namespaced: true,
    // 定义状态
    state: {
        adminToken: storageService.get(storageService.ADMIN_TOKEN),
        adminInfo: storageService.get(storageService.ADMIN_INFO),
    },

    // 定义方法
    mutations: {
        // 当前状态+参数, 且状态变更只能在mutations里面进行，需要启动严格模式
        SET_ADMIN_INFO(state, adminInfo) {
            // 更新本地缓存
            storageService.set(storageService.ADMIN_INFO, adminInfo);
            // 更新state
            state.adminInfo = adminInfo;
        },
        SET_ADMIN_TOKEN(state, adminToken) {
            // 更新本地缓存
            storageService.set(storageService.ADMIN_TOKEN, adminToken);
            // 更新state
            state.adminToken = adminToken;
        },
    },

    actions: {
        // 存储用户信息和Token
        storeAdminInfo(context, {admin, token}) {
            return new Promise(() => {
                // 结构体序列化
                JSON.stringify(admin);
                context.commit('SET_ADMIN_INFO', admin);
                context.commit('SET_ADMIN_TOKEN', token);
            });
        },

        // 登出清理本地用户信息缓存
        logoutAdmin(context) {
            return new Promise(() => {
                context.commit('SET_ADMIN_INFO', "");
                context.commit('SET_ADMIN_TOKEN', "");
            });
        }
    },
};

export default adminModule
