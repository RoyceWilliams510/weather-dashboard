$(document).ready(function(){
    $("#currentDay").text(moment().format("dddd, MMM Do YYYY"));
    if(JSON.parse(localStorage.getItem("savedCities")) !==null){
        savedCities = JSON.parse(localStorage.getItem("savedCities"));
        createList();
        renderWeather(savedCities[0]);
    }

})

// global variables 
var myKey = "6f02d570f4546e29df74e2c093e143c5"
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
    // Need to append the city name to the table

    // Need to change the weather displayed

}

// Event listener for the cityBtn class
$(document).on("click",".cityBtn",function(){
    console.log($(this).val());
    renderWeather($(this).val());

})


// this reupdates the list on load and when a new city is submitted
function createList(){
    // checks local storage for the submitted citys

    console.log(savedCities);
    var target = $("#cityList")
    $("tbody").empty();
    for(var i =0;i <savedCities.length; i++){
        console.log(savedCities[i]);
        var row = $("<tr><td><button class = 'cityBtn' value ='"+savedCities[i]+"' > "+savedCities[i]+" </button></td><tr>");
        target.append(row);

    }

}

// checks if the submitted city has a corresponding result when searched
function checksCity(location){
    // this takes the argument of location which is the submitted string from the user input
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+location+"&appid=6f02d570f4546e29df74e2c093e143c5";
    $.ajax({
        statusCode:{
            404: function() {
                alert('There are no citys that goes by this name');
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
        savedCities.push(location)
        localStorage.setItem("savedCities",JSON.stringify(savedCities));
        createList();
        renderWeather(location);

    
      })


}
var lat;
var lon;
// renders the weather page based on the city selected/submitted
function renderWeather(cityPassed){
    var target = "#main-card-";
    var todaysDate = moment().format('l');
    console.log(todaysDate);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityPassed+"&units=imperial&appid=6f02d570f4546e29df74e2c093e143c5";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(response.main.temp);
        console.log(response.coord.lat);
        console.log(response.coord.lon);
        getUV(response.coord.lat,response.coord.lon);
        var img = $("<img src = 'http://openweathermap.org/img/wn/"+response.weather[0].icon+".png'>");
        $(target+"temp").text("Temperature: "+response.main.temp+ " F°");
        $(target+"humidity").text("Humidity: "+response.main.humidity+ "%");
        $(target+"wind").text("Wind: "+response.wind.speed+ " MPH");
        $(target+"title").text(cityPassed+" ("+todaysDate+")");
        $(target+"title").append(img)

    })
    
    render5Day(cityPassed);
    
}

function getUV(lat,lon){
    var secondURL = "http://api.openweathermap.org/data/2.5/uvi?appid=6f02d570f4546e29df74e2c093e143c5&lat="+lat+"&lon="+lon;
    $.ajax({
        url: secondURL,
        method: "GET"
    }).then(function(response){
        $("#main-card-uv").text("UV: "+response.value);
        if(response.value<=2){
            $("#main-card-uv").addClass("healthy")
        }
        if(2<response.value<=5){
            $("#main-card-uv").addClass("moderate")
        }
        if(5<response.value<=7){
            $("#main-card-uv").addClass("unhealthy")
        }
        if(7<response.value<=10){
            $("#main-card-uv").addClass("dead")
        }
    });
}

function render5Day(cityPassed){

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityPassed+"&units=imperial&appid=6f02d570f4546e29df74e2c093e143c5";
    var target = $("#5-day");
    target.empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var date = response.list[0].dt_txt
        console.log(response.list[0]);
        var card = $("<div class = 'col fc'><div class = 'card forecast-card' style=' width:220px;'> "+
        "<div class='card-body'>"+
        "<h5 class='card-title' id = 'day1-card-title'>"+date.slice(0,10)+"</h5>"+
        "<img class = 'card-img' id = 'day2-card-img' src = 'http://openweathermap.org/img/wn/"+response.list[0].weather[0].icon+".png'>"+

        "<h6 class='card-subtitle mb-2 text-muted' id = 'day1-card-temp'> Temperature: "+response.list[0].main.temp +" F°</h6>"+
        "<h6 class='card-subtitle mb-2 text-muted' id = 'day1-card-humidity'>Humidity: "+response.list[0].main.humidity+ "%</h6></div></div></div>");
        $("#5-day").append(card);
    })
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var date = response.list[8].dt_txt
        console.log(response.list[8]);
        var card = $("<div class = 'col fc'><div class = 'card forecast-card' style=' width:220px;'> "+
        "<div class='card-body'>"+
        "<h5 class='card-title' id = 'day2-card-title'>"+date.slice(0,10) +"</h5>"+
        "<img class = 'card-img' id = 'day2-card-img' src = 'http://openweathermap.org/img/wn/"+response.list[8].weather[0].icon+".png'>"+
        "<h6 class='card-subtitle mb-2 text-muted' id = 'day2-card-temp'> Temperature: "+response.list[8].main.temp +" F°</h6>"+
        "<h6 class='card-subtitle mb-2 text-muted' id = 'day2-card-humidity'>Humidity: "+response.list[8].main.humidity+ "%</h6></div></div></div>");
        $("#5-day").append(card);
    })
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var date = response.list[16].dt_txt
        console.log(response.list[16]);
        var card = $("<div class = 'col fc'><div class = 'card forecast-card' style=' width:220px;'> "+
        "<div class='card-body'>"+
        "<h5 class='card-title' id = 'day3-card-title'>"+date.slice(0,10) +"</h5>"+
        "<img class = 'card-img' id = 'day2-card-img' src = 'http://openweathermap.org/img/wn/"+response.list[16].weather[0].icon+".png'>"+

        "<h6 class='card-subtitle mb-2 text-muted' id = 'day3-card-temp'> Temperature: "+response.list[16].main.temp +" F°</h6>"+
        "<h6 class='card-subtitle mb-2 text-muted' id = 'day3-card-humidity'>Humidity: "+response.list[16].main.humidity+ "%</h6></div></div></div>");
        $("#5-day").append(card);
    })
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var date = response.list[24].dt_txt
        console.log(response.list[24]);
        var card = $("<div class = 'col fc'><div class = 'card forecast-card' style=' width:220px;'> "+
        "<div class='card-body'>"+
        "<h5 class='card-title' id = 'day4-card-title'>"+date.slice(0,10)+"</h5>"+
        "<img class = 'card-img' id = 'day2-card-img' src = 'http://openweathermap.org/img/wn/"+response.list[24].weather[0].icon+".png'>"+
        "<h6 class='card-subtitle mb-2 text-muted' id = 'day4-card-temp'> Temperature: "+response.list[24].main.temp +" F°</h6>"+
        "<h6 class='card-subtitle mb-2 text-muted' id = 'day4-card-humidity'>Humidity: "+response.list[24].main.humidity+ "%</h6></div></div></div>");
        $("#5-day").append(card);
    })
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var date = response.list[32].dt_txt
        console.log(response.list[16]);
        var card = $("<div class = 'col fc'><div class = 'card forecast-card' style=' width:220px;'> "+
        "<div class='card-body'>"+
        "<h5 class='card-title' id = 'day5-card-title'>"+date.slice(0,10)+"</h5>"+
        "<img class = 'card-img' id = 'day2-card-img' src = 'http://openweathermap.org/img/wn/"+response.list[32].weather[0].icon+".png'>"+
        "<h6 class='card-subtitle mb-2 text-muted' id = 'day5-card-temp'> Temperature: "+response.list[32].main.temp +" F°</h6>"+
        "<h6 class='card-subtitle mb-2 text-muted' id = 'day5-card-humidity'>Humidity: "+response.list[32].main.humidity+ "%</h6></div></div></div>");
        $("#5-day").append(card);
    })
}

