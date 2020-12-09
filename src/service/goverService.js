import request from '../utils/request';

const getAllGovernor = () => {
    return request.get('gover/all');
};

const addGovernor =(phone, department) => {
    return request.post('gover/add', {phone, department});
};

const deleteGovernor =(phone) => {
    return request.post('gover/delete', {phone});
};

export default {
    getAllGovernor,
    addGovernor,
    deleteGovernor,
};
