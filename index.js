let nowDate = new Date();
let nowTime = document.querySelector("#currentTime");
let nowHour = nowDate.getHours();
if (nowHour < 10) {
  nowHour = `0${nowHour}`;
}
let nowMinutes = nowDate.getMinutes();
if (nowMinutes < 10) {
  nowMinutes = "0" + nowMinutes;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[nowDate.getDay()];
nowTime.innerHTML = day + ", " + nowHour + ":" + nowMinutes;

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = ` <div class="row"> `;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                  <div class="weather-forecast-date">${forecastDay.time}</div>
                   <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" />
                  <div class="forecast-temperature">
                    <span class="forecast-temperature-max">${forecastDay.temperature.maximum}° /</span>
                    <span class="forecast-temperature-min">${forecastDay.temperature.minimum}°</span>
                  </div>
              </div>
             `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5c3b44fd3211f47fodb530a25ba78e2t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showTempWeather(response) {
  console.log(response.data);
  document.querySelector("#locationId").innerHTML = response.data.city;
  celTemp = response.data.temperature.current;
  document.querySelector("#temperatureMatt").innerHTML = Math.round(celTemp);
  document.querySelector("#air").innerHTML =
    response.data.condition.description;
  document.querySelector("#tears").innerHTML =
    "Dragon tears: " + response.data.temperature.humidity + "%";
  document.querySelector("#fairy").innerHTML =
    "Fairy wind: " + Math.round(response.data.wind.speed) + "km/h";
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForecast(response.data.coordinates);
}

function cityNewSearch(city) {
  let apiKey = "5c3b44fd3211f47fodb530a25ba78e2t";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTempWeather);
}
function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searching").value;
  cityNewSearch(city);
}
let searchCitySubmit = document.querySelector("form");
searchCitySubmit.addEventListener("submit", citySubmit);

function lookCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5c3b44fd3211f47fodb530a25ba78e2t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(showTempWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(lookCurrentLocation);
}
let currentLocationButton = document.querySelector("#location-search");
currentLocationButton.addEventListener("click", getCurrentLocation);
function displayF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureMatt");
  let tempF = (celTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(tempF);
  linkC.classList.remove("active");
  linkF.classList.add("active");
}
let celTemp = null;
let linkF = document.querySelector("#degreeF");
linkF.addEventListener("click", displayF);
function displayC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureMatt");
  temperatureElement.innerHTML = Math.round(celTemp);
  linkF.classList.remove("active");
  linkC.classList.add("active");
}
let linkC = document.querySelector("#degreeC");
linkC.addEventListener("click", displayC);
