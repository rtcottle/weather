/*
TODO: Display days 2-5
TODO: Retain search as selectable button
TODO: remove text from search upon click
*/

var searchBtn = document.querySelector(".btn");
var APIKey = "7b5f03654b5a109a294b890d0283e4e0";
var cardContainer = document.getElementById("card-container");
var citySearch = document.getElementById("location");

//retain previous searches as buttons
// function renderCities() {
//   var pastCities = JSON.parse(localStorage.getItem("city"));
//   pastCities.forEach(() => {
//     var listCity = document.createElement("button");
//     listCity.textContent = this.pastCities;
//     listCity.setAttribute("class", "btn btn-secondary w-100");
//   });
//   listCity.ong("click", getApi);
// }

function getApi() {
  localStorage.setItem("city", JSON.stringify(citySearch.value));
  //api call to get the latitude and longitude based on the city name.
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
      //api call to push the retrieved lat/lon to retrieve weather information
      var requestWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
      fetch(requestWeather)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          console.log(data.list[0].main.temp);
          var todaysWeather = {
            date: data.list[0].dt_txt,
            temp: data.list[0].main.temp,
            icon: data.list[0].weather[0].icon,
            humidity: data.list[0].main.humidity,
            description: data.list[0].weather[0].description,
            wind: data.list[0].wind.speed,
          };
          console.log(todaysWeather);

          function weatherCardHeader() {
            var weatherHeader = document.createElement("h2");
            var temp = document.createElement("h3");
            var describeTemp = document.createElement("h3");
            var windStatus = document.createElement("h3");
            var humidity = document.createElement("h3");
            var icon = document.createElement("i");
            var iconCode = todaysWeather.icon;
            var iconURL =
              "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            weatherHeader.textContent = "Date: " + todaysWeather.date;
            weatherHeader.setAttribute("class", "border border-dark");
            cardContainer.appendChild(weatherHeader);
            weatherHeader.appendChild(temp);
            temp.append(icon);
            weatherHeader.appendChild(humidity);
            weatherHeader.appendChild(describeTemp);
            weatherHeader.appendChild(windStatus);
            temp.textContent = "Temp(F): " + todaysWeather.temp;
            icon.setAttribute("src", iconURL);
            describeTemp.textContent = todaysWeather.description;
            windStatus.textContent = "Wind: " + todaysWeather.wind + " MPH";
            humidity.textContent = "Humidity: " + todaysWeather.humidity + "%";
            console.log(iconURL);
            //generate next 5 days. TODO: FIX THIS
            //TODO: add function here to generate the 5-day forecast
            // for (let i = data.list.length - 1 - 2; i > 0; i -= 8) {
            //   if (data.list === 6) {
            //     break;
            //   } else {
            //     cardContainer.appendChild(weatherCardHeader(data.list[i]));
            //   }
            // }
          }
          // renderCities();
          weatherCardHeader();
        });
    });
}

searchBtn.addEventListener("click", getApi);
