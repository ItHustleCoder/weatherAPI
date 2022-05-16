import "./bootstrap";
import axios from "axios";
import Factory from "./utils/Factory";


let address = process.argv[2] || "Turin";
let options = {
    headers: {
        "Authorization": "Bearer " + process.env.API_YELP_KEY
    }
};
const factory = new Factory();


//This function will be runned immediately
(async () => {
    const api = await axios.get(factory.weatherUrl(address));
    const { coord, name, weather } = api.data;
    const yelpAPI = await axios.get(factory.yelpUrl(name), options);

    let store:any = [];
    
    yelpAPI.data.businesses.map((value:any) => {
        return store.push({ name:value.name, status: value.is_closed ? 'Closed' : 'Open', rating:value.rating, location: value.location.address1, number: value.phone ? value.phone : 'Not available', distance: factory.decimalConversion(value.distance) });
    })

    const result = [{ ...{ city: name, coordinates: {lat: coord.lat, lon: coord.lon }, weather: weather[0].main }, }, store]; 
    console.log(result);
     
})()
