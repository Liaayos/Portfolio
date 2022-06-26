const requestURL = "https://swapi.dev/api/people";

fetch(requestURL)
    .then(function (response) {
        return response.json()
    })
    .then(function () {
        
    })