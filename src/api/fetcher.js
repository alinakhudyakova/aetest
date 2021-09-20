import axios from "axios";

const instance = axios.create({
    baseURL: 'http://interview.agileengine.com',
    withCredentials: false
});

instance.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('authToken');

        if (config.url.indexOf('/auth') != -1) return config;
        if (!token) {
            const tokenData = await instance.post('/auth', {"apiKey": "23567b218376f79d9415"});

            localStorage.setItem('authToken', tokenData.data.token);
        }
        config.headers = {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        if (error.response.status == 401) {
            const tokenData = await instance.post('/auth', {"apiKey": "23567b218376f79d9415"});
            const config = error.config;

            localStorage.setItem('authToken', tokenData.data.token);
            return axios.request(config).then(response => {
                Promise.resolve(response);
            }).catch((err) => {
                Promise.reject(err);
            });
        }
        Promise.reject(error);
    }
);

export default instance;
