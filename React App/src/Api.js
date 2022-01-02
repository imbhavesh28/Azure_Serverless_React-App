import axios from 'axios';

/**
 * URLs and other api constants
 */
const constants = {
    api: {
        baseURL: '<API MANAGEMENT SERVICE BASE URI>',
    },
};

/**
 * Create an Axios Client with defaults
 */
export default axios.create({
    baseURL: constants.api.baseURL,
    headers: {'Ocp-Apim-Subscription-Key': '<API SUBSCRIPTION KEY>' }
});