import ApiUtils from '../utils/apiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ENDPOINT = '/vocab';

async function getVocabList() {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token is required to fetch vocabulary list');
        }

        const response = await ApiUtils.get(ENDPOINT, {}, { Authorization: `Bearer ${accessToken}` });

        if (!response || !response.data) {
            throw new Error('Failed to fetch vocabulary list');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching vocabulary list:', error.response?.data || error.message);
    }
}

export default {
    getVocabList
}