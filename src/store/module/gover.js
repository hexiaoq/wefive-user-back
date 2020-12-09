import storageService from "../../service/storageService";

// 存储用户状态和信息
const goverModule = {
    // 开启namespaced, 加上命名空间
    namespaced: true,
    // 定义状态
    state: {
        goverToken: storageService.get(storageService.GOVER_TOKEN),
        goverInfo: storageService.get(storageService.GOVER_INFO),
    },

    // 定义方法
    mutations: {
        // 当前状态+参数, 且状态变更只能在mutations里面进行，需要启动严格模式
        SET_GOVER_INFO(state, goverInfo) {
            // 更新本地缓存
            storageService.set(storageService.GOVER_INFO, goverInfo);
            // 更新state
            state.goverInfo = goverInfo;
        },
        SET_GOVER_TOKEN(state, goverToken) {
            // 更新本地缓存
            storageService.set(storageService.GOVER_TOKEN, goverToken);
            // 更新state
            state.goverToken = goverToken;
        },
    },

    actions: {
        // 存储用户信息和Token
        storeGoverInfo(context, {governor, token}) {
            return new Promise(() => {
                // 结构体序列化
                JSON.stringify(governor);
                context.commit('SET_GOVER_INFO', governor);
                context.commit('SET_GOVER_TOKEN', token);
            });
        },

        // 登出清理本地用户信息缓存
        logoutGover(context) {
            return new Promise(() => {
                context.commit('SET_GOVER_INFO', "");
                context.commit('SET_GOVER_TOKEN', "");
            });
        }
    },
};

export default goverModule
