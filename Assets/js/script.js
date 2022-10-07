var submitButtonEl = document.getElementById('submit-button');
var cityNameEl = document.getElementById('city-name');
var apiKey = "4b611358578a998aad4a1c1beef58dec";
var selectedCityEl = document.getElementById('city-header');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');

var daysEl = document.getElementById('days');

function getApi(cityName) {
    // fetch request
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  console.log(requestUrl);
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        console.log(data.dt);
        selectedCityEl.innerHTML = data.name + moment(data.dt, "X").format("(MM/DD/YYYY)") + `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">`
        tempEl.innerHTML = "Temp " + data.main.temp + " &#8457"
        windEl.innerHTML = "Wind " + data.wind.speed + " MPH"
        humidityEl.innerHTML = "Humidity " + data.main.humidity
      })
  }    

function getForecast (cityName) {
    var requestUrl =  `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
  fetch(requestUrl)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    // console.log(data)
    fiveDayForecast (data)
  })
}
  function fiveDayForecast (forecastData) {
    console.log(forecastData)
  for (var i = 2; i < forecastData.list.length; i=i+8) {
  //   console.log(forecastData.city.name)
  // console.log ( forecastData.list[i])
    var cardEl = document.createElement("div")
    cardEl.setAttribute('class', "blue-card")
    var cardCityEl = document.createElement("h6")
    cardCityEl.setAttribute('class', "blue-card-city")
    cardCityEl.innerHTML = forecastData.city.name
    var cardTimeEl = document.createElement("h8")
    cardTimeEl.setAttribute('class', "blue-card-time")
    cardTimeEl.innerHTML = forecastData.name + moment(forecastData.list[2].dt_txt, "X").format("(MM/DD/YYYY)")
    console.log(forecastData);
    console.log(forecastData.list[2].dt_txt);
    // `<img src="http://openweathermap.org/img/wn/${forecastData.weather[0].icon}@2x.png" alt="">`
    // forecastData.list[i].dt_txt
    var cardTempEl = document.createElement("h8")
    cardTempEl.setAttribute('class', "blue-card-temp")
    cardTempEl.innerHTML = "Temp: " + forecastData.list[i].main.temp + " &#8457"
    var cardWindEl = document.createElement("h8")
    cardWindEl.setAttribute('class', "blue-card-wind")
    cardWindEl.innerHTML = "Wind: " + forecastData.list[i].wind.speed + " MPH"
    var cardHumidityEl = document.createElement("h8")
    cardHumidityEl.setAttribute('class', "blue-card-humidity")
    cardHumidityEl.innerHTML = "Humidity: " + forecastData.list[i].main.humidity

    cardEl.appendChild(cardCityEl)
    cardEl.appendChild(cardTimeEl)
    cardEl.appendChild(cardTempEl)
    cardEl.appendChild(cardWindEl)
    cardEl.appendChild(cardHumidityEl)
    // continue to create the dom elements for the other data you want to display and append to cardEl
    daysEl.appendChild(cardEl)
    
}
}


        //API FOR 5 DAY FORECAST (2, 10, 18, 26, 34)
        // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
      
  function displayWeather () {
    getApi (cityNameEl.value);
    getForecast(cityNameEl.value);
  }

  submitButtonEl.addEventListener('click', displayWeather);
  


    // Use localStorage to store any persistant data.




        // //Loop over the data to generate a result for each city, each city will have a link to the url
        // for (var i = 0; i < data.length; i++) {
        //   // Creating elements, tablerow, tabledata, and anchor
        //   var tableData = document.createElement('td');
        //   var link = document.createElement('a');
  
        //   // Setting the text of link and the href of the link
        //   link.textContent = data[i].html_url;
        //   link.href = data[i].html_url;
  
        //   // Appending the link to the tabledata and then appending the tabledata to the tablerow
        //   // The tablerow then gets appended to the tablebody
        //   tableData.appendChild(link);
