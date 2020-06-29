$(document).ready(function(){
    $("#currentDay").text(moment().format("dddd, MMM Do YYYY"));
    if(JSON.parse(localStorage.getItem("savedCities")) !==null){
        savedCities = JSON.parse(localStorage.getItem("savedCities"));
    }

})

// global variables 
var myKey = "6f02d570f4546e29df74e2c093e143c5"
var isCity = true;
var savedCities = [];

// On click this function submits the text value in the text box
function submitCity(){
    // this variable stores the data
    var cityName =$("#cityInput").val()
    // clears the input field 
    $("#cityInput").val("");
    console.log(cityName);
    // Need to check if the city has a result when searched
    checksCity(cityName);
    // Need to save it in local storage
    createList();
    // Need to append the city name to the table

    // Need to change the weather displayed

}


// this reupdates the list on load and when a new city is submitted
function createList(){
    // checks local storage for the submitted citys

}

// checks if the submitted city has a corresponding result when searched
function checksCity(location){
    // this takes the argument of location which is the submitted string from the user input
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+location+"&appid=6f02d570f4546e29df74e2c093e143c5";
    $.ajax({
        statusCode:{
            404: function() {
                alert('There are no citys that goes by this name');
                isCity = false;
                console.log(isCity);
                return;
            },
            500: function() {
                alert('500 status code! server error');
            }
        },
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response);
        if(isCity === true){
            savedCities.push(location)
            localStorage.setItem("savedCities",JSON.stringify(savedCities));
        }
        isCity = true;
      })


}

// renders the weather page based on the city selected/submitted
function renderWeather(){
    
}
