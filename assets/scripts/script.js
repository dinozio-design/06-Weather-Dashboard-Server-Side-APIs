var opernWeatherKey = "71786d75fbc7f8c6556506473f4a9371";
var userFormEl = $('#userForm');
var historyButtonsEl = $('#historyButtons');
var cityNameSearch = $('#cityNameSearch');
var cityNameDisplay = $('#cityNameDisplay');
var countrySelect = $('#countrySelect')
var todaysDate = $('#todaysDate');
var resultContainerEl = $('#resultContainer');
// in future builds will add ALL countries and their codes as array of objects
// for now we will stick with Canada and US only 
var countryCodes = [["CAN", "Canada"], ["US", "United States"]];

$.each(countryCodes, function () {
    countrySelect.append(`<option id="${this[0]}">${this[1]}</option>`)
})

function saveToLocalStorage(cityCoord) {
    var mySearchKey = `${cityCoord[0].lat}_${cityCoord[0].lon}`;
    var mySearchParam = {
        city: cityCoord[0].name,
        countrt: cityCoord[0].country
    };
    // console.log(cityCoord[0].lat);
    // console.log(cityCoord[0].lon);
    // console.log(cityCoord[0].name);
    // console.log(cityCoord[0].country);
    // console.log(mySearchParam);
    localStorage.setItem(mySearchKey, JSON.stringify(mySearchParam));
}

function renderMainCard(obj) {
    console.log(obj);
    // resultContainerEl.append("<")

}
function renderAheadCards(obj) {
    console.log(obj);
}
function getWeather(lat, lon) {
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + opernWeatherKey + "&units=metric";
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    let forecasts = data.list;
                    console.log(forecasts.length);
                    renderMainCard(forecasts[0]);
                    for (var i = 0; i < forecasts.length; i++) {
                        if (i % 8 == 7) {
                            renderAheadCards(forecasts[i]);
                        }
                    }
                })
            } else {
                alert('Error: ' + response.statusText);
                
            }
        })
        .catch(function (error) {
            alert('Unable to connect to the server');
        });
}
function getGeoCode(city, country) {
    var code = "";
    if (country == "Canada") {
        code = "CA";
    } else if (country == "United States") {
        code = "US";
    }
    var apiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + code + "&appid=" + opernWeatherKey;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    saveToLocalStorage(data);
                    getWeather(data[0].lat, data[0].lon);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (_error) {
            alert('Unable to connect to the weather servers');
        });
}


function submitHandler(event) {
    event.preventDefault();
    var cityName = this.cityNameSearch.value.trim();
    var countryName = this.countrySelect.value;

    // control 
    cityName = "buffalo";
    countryName = "United States";
    // end control

    if (cityName && countryName != "Select Country") {
        getGeoCode(cityName, countryName);
        cityNameSearch.textContent = '';
        countrySelect.value = 'Select Country';
    } else {
        alert('Please enter valid city and country name');
    }
};



userFormEl.on('submit', submitHandler);
