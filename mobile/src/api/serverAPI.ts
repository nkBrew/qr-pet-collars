import axios from 'axios';

const baseURL = 'http://localhost:8000';

const api = axios.create({
    baseURL,
});

export const getCollar = (collarId) => {
    return api
        .get(`/collar/${collarId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => console.log(error));
};

export const createCollar = (collar) => {
    return api
        .post('/collar/', collar)
        .then((response) => {
            alert('Collar created');
            return response.data;
        })
        .catch((error) => {
            //TODO MAKE TOAST WORK
            console.log(error);
        });
};

export const updateCollar = (qrCodeId, collar) => {
    return api
        .put(`/collar/${qrCodeId}/`, collar)
        .then((response) => {
            alert('Collar updated');
            return response.data;
        })
        .catch((error) => {
            //TODO MAKE TOAST WORK
            console.log(error);
        });
};

export const listAll = () => {
    return api
        .get(`/collar/`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};
