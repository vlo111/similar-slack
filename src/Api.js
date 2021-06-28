import axios from 'axios';
import Account from './helpers/Account';

const { REACT_APP_API_URL } = process.env;

const api = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = Account.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

class Api {

    static singIn(email, password) {
        return api.post('/users/sign-in', { email, password });
    }

    static singUp(data) {
        return api.post('/users/sign-up', data);
    }

    static oAuth(type, params) {
        const version = 'v2';
        return api.get(`/users/oauth/${version}/redirect/${type}`, { params });
    }

    static getMyAccount() {
        return api.get('/users/current');
    }

    static createWorkspace(requestData) {
        return api.post('/workspace/create', requestData);
    }

    static getWorkspace(userId) {
        return api.get(`/workspace/getAll/${userId}`);
    }
}

export default Api;
