$(document).ready(function(){
    $("#currentDay").text(moment().format("dddd, MMM Do YYYY"));
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=6f02d570f4546e29df74e2c093e143c5";
    // Scream Ushindi (victory in Swahili)! at the top of your lungs
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      console.log(response);
    })

})