export const getIsLogged = (state) => { return state.authentication };
export const getAdvertisements = (state) => { return state.advertisements.data };
export const getAreAdvertisementsLoaded = (state) => { return state.advertisements.loaded };
export const getAdvert = (advertId) => {
    return (state) => {
        return state.advertisements.data.find((ad) => ad.id === advertId);
    }
};
export const getTags = (state) => { return state.tags.data };
export const getAreTagsLoaded = (state) => { return state.tags.loaded };

export const getUi = (state) => { return state.ui };