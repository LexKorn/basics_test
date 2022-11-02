import { $host } from "./index";

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