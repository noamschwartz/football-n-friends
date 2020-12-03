import axios from 'axios';

export default axios.create({
    baseURL: 'https://api-football-v1.p.rapidapi.com/v2'
});