/*
TODO: Display days 2-5
TODO: Retain search as selectable button
TODO: remove text from search upon click
*/

var searchBtn = document.querySelector(".btn");
var APIKey = "7b5f03654b5a109a294b890d0283e4e0";
var cardContainer = document.getElementById("card-container");
var citySearch = document.getElementById("location");
var previousCities = document.getElementById("previous-cities");
var recentCities = [];

renderCities();
//retain previous searches as buttons
//TODO: push pastCities into the recentCities array.
//TODO: render all recentCities into buttons.
// TODO: all generated buttons need to have the "past" class
function renderCities() {
  recentCities = [];
  previousCities.innerHTML = "";
  var pastCities = JSON.parse(localStorage.getItem("pastCities"));
  if (pastCities) {
    recentCities.push(...pastCities);
  }
  if (recentCities.length) {
    recentCities.forEach((e) => {
      var listCity = document.createElement("button");
      previousCities.appendChild(listCity);
      listCity.textContent = e;
      listCity.setAttribute("class", "past btn btn-secondary w-100 mb-1");
    });
  }
  console.log(pastCities);
  // renderCities.on("click", function () {
  //   getElementById("location").value = pastCities;
  // });
}
//TODO: this is a function to select the past cities
// function pastCitySelect() {
//   document.querySelectorAll("past").addEventListener("click", function () {
//     document.getElementById("location").value = this;
//     getApi();
//   });
// }

function getApi() {
  recentCities.push(citySearch.value);
  // console.log(recentCities);
  localStorage.setItem("pastCities", JSON.stringify(recentCities));
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
      // console.log(lat);
      // console.log(lon);
      //api call to push the retrieved lat/lon to retrieve weather information
      var requestWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
      fetch(requestWeather)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          // console.log(data.list[0].main.temp);
          var todaysWeather = {
            name: data.city.name,
            date: dayjs().format(`MM/D/YY`),
            temp: data.list[0].main.temp,
            icon: data.list[0].weather[0].icon,
            humidity: data.list[0].main.humidity,
            description: data.list[0].weather[0].description,
            wind: data.list[0].wind.speed,
          };
          // console.log(todaysWeather);

          function weatherCardHeader() {
            cardContainer.innerHTML = "";
            var weatherHeader = document.createElement("h2");
            var weatherName = document.createElement("h1");
            var temp = document.createElement("h3");
            var describeTemp = document.createElement("h3");
            var windStatus = document.createElement("h3");
            var humidity = document.createElement("h3");
            var icon = document.createElement("span");
            var iconCode = todaysWeather.icon;
            var iconURL =
              "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            weatherName.textContent = todaysWeather.name;
            weatherHeader.textContent = "Date: " + todaysWeather.date;
            weatherHeader.setAttribute("class", "border border-dark");
            cardContainer.appendChild(weatherName);
            console.log(weatherName);
            cardContainer.appendChild(weatherHeader);
            weatherHeader.appendChild(icon);
            weatherHeader.appendChild(temp);
            weatherHeader.appendChild(humidity);
            weatherHeader.appendChild(describeTemp);
            weatherHeader.appendChild(windStatus);
            temp.textContent = "Temp(F): " + todaysWeather.temp;
            icon.setAttribute("src", iconURL);
            describeTemp.textContent = todaysWeather.description;
            windStatus.textContent = "Wind: " + todaysWeather.wind + " MPH";
            humidity.textContent = "Humidity: " + todaysWeather.humidity + "%";
            // console.log(iconURL);
            // console.log(data);
            //generate next 5 days. TODO: FIX THIS
            //TODO: add function here to generate the 5-day forecast
            for (let i = 0; i < 12; i = i + 6) {
              console.log(i);
              const theirDate = data.list[i].dt;
              console.log(theirDate);
              const ourDate = new Date(theirDate);
              console.log(ourDate);
              console.log(ourDate.getDay());
            }
          }
          renderCities();
          weatherCardHeader();
        });
    });
}

searchBtn.addEventListener("click", getApi);
