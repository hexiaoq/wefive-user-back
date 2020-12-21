import request from '../utils/request';

const addProcessForBus = (busId, title, content, step) => {
    return request.post('process/add', {busId, title, content, step});
};

const addProcessMaterials = (processId, processMaterials) => {
    return request.post("process/addMaterial/" + processId, {processMaterials})
};

const getAllProcessOfBus = (busId) => {
    return request.get("process/all/" + busId)
};

const deleteProcess = (busId) => {
    return request.post('process/delete', {busId});
};

const deleteProcessMaterial = (processId, materialId) => {
    return request.post('process/deleteMaterial', {processId, materialId});
};


export default {
    addProcessForBus,
    addProcessMaterials,
    getAllProcessOfBus,
    deleteProcess,
    deleteProcessMaterial,
};
