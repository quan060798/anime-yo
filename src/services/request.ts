import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'https://api.jikan.moe/v4',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const request = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        instance.get<T>(url, config),
    
    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        instance.post<T>(url, data, config),
    
    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        instance.put<T>(url, data, config),
    
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        instance.delete<T>(url, config),
    
    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        instance.patch<T>(url, data, config),
};
