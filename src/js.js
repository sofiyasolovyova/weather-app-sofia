function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

//Bonus Feature
//function changettoCelsius(event) {
//event.preventDefault();
//let currentTemp = document.querySelector("#temperature");
// currentTemp.innerHTML = 25;
//}
//function changeToFarenheit(event) {
// event.preventDefault();
// let currentTemp = document.querySelector("#temperature");
// currentTemp.innerHTML = 66;}

//let linkCelsius = document.querySelector("#celsius-link");
//linkCelsius.addEventListener("click", changettoCelsius);

//let linkFahr = document.querySelector("#fahrenheit-link");
//linkFahr.addEventListener("click", changeToFarenheit);

//TASK (WEEK 5)
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "c0e1664cd4a35a63bbb4e1abdde3d06b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getPosition(position) {
  let apiKey = "c0e1664cd4a35a63bbb4e1abdde3d06b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#city-now");
searchForm.addEventListener("submit", showCity);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
