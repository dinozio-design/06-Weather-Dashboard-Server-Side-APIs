var opernWeatherKey = "dec5aeffcb14cae3dce591a4fba4758b";
var userFormEl = $('#userForm');
var historyButtonsEl = $('#historyButtons');
// var nameInputEl = document.querySelector('#username');
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
    console.log(this[0], this[1]);
    countrySelect.append(`<option id="${this[0]}">${this[1]}</option>`)
})

// console.log(countryCodes);
// console.log(countrySelect);


function submitHandler(event) {
    event.preventDefault();
    var cityName = this.cityNameSearch.value.trim();
    if (cityName) {
        // getUserRepos(cityName);
        console.log(`I got ${cityName}`);

        cityNameSearch.textContent = '';
        countrySelect.value = 'Select Country';
    } else {
        alert('Please enter a GitHub username');
       
    }
};
// console.log(`was pushed`, event, this);


userFormEl.on('submit', submitHandler);


// js-example

// function ($el){
//     $el.classList.add('s-active');
// }
