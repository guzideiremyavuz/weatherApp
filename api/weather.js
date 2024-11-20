import axios from "axios";

import { apiKey } from "../theme";

/* belirli şehrin hava durumu için url üretecek */
const forecastEndpoint = params=> `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
/* şehrin adına göre yer bilgisi aramak için url üretcek*/
const locationEndpoint = params=> `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

/* endpoiintlere(api çağrısı yapılcak url) alarak axios ile bir http isteği gödercek*/ 

const apiCall = async(endpoint)=>{
    const options = {
        /* http de kullanılcaklar yazıldı*/
        method: 'GET',
        url: endpoint
    }
    try{
        const response = await axios.request(options); /* istek gönderildi */
        return response.data;/* alınan veri döndürülcek */
        }catch(err){
            console.log('error: ', err);
            return null;
        }
    }

    export const fetchWeatherForecast = params=>{
        let forecastUrl = forecastEndpoint(params);
        return apiCall(forecastUrl);
    }

    export const fetchLocations = params=>{
        return apiCall(locationEndpoint(params));
    }
    