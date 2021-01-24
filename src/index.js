let todaysDate = new Date();
let day = document.querySelector(".day");
let date = document.querySelector(".date");

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

day.innerHTML = formatTime(todaysDate);

function formatDate(todaysDate) {
  let currentYear = todaysDate.getFullYear();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Oktober", "November", "December"];
let currentMonth = months[todaysDate.getMonth()];
let currentDate = todaysDate.getDate();

return `${currentDate}. ${currentMonth} ${currentYear}`;
}

date.innerHTML = formatDate(todaysDate);

function displayWeatherCondition(response) {
   document.querySelector("h1").innerHTML = response.data.name;
   document.querySelector(".temperature").innerHTML = `${Math.round(response.data.main.temp)}°C`;
   document.querySelector("#description").innerHTML = response.data.weather[0].description;
   document.querySelector("#current-weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   document.querySelector("#description").setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);
}

function showCurrentLocation(response) {
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}, ${currentCountry}`;
}

function searchCity(event){
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  let apiKey = `806f99d0661b04444ade3ca9ef0a7b55`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
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
}

let currentLocationButton = document.querySelector("current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);





