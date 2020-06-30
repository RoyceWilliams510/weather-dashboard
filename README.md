# 06 Server-Side APIs: Weather Dashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

The following image demonstrates the application functionality:

![weather dashboard demo](./Assets/06-server-side-apis-homework-demo.png)

## Review
When the app is opened you will see the submit field for cities and an empty forecast card that will be updated by submitting a city name or selecting one of the past submitted cities in the table of buttons on the left side. By selecting a city you can see how the current forecast is and how the forecast will be at the same time of day in the following four days at the same time as the current forecast.

## Built With
* [Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/)
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [JQuery](https://learn.jquery.com/)
* [Momentjs](https://momentjs.com/)
* [OpenWeather API](https://openweathermap.org/api) 


## Authors

 **Royce Williams** 

- [Github](https://github.com/RoyceWilliams510/)
- [LinkedIn](https://www.linkedin.com/in/royce-williams-3334261ab/)


## Deployed Link

* [See Live Site](https://roycewilliams510.github.io/weather-dashboard/)

### Aknowledgments

* [stack overview help](https://stackoverflow.com/questions/415602/set-value-of-textarea-in-jquery)
## License

This project is licensed under the MIT License 
