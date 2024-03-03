import axios from "axios";

const httpClient = axios.create({
    daseURL: 'http://localhost:8000',
    timeout: 60000,
});
export default httpClient;