function init() {
    var opernWeatherKey = "71786d75fbc7f8c6556506473f4a9371";
    var userFormEl = $('#userForm');
    var displayArea = $('#displayArea');
    var cityNameSearch = $('#cityNameSearch');
    var countrySelect = $('#countrySelect')
    var resultContainerEl = $('#resultContainer');
    var historyButtonsEl = $('#historyButtons');
    // in future builds will add ALL countries and their codes as array of objects
    // for now we will stick with Canada and US only 
    var countryCodes = [["CAN", "Canada"], ["US", "United States"]];
    var searches = [];
    $.each(countryCodes, function () {
        countrySelect.append(`<option id="${this[0]}">${this[1]}</option>`)
    });
    var storedHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedHistory !== null) {
        searches = storedHistory;
        renderHistory();
    };

    function contains(key) {
        for (i = 0; i < searches.length; i++) {
            if (searches[i].key === key) {
                console.log(`found Douplicate`);
                return true;
            }
        };
        return false;
    }
    function saveToLocalStorage(cityCoord) {
        var mySearchKey = `${cityCoord[0].lat}_${cityCoord[0].lon}`;
        var mySearchParam = {
            key: mySearchKey,
            city: cityCoord[0].name,
            country: cityCoord[0].country,
            lat: cityCoord[0].lat,
            lon: cityCoord[0].lon
        };
        let foundDouplicate = contains(mySearchKey);
        if (!foundDouplicate) {
            console.log(`no duoplicates`);
            searches.push(mySearchParam);
            localStorage.setItem("searchHistory", JSON.stringify(searches));
        };
        renderHistory();
    }
    function renderMainCard(obj, name) {
        displayArea.empty();
        displayArea.append(`<div class="card"><header class="card-header"><p class="card-header-title">Current Forecast for: ${name}(${obj.dt_txt.slice(0, 10)})</p></header><div class="card-content"><div class="content">
        <p>Temperature: ${obj.main.temp} C</p>
        <p>Humidity: ${obj.main.humidity} </p>
        <p>Wind Speed: ${obj.wind.speed} C</p>
        </div></div></div>`);
        resultContainerEl.empty();
    }
    function renderAheadCards(obj) {
        resultContainerEl.append(`<div class="card "><header class="card-header"><p class="card-header-title">${obj.dt_txt.slice(0, 10)}</p></header><div class="card-content"><div class="content">
        <p>Temperature: ${obj.main.temp} C</p>
        <p>Humidity: ${obj.main.humidity} </p>
        <p>Wind Speed: ${obj.wind.speed} C</p>
        </div></div></div>`);
    }
    function renderHistory() {
        console.log(searches);
        historyButtonsEl.empty();
        for (i = 0; i < searches.length; i++) {
            historyButtonsEl.append(`<button class="button" name=" ${searches[i].key}">${searches[i].city}, ${searches[i].country}</button>`
            );
        }
    }
    function getWeather(lat, lon) {
        var apiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + opernWeatherKey + "&units=metric";
        fetch(apiURL)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        let name = `${data.city.name}, ${data.city.country}`;
                        let forecasts = data.list;
                        renderMainCard(forecasts[0], name);
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
    function anotherWeather(event) {
        event.preventDefault();
        var saved = event.target.name.split("_");
        console.log(saved);
        x = saved[0].trim();
        y = saved[1].trim();
        getWeather(x, y);
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

        if (cityName && countryName != "Select Country") {
            getGeoCode(cityName, countryName);
            cityNameSearch.textContent = '';
            countrySelect.value = 'Select Country';
        } else {
            alert('Please enter valid city and country name');
        }
    };

    userFormEl.on('submit', submitHandler);
    historyButtonsEl.on('click', anotherWeather);
}
init();

