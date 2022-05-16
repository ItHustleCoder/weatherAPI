import { POST } from '../types/index';
import { logger } from "../utils/logger";
import Factory from '../utils/Factory';
import axios from "axios";


const factory = new Factory();
let options = {
    headers: {
        "Authorization": "Bearer " + process.env.API_YELP_KEY
    }
};

class WeatherQuery {

    /** 
     * POST request
     * **/
    async index(payload: POST) {
        try {
            const { city } = payload;
            const api = await axios.get(factory.weatherUrl(city));
            const { coord, name, weather } = api.data;

            const yelpAPI = await axios.get(factory.yelpUrl(name), options);

            let store:any = [];
    
            yelpAPI.data.businesses.map((value:any) => {
                return store.push({ name:value.name, status: value.is_closed ? 'Closed' : 'Open', rating:value.rating, location: value.location.address1, number: value.phone ? value.phone : 'Not available', distance: factory.decimalConversion(value.distance) });
            })

            const result = [{ ...{ city: name, coordinates: {lat: coord.lat, lon: coord.lon }, weather: weather[0].main }, }, store];

            return result;
        } catch (e: any) {
            logger.error(e.message || 'Error in city services');
        }

    }

}

export default new WeatherQuery();
