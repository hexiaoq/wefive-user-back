import request from '../utils/request';

const addDepartment = (deptName, location, workTime, description) => {
    return request.post('department/add' , {deptName, location, workTime, description} );
};

const getAllDepartment = () => {
    return request.get('department/all');
};

const deleteDepartment = (deptId) => {
    return request.post('department/delete', {deptId});
};


export default {
    addDepartment,
    getAllDepartment,
    deleteDepartment,
};
