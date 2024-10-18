import axios from "axios";
//https://reqres.in/
const API_URL = "https://reqres.in/api";

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users?page=1`);
    return response.data.data;
}

//login
export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password
    });
    return response.data;
}
//register
export const register = async (email, password) => {
    const response = await axios.post(`${API_URL}/register`, {
        email,
        password
    });
    return response.data;
}

// post /users name, job yang dikirim
export const createUser = async (name, job) => {
    const response = await axios.post(`${API_URL}/users`, {
        name,
        job
    });
    return response.data;
}

// /api/users?page=2
export const getUsersPage = async (page) => {
    const response = await axios.get(`${API_URL}/users?page=${page}`);
    return response.data;
}
