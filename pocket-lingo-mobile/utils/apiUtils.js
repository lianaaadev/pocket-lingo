import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

async function post(endpoint, data) {
    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function get(endpoint, params = {}, headers = {}) {
    const request = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        params: params
    })

    try {
        const response = await request.get(endpoint);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default {
    post,
    get
}