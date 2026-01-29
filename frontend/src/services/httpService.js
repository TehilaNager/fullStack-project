import axios from "axios";
import config from "../../config.json";

axios.defaults.baseURL = config.apiUrl;

function setDefaultHeaders(headerName, value) {
    return axios.defaults.headers.common[headerName] = value;
}

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
    setDefaultHeaders
};

export default httpService;