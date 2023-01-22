import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (obj) => {
  return axios.post(baseUrl, obj).then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (id, changedNumber) => {
  return axios
    .put(`${baseUrl}/${id}`, changedNumber)
    .then((response) => response.data);
};

const services = { getAll, create, deletePerson, update };
export default services;
