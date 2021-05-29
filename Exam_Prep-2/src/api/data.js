import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getCars() {
    return await api.get('/data/cars?sortBy=_createdOn%20desc');
}

export async function getCarById(id) {
    return await api.get('/data/cars/' + id);
}

export async function getMyCars() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createRecord(data) {
    return await api.post('/data/cars', data);
}

export async function editRecord(id, data) {
    return await api.put('/data/cars/' + id, data);
}

export async function deleteRecord(id) {
    return await api.del('/data/cars/' + id);
}

export async function getCarByYear(year) {
    return await api.get(`/data/cars?where=year%3D${year}`);
}