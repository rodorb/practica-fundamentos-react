import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import AdvertsService from '../components/adverts/service/AdvertsService';
import AuthService from '../components/auth/AuthService';
import { AD_CREATION_SUCCESS, AD_DELETION_SUCCESS, AUTHENTICATION_LOGIN_SUCCESS, AUTHENTICATION_LOGOUT_SUCCESS } from './types';
const api = { advertsService: AdvertsService, authService: AuthService };

const failureRedirections =
    (history, redirections) => _store => next => action => {
        const result = next(action);
        if (action.error) {
            const redirection = redirections[action.payload.status];
            if (redirection) {
                history.push(redirection);
            }
        }

        return result;
    };

const successRedirections =
    (history, redirections) => _store => next => action => {
        const result = next(action);
        const redirection = redirections[action.type];
        if (redirection) {
            redirection(history, action.payload);
        }

        return result;
    };

const storeSetup = (preloadedState, { history }) => {
    const middlewares = [
        thunk.withExtraArgument({ api, history }),
        failureRedirections(history, { 401: '/login', 404: '/404' }),
        successRedirections(history, {
            [AUTHENTICATION_LOGIN_SUCCESS]: history => {
                const redirectTo = history?.location?.state?.redirectTo?.pathname || '/';
                history.replace(redirectTo);
            },
            [AUTHENTICATION_LOGOUT_SUCCESS]: history => history.replace('/login'),
            [AD_CREATION_SUCCESS]: (history, payload) => history.push(`/adverts/${payload.id}`),
            [AD_DELETION_SUCCESS]: (history) => history.push(`/`)
        }),
    ];
    return createStore(
        combineReducers(reducers),
        preloadedState,
        composeWithDevTools(applyMiddleware(...middlewares)))
};

export default storeSetup;