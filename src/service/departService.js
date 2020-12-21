import request from '../utils/request';

const addDepartment = (deptName, location, workTime, description, picture, contact) => {
    return request.post('department/add' , {deptName, location, workTime, description, picture, contact} );
};

const getAllDepartment = () => {
    return request.get('department/all');
};

const getDepartment = (deptId) => {
    return request.get('department/get/' + deptId);
};

const deleteDepartment = (deptId) => {
    return request.post('department/delete', {deptId});
};

const updateDepartment = (deptId, deptName, location, workTime, description, picture, contact) => {
    return request.post('department/update' , {deptId, deptName, location, workTime, description, picture, contact} );
};

export default {
    addDepartment,
    getDepartment,
    getAllDepartment,
    deleteDepartment,
    updateDepartment,
};
