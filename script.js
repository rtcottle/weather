/*
TODO: Event listener -- generate elements
TODO: Save search to local storage
TODO: Link location name to coordinates
TODO: Display one day
TODO: Display days 2-6
TODO: Retain search as selectable button
*/

var searchBtn = getElementByID("search");
var API_KEY = "7b5f03654b5a109a294b890d0283e4e0";
var cardContainer = getElementByID("card-container");

function getApi() {
  var requestWeather = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${API_KEY}`;

  fetch(requestWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {}
    });
  //these might go under the getApi function after the for loop.
  var weatherHeader = document.createElement("header");
  var fiveDayForecast = document.createElement("h3");
  var weatherContainer = document.createElement("div");
  var dayCard = document.createElement("span");
  cardContainer.appendChild(weatherHeader);
  cardContainer.appendChild(fiveDayForecast);
  cardContainer.appendChild(weatherContainer);
  cardContainer.appendChild(dayCard);
  weatherHeader.setAttribute("class", "border border-dark");
  dayCard.setAttribute("class", "bg-dark text-light");
}

searchBtn.on("click", getApi);
