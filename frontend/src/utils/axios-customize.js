import axios from 'axios';
import { fetchAccount, getRefreshToken } from '../services/api';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // auto set-cookies from backend
});

instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // nếu không có dòng dưới thì sau login phải f5 mới logout được (set headers author ở trên ko giúp làm điều đó)
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// handle infinity loop (when infinity fetch account auto = 401)
const NO_RETRY_HEADER = 'x-no-retry'

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // handle call refresh token (retry api fetch account) when access_token expired
    if (error.config && error.response
        && +error.response.status === 401
        && !error.config.headers[NO_RETRY_HEADER]
    ) {
        const res = await getRefreshToken();
        error.config.headers[NO_RETRY_HEADER] = 'true'
        if (res && res.data && res.data.access_token) {
            error.config.headers['Authorization'] = 'Bearer ' + res.data.access_token;
            localStorage.setItem('access_token', res.data.access_token);
            return instance.request(error.config);
        }
    }
    return error?.response?.data ?? Promise.reject(error);
});

export default instance;