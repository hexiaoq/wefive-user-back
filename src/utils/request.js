import axios from 'axios';

const service = axios.create({
    // api的url地址
    baseURL: process.env.VUE_APP_API_URL,
    // 持续时间20分钟
    timeout: 1000 * 1200,
    // token验证请求的有效性
    //headers: { "Authorization": storageService.get(storageService.USER_TOKEN)},
});

export default service
