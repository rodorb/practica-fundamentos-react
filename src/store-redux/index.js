import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import AdvertsService from '../components/adverts/service/AdvertsService';
import AuthService from '../components/auth/AuthService';
const api = { advertsService: AdvertsService, authService: AuthService };

const storeSetup = (preloadedState) => {
    const middlewares = [thunk.withExtraArgument(api)];
    return createStore(
        combineReducers(reducers),
        preloadedState,
        composeWithDevTools(applyMiddleware(...middlewares)))
};

export default storeSetup;