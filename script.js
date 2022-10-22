/*
TODO: Event listener -- generate elements
TODO: Display one day
TODO: Display days 2-6
TODO: Retain search as selectable button
TODO: remove text from search upon click
*/

var searchBtn = document.querySelector(".btn");
var APIKey = "7b5f03654b5a109a294b890d0283e4e0";
var cardContainer = document.getElementById("card-container");
var citySearch = document.getElementById("location");

function renderCities() {
  var pastCities = JSON.parse(localStorage.getItem("city"));
  for (var i = 0; i < pastCities.length; i++) {
    var listCity = document.createElement("button");
    listCity.textContent = pastCities[i];
    listCity.setAttribute("class", "btn btn-secondary w-100");
  }
}

function getApi() {
  localStorage.setItem(citySearch.value, JSON.stringify(citySearch.value));

  var requestLatLon = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch.value}&limit=5&appid=${APIKey}
`;
  fetch(requestLatLon)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat);
      console.log(lon);

      var requestWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
      fetch(requestWeather)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          console.log(data.list[0].main.temp);
          var todaysWeather = {
            temp: data.list[0].main.temp,
            icon: data.list[0].weather[0].icon,
            description: data.list[0].weather[0].description,
            wind: data.list[0].wind.speed,
          };
          console.log(todaysWeather);
          var weatherHeader = document.createElement("header");
          weatherHeader.textContent = "Hello";
          weatherHeader.setAttribute("class", "border border-dark");
          cardContainer.appendChild(weatherHeader);
          //   var fiveDayForecast = document.createElement("h3");
          //   var weatherContainer = document.createElement("div");
          //   var dayCard = document.createElement("span");
          //   cardContainer.appendChild(fiveDayForecast);
          //   cardContainer.appendChild(weatherContainer);
          //   cardContainer.appendChild(dayCard);
          //   dayCard.setAttribute("class", "bg-dark text-light");
          //   dayCard.textContent = "Hello";
          //   weatherContainer.textContent = "Hello";
        });

      //these might go under the getApi function after the for loop.
    });
}

searchBtn.addEventListener("click", getApi);
