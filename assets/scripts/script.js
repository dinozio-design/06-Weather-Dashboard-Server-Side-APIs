var opernWeatherKey = "71786d75fbc7f8c6556506473f4a9371";
var userFormEl = $('#userForm');
var historyButtonsEl = $('#historyButtons');
var cityNameSearch = $('#cityNameSearch');
var cityNameDisplay = $('#cityNameDisplay');
var countrySelect = $('#countrySelect')
var todaysDate = $('#todaysDate');
var resultContainerEl = $('#resultContainer');

var countryCodes = [["CAN", "Canada"], ["US", "United States"]];
//     CAN:"Canada",
//     US: "United States"

// };

$.each(countryCodes, function () {
    // console.log(this[0], this[1]);
    countrySelect.append(`<option id="${this[0]}">${this[1]}</option>`)
})

// console.log(countryCodes);
// console.log(countrySelect);

function getWeather(lat, lon) {
    console.log(lat);
    console.log(lon);
    var apiURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=3&appid=" + opernWeatherKey +"&units=metric";
    console.log(apiURL);
    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                // getWeather(data[0].lat, data[0].lon);
    console.log(data);

            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to GitHub');
    });
    
}

function getGeoCode(city, country) {
    var code = "";
    if (country = "Canada") {
        code = "CA";
    } else if (country = "United States") {
        code = "US";
    }

    // api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=71786d75fbc7f8c6556506473f4a9371
    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + code + "&appid=" + opernWeatherKey;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
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
    // console.log(countryName);
    if (cityName && countryName != "Select Country") {

        // console.log(`I got ${cityName}`);
        // console.log(`I got ${countryName}`);

        cityNameSearch.textContent = '';
        countrySelect.value = 'Select Country';
    } else {
        alert('Please enter valid city and country name');
    }
};
// console.log(`was pushed`, event, this);

getGeoCode("Toronto", "Canada");

userFormEl.on('submit', submitHandler);
