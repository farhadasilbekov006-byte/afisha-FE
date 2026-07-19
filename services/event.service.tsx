import { api } from './axios'


export const getEvents = async () => {
    const response = await api.get('/events');
     console.log(response.data);
    return response.data
} 