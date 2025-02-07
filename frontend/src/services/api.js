import axios from '../utils/axios-customize'

const postRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', {
        fullName, email, password, phone
    })
}

const postLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', {
        username, password, delay: 2000
    })
}

const fetchAccount = () => {
    return axios.get('/api/v1/auth/account');
}

const postLogout = () => {
    return axios.post('/api/v1/auth/logout');
}

const getRefreshToken = () => {
    return axios.get('/api/v1/auth/refresh');
}

const getUsersWithPaginate = (query) => {
    return axios.get(`/api/v1/user?${query}`);
}

const postCreateAUser = (fullName, password, email, phone) => {
    return axios.post('/api/v1/user', { fullName, password, email, phone })
}

const postCreateBulkUsers = (listUsers) => {
    return axios.post('/api/v1/user/bulk-create', listUsers)
}

export {
    postRegister, postLogin, fetchAccount,
    postLogout, getRefreshToken, getUsersWithPaginate,
    postCreateAUser, postCreateBulkUsers,
};