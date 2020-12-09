import request from '../utils/request';

const getAllBusiness = (deptName) => {
    return request.get('business/'+ deptName +'/all');
};

const addBusiness = (deptName, busName, description, requirement, cost) => {
    return request.post('business/'+ deptName + '/add', {busName, description, requirement, cost});
};

const deleteBusiness = (busId, deptName) => {
    return request.post('business/'+ deptName + '/delete', {busId})
};


export default {
    getAllBusiness,
    addBusiness,
    deleteBusiness,
};
