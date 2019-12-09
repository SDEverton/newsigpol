import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.pm.pa.gov.br/',
});

export default api;
