const ApiUtils = require('../utils/apiUtils');

const ENDPOINT = '/users';

async function createUser(
    firstName,
    lastName,
    username,
    password
) {
    try {
        const userData = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
        };

        const response = await ApiUtils.post(ENDPOINT, userData);

        if (!response && !response.data) {
            throw new Error('Failed to create user');
        }

        return response.data;
    } catch (error) {
        console.error('Error creating user:', error.response?.data || error.message);
    }
}

export default {
    createUser
}
