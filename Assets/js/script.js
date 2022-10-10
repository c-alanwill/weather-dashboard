var submitButtonEl = document.getElementById('submit-button');
var cityNameEl = document.getElementById('city-name');
var apiKey = "4b611358578a998aad4a1c1beef58dec";
var selectedCityEl = document.getElementById('city-header');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var daysEl = document.getElementById('days');
var favoriteCity = []
var cityButtonEl = document.getElementById('city-button');


/* Chosen City */
function getApi(cityName) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  console.log(requestUrl);
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        if (favoriteCity.includes(data.name) === false){
          favoriteCity.push(data.name)
          localStorage.setItem("favorite-city", JSON.stringify(favoriteCity))
          displayFavoriteCity()
        }
        selectedCityEl.innerHTML = data.name + moment(data.dt, "X").format("(MM/DD/YYYY)") + `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">`
        tempEl.innerHTML = "Temp " + data.main.temp + " &#8457"
        windEl.innerHTML = "Wind " + data.wind.speed + " MPH"
        humidityEl.innerHTML = "Humidity " + data.main.humidity
        getForecast(cityName);
      })
  }    

  /* Buttons */ 
  function displayFavoriteCity (){
    if (localStorage.getItem("favorite-city")){
      favoriteCity = JSON.parse(localStorage.getItem("favorite-city"))
    }
    cityButtonEl.textContent = ""
    for (var i = 0; i < favoriteCity.length; i++){
      var button = document.createElement("button")
      button.classList = "btn btn-secondary btn-md btn-block cityRef" 
      button.textContent = favoriteCity[i]
      cityButtonEl.appendChild(button)
    }
    var cityRefEl = document.querySelectorAll(".cityRef")
    for (var i = 0; i < cityRefEl.length; i++){
      cityRefEl[i].addEventListener("click", function(){
      var cityName = this.textContent
      getApi(cityName) 
      })
    }
  }
  displayFavoriteCity()

/* Five Day Forecast Cards */  
function getForecast (cityName) {
    var requestUrl =  `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
  fetch(requestUrl)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    fiveDayForecast (data)
  })
}
  function fiveDayForecast (forecastData) {
    console.log(forecastData)
    daysEl.textContent = ""
  for (var i = 2; i < forecastData.list.length; i=i+8) {
    var cardEl = document.createElement("div")
    cardEl.setAttribute('class', "blue-card")
    var cardCityEl = document.createElement("h6")
    cardCityEl.setAttribute('class', "blue-card-city")
    cardCityEl.innerHTML = forecastData.city.name
    var cardDateEl = document.createElement("h8")
    cardDateEl.setAttribute('class', "blue-card-date")
    cardDateEl.innerHTML = moment(forecastData.list[i].dt, "X").format("(MM/DD/YYYY)")
    var cardIconEl = document.createElement("div")
    cardIconEl.setAttribute('class', "blue-card-icon")
    cardIconEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${forecastData.list[i].weather[0].icon}@2x.png" alt="">`

    var cardTempEl = document.createElement("h8")
    cardTempEl.setAttribute('class', "blue-card-temp")
    cardTempEl.innerHTML = "\nTemp: " + forecastData.list[i].main.temp + " &#8457"
    var cardWindEl = document.createElement("h8")
    cardWindEl.setAttribute('class', "blue-card-wind")
    cardWindEl.innerHTML = "\nWind: " + forecastData.list[i].wind.speed + " MPH"
    var cardHumidityEl = document.createElement("h8")
    cardHumidityEl.setAttribute('class', "blue-card-humidity")
    cardHumidityEl.innerHTML = "\nHumidity: " + forecastData.list[i].main.humidity

    cardEl.appendChild(cardDateEl)
    cardEl.appendChild(cardIconEl)
    cardEl.appendChild(cardTempEl)
    cardEl.appendChild(cardWindEl)
    cardEl.appendChild(cardHumidityEl)
    daysEl.appendChild(cardEl)
}
}
  
  function displayWeather () {
    getApi (cityNameEl.value);
  }

  submitButtonEl.addEventListener('click', displayWeather);
  






