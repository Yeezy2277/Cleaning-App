import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location'
Geocoder.init("AIzaSyB1LhEAWQxJrm2Vp5Dci-cvcFcYEFdOD_Y",{language : "ru"});
export const getLocation = () => {
    return new Promise(
        (resolve, reject) => {
            Location.installWebGeolocationPolyfill()
            navigator.geolocation.getCurrentPosition(
                (data) => resolve(data.coords),
                (err) => reject(err)
            );
        }
    );
}

export const geocodeLocationByName = (locationName) => {
    return new Promise(
        (resolve, reject) => {
            Geocoder.from(locationName)
                .then(json => {
                    resolve(json.results[0].geometry.location);
                })
                .catch(error => reject(error));
        }
    );
}

export const geocodeLocationByCoords = (lat, long) => {
    return new Promise(
        (resolve, reject) => {
            Geocoder.from(lat, long)
                .then(json => {
                    resolve(json);
                })
                .catch(error => reject(error));
        }
    );
}

