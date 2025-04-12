import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const loginUserCredentials=async(user)=>(await  axios.post(`${API_URL}/login`,user)).data
export const postUserCredentials=async(user)=>(await axios.post(`${API_URL}/register`,user)).data;
export const getUsers = async () => (await axios.get(API_URL)).data;
export const getUserById = async (id) => (await axios.get(`${API_URL}/${id}`)).data;
export const createUser = async (user) =>( await axios.post(API_URL, user).data);
export const updateUser = async (id, user) => (await axios.put(`${API_URL}/${id}`, user)).data;
export const deleteUser = async (id) => (await axios.delete(`${API_URL}/${id}`)).data;
