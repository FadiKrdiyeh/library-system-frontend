import axios from 'axios'
import { Axios } from 'axios'

const axiosIns: Axios = axios.create({
    // You can add your headers here
    // ================================
    // headers: {'X-Custom-Header': 'foobar'}

    baseURL: 'https://localhost:7293/api/',
    timeout: 20000,
});

export default axiosIns;
