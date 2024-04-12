import { cache } from 'react'
import axios from 'axios'

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:4000/api/v1';
    //axios.defaults.baseURL = 'https://ecommerce-express.azurewebsites.net/api/v1';

} else {
    axios.defaults.baseURL = 'https://ecommerce-express.azurewebsites.net/api/v1';
}

export const getProducs = cache(async () => {
    try {
        const response = await axios.get('/products');
        console.log(response)
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
    }
})