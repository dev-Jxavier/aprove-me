import axios from "axios";
import { deleteLocalStorage, getLocalStorage } from "./localStorage";
import { TOKEN_BAKNME } from "./constants-local-storage";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

instance.interceptors.response.use(function (response) {
    // Qualquer código de status que dentro do limite de 2xx faz com que está função seja acionada
    // Faz alguma coisa com os dados de resposta
    return response;
}, function (error) {
    if (error.status === 403) { //Caso user não esteja logado
        deleteLocalStorage(TOKEN_BAKNME)
        window.location.href = '/'
    }
    return Promise.reject(error);
});

instance.interceptors.request.use(function (config) {
    const token = getLocalStorage(TOKEN_BAKNME)

    config.headers['Authorization'] = token

    return config;
}, function (error) {
    // Faz alguma coisa com o erro da requisição
    return Promise.reject(error);
});



export default instance