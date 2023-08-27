//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
//WHEN I view future weather conditions for that city
//HEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city


//setting up basic variables
const form = document.querySelector('#form');
var searchCity = document.querySelector('#searchCity')
var searchState = document.querySelector('#searchState')
var searchCountry = document.querySelector('#searchCountry')
var displayResults = document.querySelector('.searchResults')
var forecast = document.querySelectorAll('.forecast')
var resultName = document.querySelector('#resultName')
var resultDate = document.querySelectorAll('#resultDate')
var resultIcon = document.querySelectorAll(".currentIcon")
var resultTemp = document.querySelectorAll('#resultTemp')
var resultHumidity = document.querySelectorAll('#resultHumidity')
var resultWind = document.querySelectorAll('#resultWind')
var pastSearch = document.querySelector('#past')
var searchData = []
var lat = '';
var lon = '';
var city = '';
var state = '';
var countryCode = '';
var searchBtn = document.querySelector('#searchbutton');
const apiKey = "c5fdaf1d4bca79e9226907e1b4e3b623"
const searchDisplay = document.querySelector(".searchResults")


console.log("variables established")


//testing URL creation
//function URLTEST() {
// let lat = "LATUTUDE"
// let lon = "LONGITUDE"
//  apiURL = ('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
// console.log(apiURL)
//}

//URLTEST()

//rendering list of past search cities as clickable buttons
function renderPastSearch() {
    pastSearch.innerHTML = "";

    for (var i = 0; i < pastSearch.length; i++) {
        var pastCity = pastSearch[i];

        var li = document.createElement("li");
        li.setAttribute("data-index", i);

        var button = document.createElement("button");
        button.textContent = pastCity;

        li.appendChild(button);
        todoList.appendChild(li);
    }
}

//pulling past searches from local storage
function init() {
    var storedSearches = JSON.parse(localStorage.getItem("pastsearches"));
    if (storedSearches !== null) {
        pastSearch = storedSearches;
    }
    renderPastSearch();
}

//adding search city info t local storage
function storeSearches() {
    localStorage.setItem("pastsearches", JSON.stringify(pastSearch));
}

//creating search logic to render weather info when past search city clicked
pastSearch.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button") === true) {
        var index = element.parentElement.getAttribute("data-index");
        todos.splice(index, 1);
        // TODO: What will happen when the following functions are called?

        storeTodos();
        renderTodos();

        var apiURL = ('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + "&units=imperial")

        fetch(apiURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //writing weather results to display on the page
                searchDisplay.classList.remove("hide")
                console.log(data)
                resultName.innerHTML = city
                let j = 0
                resultDate.forEach(date => {
                    GMTDate = data.list[j].dt_txt
                    date.innerHTML = dayjs(GMTDate).format("MMM D")
                    j = (j + 8)
                    console.log(j)
                })
                let k = 0
                resultIcon.forEach(image => {
                    var icon = data.list[k].weather[0].icon
                    //source javascript image.src code: https://softauthor.com/javascript-working-with-images/
                    image.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                    k = (k + 8)
                })
                let l = 0
                resultTemp.forEach(temp => {
                    temp.innerHTML = "Temperature: " + data.list[l].main.temp + "º F"
                    l = (l + 8)
                })
                let m = 0
                resultHumidity.forEach(humidity => {
                    humidity.innerHTML = "Humidity: " + data.list[m].main.humidity + "%"
                    m = (m + 8)
                })
                let o = 0
                resultWind.forEach(wind => {
                    wind.innerHTML = "Wind Speed: " + data.list[o].wind.speed + "mph"
                    o = (o + 8)
                })
            }
            )
    }
});

init();


//function addWeatherToPage(respData)

//adding event listener to search button
searchBtn.addEventListener("click", function search(event) {
    event.preventDefault();
    //setting parameters from form inputs
    city = searchCity.value;
    state = searchState.value;
    countryCode = searchCountry.value;

    console.log(city, state, countryCode)
    var geoapiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + countryCode + "&limit=1&appid=" + apiKey

    console.log(geoapiURL)

    //setting up first API call to translate to lat/lon coordinates
    fetch(geoapiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //capturing coordinates
            if (data !== undefined) {
                let lat = data[0].lat
                let lon = data[0].lon
                var apiURL = ('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + "&units=imperial")

                console.log(apiURL)

                //storing search info and building list
                var newSearch = [{ city, lat, lon }]
                searchData.push(newSearch)
                searchCity.value = "";
                searchCountry.value = "";
                searchState.value = "";

                storeSearches();
                renderPastSearch();

                //setting up second API call to get weather
                fetch(apiURL)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        //writing weather results to display on the page
                        searchDisplay.classList.remove("hide")
                        console.log(data)
                        resultName.innerHTML = city
                        let j = 0
                        resultDate.forEach(date => {
                            GMTDate = data.list[j].dt_txt
                            date.innerHTML = dayjs(GMTDate).format("MMM D")
                            j = (j + 8)
                            console.log(j)
                        })
                        let k = 0
                        resultIcon.forEach(image => {
                            var icon = data.list[k].weather[0].icon
                            //source javascript image.src code: https://softauthor.com/javascript-working-with-images/
                            image.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                            k = (k + 8)
                        })
                        let l = 0
                        resultTemp.forEach(temp => {
                            temp.innerHTML = "Temperature: " + data.list[l].main.temp + "º F"
                            l = (l + 8)
                        })
                        let m = 0
                        resultHumidity.forEach(humidity => {
                            humidity.innerHTML = "Humidity: " + data.list[m].main.humidity + "%"
                            m = (m + 8)
                        })
                        let o = 0
                        resultWind.forEach(wind => {
                            wind.innerHTML = "Wind Speed: " + data.list[o].wind.speed + "mph"
                            o = (o + 8)
                        })
                    }
                    )
            }
            else {
                alert("Your search parameters are not valid.  Please try again.")
            }
        });
});


