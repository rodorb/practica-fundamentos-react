import { getAdvert, getAreAdvertisementsLoaded, getAreTagsLoaded } from "./selectors";
import { ADVERTISEMENTS_FAILURE, ADVERTISEMENTS_REQUEST, ADVERTISEMENTS_SUCCESS, AD_CREATION_REQUEST, AD_CREATION_SUCCESS, AD_DELETION_REQUEST, AD_DELETION_SUCCESS, AD_REQUEST, AUTHENTICATION_LOGIN_FAILURE, AUTHENTICATION_LOGIN_REQUEST, AUTHENTICATION_LOGIN_SUCCESS, AUTHENTICATION_LOGOUT_SUCCESS, TAGS_FAILURE, TAGS_REQUEST, TAGS_SUCCESS, UI_RESET_ERROR } from "./types"

///LOGIN
export const loginRequest = () => {
    return {
        type: AUTHENTICATION_LOGIN_REQUEST
    }
};
export const loginSucces = () => {
    return {
        type: AUTHENTICATION_LOGIN_SUCCESS
    }
};
export const loginFailure = (error) => {
    return {
        type: AUTHENTICATION_LOGIN_FAILURE,
        payload: error,
        error: true
    }
};
export const logoutSuccess = () => ({
    type: AUTHENTICATION_LOGOUT_SUCCESS,
});

export const login = (credentials) => {
    return async(dispatch, _getState, { api }) => {
        const { authService } = api;
        dispatch(loginRequest());
        try {
            await authService.login(credentials);
            dispatch(loginSucces());
            //TODO: hacer la redireccion
        } catch (error) {
            dispatch(loginFailure(error));
        }
    }
};

export const logout = () => {
    return function(dispatch, _getState, { api }) {
        const { authService } = api;
        return authService.logout().then(() => {
            dispatch(logoutSuccess());
        });
    };
};

//ALL ADVERTISEMENTS
export const advertsRequest = () => {
    return {
        type: ADVERTISEMENTS_REQUEST
    }
};

export const advertsSuccess = (adverts) => {
    return {
        type: ADVERTISEMENTS_SUCCESS,
        payload: adverts
    }
};

export const advertsFailure = (error) => {
    return {
        type: ADVERTISEMENTS_FAILURE,
        payload: error,
        error: true
    }
};


export const advertisements = () => {
    return async(dispatch, _getState, { api }) => {
        const { advertsService } = api;
        //Lógica para que al volver a la pagina del listado (siempre y cuando no recargue la pagina)
        //no se vuelva a hacer la peticion al API, si no que coja los datos del estado de redux
        const advertismentsLoaded = getAreAdvertisementsLoaded(_getState());
        if (advertismentsLoaded) return;
        try {
            dispatch(advertsRequest());
            const advertisements = await advertsService.getAllAdvertisements();
            dispatch(advertsSuccess(advertisements));
        } catch (error) {
            dispatch(advertsFailure(error));
        }
    }
};



//GET ADVERT
export const advertRequest = () => {
    return {
        type: AD_REQUEST
    }
};

export const advertSuccess = (advert) => {
    return {
        type: AD_REQUEST,
        payload: advert
    }
};

export const advertFailure = (error) => {
    return {
        type: AD_REQUEST,
        payload: error,
        error: true
    }
};

export const advertisement = (advertId) => {
    return (dispatch, _getState, { api }) => {
        const { advertsService } = api;
        //Lógica apra que solo haga la llamad al API cuando se recargue la pagina,
        //no cuando vaya del lsitado de anuncios al detalle de unanuncio que ya se encuentra
        //en el store
        const advertLoaded = getAdvert(advertId)(_getState());
        if (advertLoaded) return;
        try {
            dispatch(advertRequest());
            const advert = advertsService.getAdvert(advertId);
            dispatch(advertSuccess(advert))

        } catch (error) {
            dispatch(advertFailure(error));
        }
    }
};

//ADVERT CREATION

export const advertCreationRequest = () => {
    return {
        type: AD_CREATION_REQUEST
    };
};

export const advertCreationSuccess = (advert) => {
    return {
        type: AD_CREATION_SUCCESS,
        payload: advert
    };
};

export const advertCreationFailure = (error) => {
    return {
        type: AD_CREATION_REQUEST,
        payload: error,
        error: true
    };
};


export const advertCreation = (body) => {
    return async(dispatch, _getState, { api }) => {
        const { advertsService } = api;
        try {
            dispatch(advertCreationRequest());
            const { id } = await advertsService.createAdvert(body);
            const createdAdvert = await advertsService.getAdvert(id);
            dispatch(advertCreationSuccess(createdAdvert));
        } catch (error) {
            dispatch(advertCreationFailure(error));
        }
    }
};

//ADVERT DELETION

export const advertDeletionRequest = () => {
    return {
        type: AD_DELETION_REQUEST
    };
};

export const advertDeletionSuccess = (advertId) => {
    return {
        type: AD_DELETION_SUCCESS,
        payload: advertId
    };
};

export const advertDeletionFailure = (error) => {
    return {
        type: AD_DELETION_REQUEST,
        payload: error,
        error: true
    };
};


export const advertDeletion = (advertId) => {
    return async(dispatch, _getState, { api }) => {
        const { advertsService } = api;
        try {
            dispatch(advertDeletionRequest());
            await advertsService.deleteAdvert(advertId);
            dispatch(advertDeletionSuccess(advertId));
        } catch (error) {
            dispatch(advertDeletionFailure(error));
        }
    }
};


//TAGS
export const tagsRequest = () => {
    return {
        type: TAGS_REQUEST
    };
};

export const tagsSuccess = (tags) => {
    return {
        type: TAGS_SUCCESS,
        payload: tags
    };
};

export const tagsFailure = (error) => {
    return {
        type: TAGS_FAILURE,
        payload: error,
        error: true
    };
};


export const allTags = () => {
    return async(dispatch, _getState, { api }) => {
        const { advertsService } = api;
        const tagsLoaded = getAreTagsLoaded(_getState());
        if (tagsLoaded) return;
        try {
            dispatch(tagsRequest());
            const tags = await advertsService.getTags();
            dispatch(tagsSuccess(tags));
        } catch (error) {
            dispatch(tagsFailure(error));
        }
    }
};


//UI
export const uiResetError = () => ({
    type: UI_RESET_ERROR,
});