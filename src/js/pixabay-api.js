import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '51662095-362d68f1fb432ef34c7441ea2';


 export function getImagesByQuery(query) {
    return axios.get('', {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        },
    });
    
}
