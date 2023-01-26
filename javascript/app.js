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

function displayTemperature(response) {
  console.log(response);
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;

  let temperature = document.querySelector("#temperature");
  let roundedTemperature = Math.round(response.data.temperature.current);
  temperature.innerHTML = `${roundedTemperature}`;

  document.querySelector("#humidity").innerHTML =
    response.response.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.condition.description;

  document
    .querySelector("#icon")
    .iconElement.setAttribute("src", response.data.condition.icon_url);
}

function search(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#search-input");
  let cityNameApiUrl = `https://api.shecodes.io/weather/v1/current?query=london&key=a34fc055166b4t2af2aa49acfo60673a&units=metric`;
  axios.get(`${cityNameApiUrl}`).then(displayTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

//To use when appropriate lesson has been taught

// function convertToCelsius(event) {
//   event.preventDefault();

//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = 19;
// }

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// let celsiusLink = document.querySelector("#celsius-link");

// celsiusLink.addEventListener("click", convertToCelsius);
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

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

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showWeatherForCurrentLocation);

formatDayAndTime();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
