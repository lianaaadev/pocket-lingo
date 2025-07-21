import ApiUtils from '../utils/apiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function checkLoggedIn() {
    const accessToken = await AsyncStorage.getItem('accessToken');
    return !!accessToken;
}

async function login(username, password) {
    const AUTH_ENDPOINT = '/authentication';

    try {
        const credentials = {
            strategy: 'local',
            username: username,
            password: password
        };

        const response = await ApiUtils.post(AUTH_ENDPOINT, credentials);

        if (!response || !response.accessToken) {
            throw new Error('Authentication failed');
        }

        await AsyncStorage.setItem('accessToken', response.accessToken);
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
    } catch (error) {
        console.error('Error authenticating:', error.response?.data || error.message);
    }
}

export default {
    checkLoggedIn,
    login
}