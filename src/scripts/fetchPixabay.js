import axios from 'axios';
axios.defaults.baseURL = "https://pixabay.com/api/"
const key = "27156504-08e4058fa79ee4bc3a8930764";
function fetchPixabay(value, page = 1) {
    try {
        return axios.get(`?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    } catch (error){
        console.error(error);
    }
}

export {fetchPixabay};