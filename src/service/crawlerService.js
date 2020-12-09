import request from '../utils/request';

// 获取链接
const getJobLinks = (cities, job, amount, salary) => {
    return request.post('jobLinks/' + job, {cities, amount, salary} );
};

// 获取词云
const getWordCloud = (jobType) => {
    return request.post('wordCloud', {jobType});
};


export default {
    getWordCloud,
    getJobLinks,
};
