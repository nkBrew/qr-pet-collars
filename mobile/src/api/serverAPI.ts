import axios from 'axios';

const baseURL = 'http://localhost:8000';

const api = axios.create({
    baseURL,
});

export const getCollar = (collarId) => {
    return api
        .get(`/collar/${collarId}`)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => console.log(error));
};
