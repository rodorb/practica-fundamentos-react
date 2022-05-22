import { getAdvert } from '../selectors';

describe('getAdvert', () => {
    it('should return a advertisement', () => {
        const advertId = '1';
        const adverts = [{ id: advertId }];
        const state = { advertisements: { data: adverts } };
        expect(getAdvert(advertId)(state)).toEqual(adverts[0]);
    });

    it('should return undefined', () => {
        const advertId = '1';
        const adverts = [];
        const state = { advertisements: { data: adverts } };
        expect(getAdvert(advertId)(state)).toBeUndefined();
    });
});