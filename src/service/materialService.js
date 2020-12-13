import request from '../utils/request';

const getMaterials = (busId) => {
    return request.post('material/get', {busId});
};

const addMaterial = (materialName, description, photoUrl, busId) => {
    return request.post('material/add', {materialName, description, photoUrl, busId});
};

const updateMaterial = (materialId, busId, materialName, description, photoUrl) => {
    return request.post('material/update', {materialId, busId, materialName, description, photoUrl})
};

const deleteMaterial = (materialId) => {
    return request.post('material/delete', {materialId});
};


export default {
    getMaterials,
    addMaterial,
    updateMaterial,
    deleteMaterial,
};
