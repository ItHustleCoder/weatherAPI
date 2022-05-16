
import "../bootstrap";

class Factory {
    weatherUrl(address: string) {
        if (!address) {
            return `https://api.openweathermap.org/data/2.5/weather?q=Turin&appid=${process.env.API_WEATHER_KEY}`;
        } else {
            return `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${process.env.API_WEATHER_KEY}`
        }
    }

    yelpUrl(address: string) {
        if (!address) {
            return `https://api.yelp.com/v3/businesses/search?location=Turin&limit=${5}`
        } else {
            return `https://api.yelp.com/v3/businesses/search?location=${address}&limit=${5}`
        }
    }

    decimalConversion(value: number) {
        if (!value) {
            return "No info"
        } else {
            let floor = Math.floor(value);
            let km = floor / 1000;
            return km.toFixed(1) + " km";
        }
    }
}

export default Factory;