import request from '../utils/request';

// 获取链接
const sendLoginInfo = (phone, password) => {
    return request.post('login' , {phone, password} );
};

const sendAdminLoginInfo = (phone, password) => {
    return request.post('loginAdmin' , {phone, password} );
};


export default {
    sendLoginInfo,
    sendAdminLoginInfo,
};
