import axios from "axios";
const httpRequest = axios.create({
    baseURL: 'https://6639ce371ae792804becd456.mockapi.io/toDoApp',
    headers: {
        "Content-Type": "application/json"
    },
    credentials: 'same-origin'
})
export const get = async (url, options = {}) => {
    const res = await httpRequest.get(url, options);
    return res.data;
  };
export const post = async (url, data = {}, options = {}) => {
    const res = await httpRequest.post(url, data, options);
    return res.data;
  };
export default { httpRequest};