import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async (user) => {
    const {data} = await $host.post('api/user/register', user); 
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};
//email, password, name, birthday, photo, sex

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const fetchUsers = async () => {
    const {data} = await $host.get('api/user');
    return data;
};

export const fetchOneUser = async (id) => {
    const {data} = await $host.get('api/user/' + id);
    return data;
};

export const updateUser = async (id, user) => {
    const {data} = await $host.put('api/user/' + id, user);
    return data;
};