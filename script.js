var searchBtn = document.getElementById("search");
var APIKey = "7b5f03654b5a109a294b890d0283e4e0";
var cardContainer = document.getElementById("card-container");
var weeklyCardContainer = document.getElementById("weekly-card-container");
var citySearch = document.getElementById("location");
var previousCities = document.getElementById("previous-cities");
var recentCities = [];

renderCities();
//this saves past searches into local storage
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
      listCity.setAttribute("id", "previous-cities");

      //TODO:  add event listerner to buttons to search when clicked. call API
    });
  }
  console.log(pastCities);
}
function getApi() {
  recentCities.push(citySearch.value);
  localStorage.setItem("pastCities", JSON.stringify(recentCities));
  //api call to get the latitude and longitude based on the city name.
  var requestLatLon = `https://api.openweathermap.org/geo/1.0/direct?q=${citySearch.value}&limit=5&appid=${APIKey}`;

  fetch(requestLatLon)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      //api call to push the retrieved lat/lon to retrieve weather information
      var requestWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
      fetch(requestWeather)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var todaysWeather = {
            name: data.city.name,
            date: dayjs().format("YYYY-MM-DD"),
            temp: data.list[0].main.temp,
            icon: data.list[0].weather[0].icon,
            humidity: data.list[0].main.humidity,
            description: data.list[0].weather[0].description,
            wind: data.list[0].wind.speed,
          };
          console.log(todaysWeather.date);

          function weatherCardHeader() {
            cardContainer.innerHTML = "";
            weeklyCardContainer.innerHTML = "";
            citySearch.value = "";
            var weatherHeader = document.createElement("h2");
            var weatherName = document.createElement("h1");
            var temp = document.createElement("h3");
            var describeTemp = document.createElement("h3");
            var windStatus = document.createElement("h3");
            var humidity = document.createElement("h3");
            var icon = document.createElement("img");
            var iconCode = todaysWeather.icon;
            var iconURL =
              "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            weatherName.textContent = todaysWeather.name;
            weatherHeader.textContent = "Date: " + todaysWeather.date;
            weatherHeader.setAttribute("class", "border border-dark");
            cardContainer.appendChild(weatherName);
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

            cardContainer.appendChild(weeklyCardContainer);
            weeklyCardContainer.setAttribute(
              "class",
              "row justify-content-center"
            );

            //display multiple cards
            for (let i = 0; i < 40; i++) {
              if (data.list[i].dt_txt.includes("12:00:00")) {
                console.log(data.list[i].dt_txt.includes("12:00:00"));
                var weeksWeather = {
                  name: data.city.name,
                  date: data.list[i].dt_txt.substr(0, 10),
                  temp: data.list[i].main.temp,
                  icon: data.list[i].weather[0].icon,
                  humidity: data.list[i].main.humidity,
                  description: data.list[i].weather[0].description,
                  wind: data.list[i].wind.speed,
                };
                var weeklyContainer = document.createElement("div");
                var weeklyHeader = document.createElement("h2");
                var weeklyTemp = document.createElement("h3");
                var weeklyDescribeTemp = document.createElement("h3");
                var weeklyWindStatus = document.createElement("h3");
                var weeklyHumidity = document.createElement("h3");
                var weeklyIcon = document.createElement("img");
                var weeklyIconCode = weeksWeather.icon;
                var weeklyIconURL =
                  "http://openweathermap.org/img/wn/" +
                  weeklyIconCode +
                  "@2x.png";
                weeklyContainer.setAttribute("class", "col-2");
                weeklyHeader.textContent = "Date: " + weeksWeather.date;
                console.log(weeksWeather);
                weeklyHeader.setAttribute(
                  "class",
                  "border border-dark text-light bg-dark"
                );
                weeklyTemp.textContent = "Temp(F): " + weeksWeather.temp;
                weeklyIcon.setAttribute("src", weeklyIconURL);
                weeklyDescribeTemp.textContent = weeksWeather.description;
                weeklyWindStatus.textContent =
                  "Wind: " + weeksWeather.wind + " MPH";
                weeklyHumidity.textContent =
                  "Humidity: " + weeksWeather.humidity + "%";
                weeklyCardContainer.appendChild(weeklyContainer);
                weeklyContainer.appendChild(weeklyHeader);
                weeklyHeader.appendChild(weeklyIcon);
                weeklyHeader.appendChild(weeklyTemp);
                weeklyHeader.appendChild(weeklyHumidity);
                weeklyHeader.appendChild(weeklyDescribeTemp);
                weeklyHeader.appendChild(weeklyWindStatus);
              }
            }
          }
          renderCities();
          weatherCardHeader();
        });
    });
}

searchBtn.addEventListener("click", getApi);
//TODO: fix this so that the selected item is put in the search bar.
previousCities.addEventListener("click", function () {
  citySearch.value = previousCities.this.textContent;
  getApi();
});
