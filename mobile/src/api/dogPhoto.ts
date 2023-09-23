import axios from 'axios';

export const dogPhoto = () => {
    return axios
        .get('https://dog.ceo/api/breeds/image/random')
        .then((response: any) => response.data.message)
        .catch((error) => console.log(error));
};
