let apiKey = "a34fc055166b4t2af2aa49acfo60673a";

function formatDayAndTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();

  function addZero(minutes) {
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes;
  }

  let time = `${hour}:${addZero(minutes)}`;

  let currentDayAndTime = document.querySelector(".dayAndTime");
  currentDayAndTime.innerHTML = `${day} ${time}`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response);
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;

  celsiusTemperature = response.data.temperature.current;

  let temperature = document.querySelector("#temperature");
  let roundedTemperature = Math.round(celsiusTemperature);
  temperature.innerHTML = `${roundedTemperature}`;

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  let iconElement = document.querySelector("#icon");
  iconElement = iconElement.setAttribute(
    "src",
    response.data.condition.icon_url
  );

  getForecast(response.data.coordinates);
}

function search(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#search-input").value;
  let cityNameApiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
  console.log(cityInput);
  axios.get(`${cityNameApiUrl}`).then(displayTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function convertToCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let currentLocationApiUrl = `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;
  axios.get(`${currentLocationApiUrl}`).then(displayTemperature);
}

function showWeatherForCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 weather-forecast-day">
      ${day}
      <div class="forecast-icon">
        <img
          class=""
          src="https://assets.msn.com/weathermapdata/1/static/svg/72/v6/card/CloudyV3.svg"
          alt="forecast-icon"
          width="30"
        />
      </div>
      <div class="forecast-temperatures">
        <span class="forecast-temp-max">18°</span>
        <span class="forecast-temp-min">12°</span>
      </div>
    </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
let celsiusTemperature = null;

celsiusLink.addEventListener("click", convertToCelsius);
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showWeatherForCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

formatDayAndTime();
navigator.geolocation.getCurrentPosition(retrievePosition);
displayForecast();
