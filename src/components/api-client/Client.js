import axios from "axios";
class ApiClient {
    client = axios.create({
        baseURL: 'http://localhost:3001',
    });;
    constructor() {
        this.setupApiClient();
    }

    setupApiClient() {
        // this.initializeClient();
        this.setInterceptors();
    }

    // initializeClient() {
    //     this.client = axios.create({
    //         baseURL: 'http://localhost:3001',
    //     });
    // }

    setInterceptors() {
        this.client.interceptors.response.use(
            response => response.data,
            error => {
                if (!error.response) {
                    return Promise.reject({ message: error.message });
                }
                return Promise.reject({
                    message: error.response.statusText,
                    ...error.response,
                    ...error.response.data,
                });
            },
        );
    }

    setAuthorizationHeader(token) {
        this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    removeAuthorizationHeader() {
        delete this.client.defaults.headers.common['Authorization'];
    }

}

export default new ApiClient();