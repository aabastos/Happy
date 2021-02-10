import axios from 'axios';

const api = axios.create({
    baseURL: 'https://abastos-happy.herokuapp.com'
})

export default api;