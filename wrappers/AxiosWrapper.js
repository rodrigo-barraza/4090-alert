'use strict';
const axios = require('axios');

const AxiosWrapper = {
    request(method, url, data) {
        const headers = {
        };
        return axios({
            method: method,
            url: url,
            data: data,
            headers: headers,
            json: true,
            
        })
        .then(response => response, (error => error));
    },
};

module.exports = AxiosWrapper;