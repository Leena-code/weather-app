let currentDate = new Date();

function formatTime(dayTime){
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = days[dayTime.getDay()];
let currentHour = dayTime.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`
}
let currentMinutes = dayTime.getMinutes();
if (currentMinutes < 10){
  currentMinutes = `0${currentMinutes}`
}

return `${currentDay},  ${currentHour}:${currentMinutes}`;

}

document.querySelector(".day").innerHTML = formatTime(currentDate);

function formatDate(todaysDate) {
  let currentYear = todaysDate.getFullYear();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Oktober", "November", "December"];
  let currentMonth = months[todaysDate.getMonth()];
  let currentDate = todaysDate.getDate();
  
  return `${currentDate}. ${currentMonth} ${currentYear}`;
}

document.querySelector(".date").innerHTML = formatDate(currentDate);

function formatDays(timestamp){
  let currentDate = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDay = days[currentDate.getDay()];

  
  return `${currentDay}`;
}

function formatDates(timestamp){
  let currentDate = new Date(timestamp);
let currentYear = currentDate.getFullYear();
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
  let currentMonth = months[currentDate.getMonth()];
  let date = currentDate.getDate();
  
  return `${date}. ${currentMonth} ${currentYear}`;
}

function formatHours(timestamp){
let currentDate = new Date(timestamp);
let currentHour = currentDate.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`
}
let currentMinutes = currentDate.getMinutes();
if (currentMinutes < 10){
  currentMinutes = `0${currentMinutes}`
}

return `${currentHour}:${currentMinutes}`;

}

function displayWeatherCondition(response) {
   document.querySelector("h1").innerHTML = response.data.name;
   document.querySelector(".temperature").innerHTML = `${Math.round(response.data.main.temp)}°`;
   document.querySelector("#description").innerHTML = response.data.weather[0].description;
   document.querySelector("#current-weather-icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   document.querySelector("#description").setAttribute("alt", `https://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);
}

function showCurrentLocation(response) {
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity} ${currentCountry}`;
}

function displayHourForecast(response){
  let hourForecast = document.querySelector("#hour-forecasts");
  hourForecast.innerHTML = null;
  let forecast = null;
  for(let index = 0; index < 6; index++){
    forecast = response.data.list[index];
    hourForecast.innerHTML += `
    <div class="col-2">
      <ul>
       <li>
        <strong>
         ${formatHours(forecast.dt * 1000)}
        </strong>
       </li>
       <li>
         <img
          src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
          alt="" class="hour-forecast-icon">
        </li>
        <li>
         <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
        </li>
      </ul>
    </div>
              `;
  }
}

function displayDailyForecast(response){
  let dailyForecast = document.querySelector("#daily-forecasts");
  dailyForecast.innerHTML = null;
  let forecast = null;
  forecast = response.data.list[7];
    dailyForecast.innerHTML = `
    <div class="col-3 day-1">
      <ul>
        <li>
          <strong>
            ${formatDays(forecast.dt * 1000)}
          </strong>
        </li>
        <li>
        ${formatDates(forecast.dt * 1000)}
        </li>
        <li>
         <img
            src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
            alt="" class="daily-forecast-icon">
        </li>
        <li>
          <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
        </li>
    </div>
  `;
  forecast = response.data.list[15];
    dailyForecast.innerHTML += `
    <div class="col-3 day-2">
      <ul>
        <li>
          <strong>
            ${formatDays(forecast.dt * 1000)}
          </strong>
        </li>
        <li>
        ${formatDates(forecast.dt * 1000)}
        </li>
        <li>
         <img
            src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
            alt="" class="daily-forecast-icon">
        </li>
        <li>
          <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
        </li>
    </div>
  `;
  forecast = response.data.list[23];
    dailyForecast.innerHTML += `
    <div class="col-3 day-1">
      <ul>
        <li>
          <strong>
            ${formatDays(forecast.dt * 1000)}
          </strong>
        </li>
        <li>
        ${formatDates(forecast.dt * 1000)}
        </li>
        <li>
         <img
            src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
            alt="" class="daily-forecast-icon">
        </li>
        <li>
          <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
        </li>
    </div>
  `;
  forecast = response.data.list[31];
    dailyForecast.innerHTML += `
    <div class="col-3 day-3">
      <ul>
        <li>
          <strong>
            ${formatDays(forecast.dt * 1000)}
          </strong>
        </li>
        <li>
        ${formatDates(forecast.dt * 1000)}
        </li>
        <li>
         <img
            src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
            alt="" class="daily-forecast-icon">
        </li>
        <li>
          <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
        </li>
    </div>
  `;
}

function searchCity(event){
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  let apiKey = `806f99d0661b04444ade3ca9ef0a7b55`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayHourForecast);
  axios.get(apiUrl).then(displayDailyForecast);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `806f99d0661b04444ade3ca9ef0a7b55`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndpoint}?&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  axios.get(apiUrl).then(showCurrentLocation);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayHourForecast);
  axios.get(apiUrl).then(displayDailyForecast);
}

let currentLocationButton = document.querySelector("current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
