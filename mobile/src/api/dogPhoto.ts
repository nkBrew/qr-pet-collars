import axios from 'axios';

export const dogPhoto = () => {
    return axios
        .get('https://dog.ceo/api/breeds/image/random')
        .then((response: any) => response.data.message)
        .catch((error) => console.log(error));
};

export const dogPhotos = () => {
    return axios
        .get('https://dog.ceo/api/breeds/image/random/50')
        .then((response: any) => response.data.message)
        .catch((error) => console.log(error));
};
