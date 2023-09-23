import axios from 'axios';

export const dogData = () => {
    return axios
        .get('/collar/2/')
        .then((response: any) => response)
        .catch((error) => console.log('error', error));
};
