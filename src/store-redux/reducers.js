import {
    ADVERTISEMENTS_FAILURE,
    ADVERTISEMENTS_REQUEST,
    ADVERTISEMENTS_SUCCESS,
    AD_CREATION_FAILURE,
    AD_CREATION_REQUEST,
    AD_CREATION_SUCCESS,
    AD_DELETION_FAILURE,
    AD_DELETION_REQUEST,
    AD_DELETION_SUCCESS,
    AD_FAILURE,
    AD_REQUEST,
    AD_SUCCESS,
    AUTHENTICATION_LOGIN_FAILURE,
    AUTHENTICATION_LOGIN_REQUEST,
    AUTHENTICATION_LOGIN_SUCCESS,
    AUTHENTICATION_LOGOUT_SUCCESS,
    TAGS_FAILURE,
    TAGS_REQUEST,
    TAGS_SUCCESS,
    UI_RESET_ERROR
} from "./types";


export const defaultState = {

    authentication: false,
    advertisements: {
        data: [],
        loaded: false
    },
    tags: {
        data: [],
        loaded: false
    },
    ui: {
        isLoading: false,
        error: null
    }
};

export const authentication = (state = defaultState.authentication, action) => {
    switch (action) {
        case AUTHENTICATION_LOGIN_SUCCESS:
            return true;
        case AUTHENTICATION_LOGOUT_SUCCESS:
            return false;
        default:
            return state;
    }

}

export const advertisements = (state = defaultState.advertisements, action) => {
    switch (action) {
        case ADVERTISEMENTS_SUCCESS:
            return { loaded: true, data: action.payload };
        case AD_SUCCESS:
            return { loaded: true, data: [...state.data, action.payload] };
        case AD_CREATION_SUCCESS:
            return { loaded: true, data: [action.payload, ...state.data] }; //para que el anuncio creado esté en primera posicion en el listado
        case AD_DELETION_SUCCESS:
            return { loaded: true, data: state.data.filter((ad) => { return ad.id !== action.payload }) }; //en el payload devolvere el id del anuncio borrado
        default:
            return state;
    }
}

export const tags = (state = defaultState.tags, action) => {
    switch (action) {
        case TAGS_SUCCESS:
            return { loaded: true, data: action.payload };
        default:
            return state;
    }
}

export const ui = (state = defaultState.ui, action) => {
    switch (action) {
        case AUTHENTICATION_LOGIN_REQUEST:
        case ADVERTISEMENTS_REQUEST:
        case AD_CREATION_REQUEST:
        case AD_DELETION_REQUEST:
        case TAGS_REQUEST:
        case AD_REQUEST:
            return {...state, isLoading: true, error: null };
        case AUTHENTICATION_LOGIN_SUCCESS:
        case ADVERTISEMENTS_SUCCESS:
        case AD_CREATION_SUCCESS:
        case AD_DELETION_SUCCESS:
        case TAGS_SUCCESS:
        case AD_SUCCESS:
            return {...state, isLoading: false };
        case AUTHENTICATION_LOGIN_FAILURE:
        case ADVERTISEMENTS_FAILURE:
        case AD_CREATION_FAILURE:
        case AD_DELETION_FAILURE:
        case TAGS_FAILURE:
        case AD_FAILURE:
            return {...state, isLoading: false, error: action.payload };
        case UI_RESET_ERROR:
            return {...state, error: null }
        default:
            return state;
    }
}