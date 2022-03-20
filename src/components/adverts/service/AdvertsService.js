import ApiClient from '../../api-client/Client.js'
const advertsBaseUrl = '/api/v1/adverts';
class AdvertsService{
    getAllAdvertisements(){
        const url =  `${advertsBaseUrl}`;
        return ApiClient.client.get(url);
    }

    getAdvert(id){
        const url =  `${advertsBaseUrl}/${id}`;
        return ApiClient.client.get(url);
    }

    getTags(){
        const url =  `${advertsBaseUrl}/tags`;
        return ApiClient.client.get(url);
    }

    createAdvert(body){
        const url =  `${advertsBaseUrl}`;
        return ApiClient.client.post(url, body);
    }

    deleteAdvert(id){
        const url =  `${advertsBaseUrl}/${id}`;
        return ApiClient.client.delete(url);
    }
}

export default new AdvertsService();