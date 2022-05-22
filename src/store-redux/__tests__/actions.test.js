import { loginRequest, login } from '../actions';
import {
    AUTHENTICATION_LOGIN_REQUEST,
    AUTHENTICATION_LOGIN_SUCCESS,
} from '../types';

//test Una acción síncrona.
describe('loginRequest', () => {
    test('should return an AUTH_LOGIN_REQUEST action', () => {
        const expectedAction = {
            type: AUTHENTICATION_LOGIN_REQUEST,
        };
        const result = loginRequest();
        expect(result).toEqual(expectedAction);
    });
});


//test Una acción asíncrona.
describe('login', () => {
    const credentials = 'credentials';
    const action = login(credentials);

    describe('when login api resolves', () => {
        const dispatch = jest.fn();
        const api = {
            authService: {
                login: jest.fn().mockResolvedValue(),
            },
        };

        test('should follow the login flow', async() => {
            await action(dispatch, undefined, { api });
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: AUTHENTICATION_LOGIN_REQUEST });
            expect(api.authService.login).toHaveBeenCalledWith(credentials);
            expect(dispatch).toHaveBeenNthCalledWith(2, { type: AUTHENTICATION_LOGIN_SUCCESS });
        });
    });


});