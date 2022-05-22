import { advertisements, defaultState } from '../reducers';
import {
    ADVERTISEMENTS_SUCCESS,
} from '../types';


describe('advertisements', () => {
    it('should manage ADVERTISEMENTS_SUCCESS action', () => {
        const loadedAdvertisements = ['ad1'];
        const action = {
            type: ADVERTISEMENTS_SUCCESS,
            payload: loadedAdvertisements,
        };
        const result = advertisements(defaultState.advertisements, action);
        expect(result).toEqual({ loaded: true, data: loadedAdvertisements });
    });
});