//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
//WHEN I view future weather conditions for that city
//HEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city

const form = document.querySelector('#form');
var searchCity = document.querySelector('#searchCity')
var searchState = document.querySelector('#searchState')
var searchCountry = document.querySelector('#searchCountry')
var displayResults = document.querySelector('.searchResults')
var pastSearch = document.querySelector('#past')
var lat = '';
var lon = '';
var city = '';
var state = '';
var countryCode = '';
var searchBtn = document.querySelector('#searchbutton');
const apiKey = "c5fdaf1d4bca79e9226907e1b4e3b623"

console.log("variables established")

console.log(apiURL)

//testing URL creation
//function URLTEST() {
   // let lat = "LATUTUDE"
   // let lon = "LONGITUDE"
  //  apiURL = ('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
   // console.log(apiURL)
//}

//URLTEST()

//function addWeatherToPage(respData)

searchBtn.addEventListener("click", function search(event) {
    event.preventDefault();
    city = searchCity.value;
    state = searchState.value;
    countryCode = searchCountry.value;

    console.log(city, state, countryCode)
    var geoapiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + countryCode + "&limit=1&appid=" + apiKey

    console.log(geoapiURL)
    fetch(geoapiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let lat = data[0].lat
            let lon = data[0].lon
            var apiURL = ('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)

            console.log(apiURL)

            fetch(apiURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                });
        });

})
