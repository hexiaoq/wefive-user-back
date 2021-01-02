import request from '../utils/request';

const getDeptComment = (deptId) => {
    return request.get('comment/getDept/' + deptId);
};

const feedBack = (commentId, reply) => {
    return request.post('comment/feedBack' , {commentId, reply});
};

export default {
    getDeptComment,
    feedBack,
};
