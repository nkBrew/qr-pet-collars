import axios from 'axios';

export const dogData = () => {
    return axios
        .get('/2/')
        .then((response: any) => response)
        .catch((error) => console.log('error', error));
};
