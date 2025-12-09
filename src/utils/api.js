import axios from "axios";


const API_URL = "http://localhost:5000/api";
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type" : "application/json"
    }
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } 
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


//FUNCIONES DE PASEOS

export const getAllWalks = async () => {
    const response = await api.get("/walks");
    return response.data;
};

export const getWalkById = async (id) => {
    const response = await api.get(`/walks/${id}`);
    return response.data;
};

export const createWalk = async (walkData) => {
    const response = await api.post("/walks" , walkData);
    return response.data;
};

export const updateWalk = async (id , walkData) => {
    const response = await api.put(`/walks/${id}` , walkData);
    return response.data;
};

export const deleteWalk = async (id) => {
    const response = await api.delete(`/walks/${id}`);
    return response.data;
};

//FUNCIONES DE AUTENTICACION

export const registerUser = async (userData) => {
    const response = await api.post("/auth/register" , userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);

    if (response.data.token) {
        localStorage.setItem("token" , response.data.token);
    }
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};

export default api;