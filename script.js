var form = document.querySelector('#form');
var search = document.querySelector('#searchCity')
var lat = '';
var lon = '';
var city = '';
var searchBtn = document.querySelector('#searchButton');
var apiKey = "c5fdaf1d4bca79e9226907e1b4e3b623"

console.log("variables established")

var apiURL = ('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat.text + '&lon=' + lon.value + '&appid=' + apiKey)

console.log('apiURL')

function URLTEST () {
let lat = "LATUTUDE"
let lon = "LONGITUDE"
let apiKey = "KEYTIME"
apiURL = ('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
console.log(apiURL)
}

URLTEST ()

//function addWeatherToPage(respData)