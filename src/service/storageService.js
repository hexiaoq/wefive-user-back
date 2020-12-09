// 本地缓存服务

const PREFIX = 'wefive_';

// gover 模块
const GOVER_PREFIX = `${PREFIX}gover_`;
const GOVER_TOKEN = `${GOVER_PREFIX}token`;
const GOVER_INFO = `${GOVER_PREFIX}info`;

// admin 模块
const ADMIN_PREFIX = `${PREFIX}admin_`;
const ADMIN_TOKEN = `${ADMIN_PREFIX}token`;
const ADMIN_INFO = `${ADMIN_PREFIX}info`;


// 序列化存储
const set = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// 反序列化读取
const get = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export default {
    set,
    get,
    GOVER_TOKEN,
    GOVER_INFO,
    ADMIN_TOKEN,
    ADMIN_INFO,
};
