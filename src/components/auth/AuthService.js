import ApiClient from '../api-client/Client.js'
import Storage from '../../shared/utils/Storage.js';
class AuthService {
    login({ rememberCredentials, ...credentials }) {
        return ApiClient.client.post('/api/auth/login', credentials).then(({ accessToken }) => {
            ApiClient.setAuthorizationHeader(accessToken);
            if (rememberCredentials) {
                Storage.set('auth', accessToken);
            }
        });
    }

    logout() {
        return Promise.resolve().then(() => {
            ApiClient.removeAuthorizationHeader();
            Storage.remove('auth');
            Storage.remove('credentialsCached');
        });
    }
}

export default new AuthService();