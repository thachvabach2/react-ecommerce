import axios from '../utils/axios-customize'
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const postRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', {
        fullName, email, password, phone
    })
}

const postLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', {
        username, password, delay: 0
    })
}

const fetchAccount = () => {
    return axios.get('/api/v1/auth/account');
}

const postLogout = () => {
    return axios.post('/api/v1/auth/logout');
}

const getRefreshToken = async () => {
    return await mutex.runExclusive(async () => {
        const res = await axios.get('/api/v1/auth/refresh');
        if (res && res.data)
            return res;
        else
            return null;
    })
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

const putUpdateAUser = (_id, fullName, phone) => {
    return axios.put('/api/v1/user', { _id, fullName, phone });
}

const deleteAUser = (id) => {
    return axios.delete(`/api/v1/user/${id}`);
}

const getListBooksWithPaginate = (query) => {
    return axios.get(`/api/v1/book?${query}`);
}

const getBookCategories = () => {
    return axios.get('/api/v1/database/category');
}

const postUploadImageBook = (image) => {
    const formData = new FormData();
    formData.append('fileImg', image);
    return axios.post('/api/v1/file/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "upload-type": "book",
        }
    })
}

const postCreateABook = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.post('/api/v1/book', { thumbnail, slider, mainText, author, price, sold, quantity, category })
}

const putUpdateABook = (id, thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.put(`/api/v1/book/${id}`, { thumbnail, slider, mainText, author, price, sold, quantity, category });
}

const deleteABook = (id) => {
    return axios.delete(`/api/v1/book/${id}`);
}

const getBookById = (id) => {
    return axios.get(`/api/v1/book/${id}`);
}

const postPlaceOrder = (data) => {
    return axios.post('/api/v1/order', {
        ...data
    })
}

const getOrderHistory = () => {
    return axios.get('/api/v1/history')
}

const postUploadAvatar = (image) => {
    const formData = new FormData();
    formData.append('fileImg', image);
    return axios.post('/api/v1/file/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "upload-type": "avatar",
        }
    })
}

const putUpdateUserInfo = (_id, avatar, fullName, phone) => {
    return axios.put('/api/v1/user', { _id, avatar, fullName, phone })
}

const postChangePassword = (email, oldpass, newpass) => {
    return axios.post('/api/v1/user/change-password', { email, oldpass, newpass });
}

const getDashboard = () => {
    return axios.get('/api/v1/database/dashboard');
}

const getListOrder = (query) => {
    return axios.get(`/api/v1/order?${query}`);
}

export {
    postRegister, postLogin, fetchAccount,
    postLogout, getRefreshToken, getUsersWithPaginate,
    postCreateAUser, postCreateBulkUsers, putUpdateAUser,
    deleteAUser, getListBooksWithPaginate, getBookCategories,
    postUploadImageBook, postCreateABook, putUpdateABook,
    deleteABook, getBookById, postPlaceOrder,
    getOrderHistory, postUploadAvatar, putUpdateUserInfo,
    postChangePassword, getDashboard, getListOrder,
};