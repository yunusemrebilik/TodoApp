import axios from "axios";
const baseUrl = 'http://localhost:3001/api'

const getAll = () => {
  return axios.get(`${baseUrl}/todos`);
};

const getById = (id) => {
  return axios.get(`${baseUrl}/todos/${id}`);
};

const deleteById = (id) => {
  return axios.delete(`${baseUrl}/todos/${id}`);
}

const create = (todo) => {
  return axios.post(`${baseUrl}/todos`, todo);
}

const update = (todo, id) => {
  return axios.put(`${baseUrl}/todos/${id}`, todo);
}

export default { getAll, getById, deleteById, create, update };