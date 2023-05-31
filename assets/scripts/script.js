var opernWeatherKey = "71786d75fbc7f8c6556506473f4a9371";
var userFormEl = $('#userForm');
var historyButtonsEl = $('#historyButtons');
var cityNameSearch = $('#cityNameSearch');
var cityNameDisplay = $('#cityNameDisplay');
var countrySelect = $('#countrySelect')
var todaysDate = $('#todaysDate');
var resultContainerEl = $('#resultContainer');

var countryCodes = [["CAN", "Canada"], ["US", "United States"]];

$.each(countryCodes, function () {
    // console.log(this[0], this[1]);
    countrySelect.append(`<option id="${this[0]}">${this[1]}</option>`)
})

function getWeather(lat, lon) {
    var apiURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=6&appid=" + opernWeatherKey + "&units=metric";
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    let forecasts = data.list
for (var i = 0; i<forecasts.length; i++){

    console.log(forecasts[i]);
    console.log("temperature is: "+forecasts[i].main.temp+" C");
    console.log(forecasts[i].weather[0].icon);
}
                    // must decide what method to call here!
                });
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
    if (country = "Canada") {
        code = "CA";
    } else if (country = "United States") {
        code = "US";
    }

    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + code + "&appid=" + opernWeatherKey;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    getWeather(data[0].lat, data[0].lon);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to GitHub');
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
