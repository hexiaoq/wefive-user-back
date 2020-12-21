import request from '../utils/request';

const getAllBusiness = (deptId) => {
    return request.get('business/all/' + deptId);
};

const getAllBusinessByDeptId = (deptId) => {
    return request.post('businesses/get', {deptId});
};

const addBusiness = (deptName, busName, description, requirement, cost) => {
    return request.post('business/'+ deptName + '/add', {busName, description, requirement, cost});
};

const deleteBusiness = (busId, deptName) => {
    return request.post('business/'+ deptName + '/delete', {busId});
};

const getBusinessById = (busId) => {
    return request.post('bus/get', {busId});
};

const updateBusiness = (busId, deptId, busName, description, requirement, cost) => {
    return request.post('bus/update', {busId, deptId, busName, description, requirement, cost});
};


export default {
    getAllBusiness,
    addBusiness,
    deleteBusiness,
    getBusinessById,
    updateBusiness,
    getAllBusinessByDeptId,
};
