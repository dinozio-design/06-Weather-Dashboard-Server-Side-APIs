var opernWeatherKey = "dec5aeffcb14cae3dce591a4fba4758b";
var userFormEl = $('#userForm');
var historyButtonsEl = $('#historyButtons');
// var nameInputEl = document.querySelector('#username');
var cityNameSearchTerm = $('#cityNameSearch');
var countrySelect = $('#countrySelect')
var todaysDate = $('#todaysDate');
var resultContainerEl = $('#resultContainer');

var countryCodes = [["CAN","Canada"],["US","United States"]];
//     CAN:"Canada",
//     US: "United States"

// };

$.each(countryCodes, function(){
    console.log(this[0], this[1]);
    countrySelect.append(`<option id="${this[0]}">${this[1]}</option>`)
})

// console.log(countryCodes);
// console.log(countrySelect);

function userSearch(event){
    event.preventDefault();
    console.log(`was pushed`, event);
}

userFormEl.on('submit',userSearch);
