//import {getJSON} from "./utilities"

const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';

function getJSON(url) {
    
    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                console.log(response.json())
                return response.json();
            }
        })
        .catch(function(error){
            console.log(error);
        });
}

const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};




// function getQuakesForLocation() {
//   getLocation()
//         .then(function (response) {

//             const lat = response.coords.latitude
//             const long = response.coords.longitude

//             console.log(response)

//             // call the getLocation function to get the lat/long

//             // use that information to build out the correct URL
//             const geoUrl = baseUrl + "&latitude=" + lat + "&longitude=" + long + "&maxradiuskm=100" // add location information here
//             // use the url to request the correct quakes 
            
//             console.log(geoUrl)
//             console.log(getJSON(geoUrl))
//         })
//     //console.log(getJSON(geoUrl))

//     //log out the quakes for now.
// }

function testQuaques(){
    
    const quakeList = getJSON(baseUrl);

    return console.log(quakeList);
    
};

testQuaques();