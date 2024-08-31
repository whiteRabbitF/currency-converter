import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://status.neuralgeneration.com/api',
    timeout: 10000,
});

export const getCurrencyRates = () => {
    return apiClient.get('/currency');
};
