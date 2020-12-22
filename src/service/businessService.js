import request from '../utils/request';

const getAllBusinesses = () => {
    return request.get('business/all');
};

const getAllBusinessByDeptId = (deptId) => {
    return request.post('businesses/get', {deptId});
};

const addBusiness = (deptId, busName, description, requirement, cost) => {
    return request.post('business/add/' + deptId, {deptId, busName, description, requirement, cost});
};

const deleteBusiness = (busId) => {
    return request.post('business/delete/' + busId, {busId});
};

const getBusinessById = (busId) => {
    return request.post('bus/get', {busId});
};

const updateBusiness = (busId, deptId, busName, description, requirement, cost) => {
    return request.post('bus/update', {busId, deptId, busName, description, requirement, cost});
};

const addBusFromTemplate = (busName, deptId) => {
    return request.post('bus/addTemplate', {busName, deptId});
};



export default {
    getAllBusinesses,
    addBusiness,
    deleteBusiness,
    getBusinessById,
    updateBusiness,
    getAllBusinessByDeptId,
    addBusFromTemplate,
};
