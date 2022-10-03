var submitButtonEl = document.getElementById('submit-button');
var cityNameEl = document.getElementById('city-name');
// var fetchButton = document.getElementById('los-angeles-button');
// var fetchButton = document.getElementById('chicago-button');
// var fetchButton = document.getElementById('atlanta-button');
// var fetchButton = document.getElementById('new-york-button');s
// var fetchButton = document.getElementById('seattle-button');
// var fetchButton = document.getElementById('denver-button');
// var fetchButton = document.getElementById('dallas-button');
// var fetchButton = document.getElementById('san-francisco-button');
// var fetchButton = document.getElementById('london-button');
var apiKey = "4b611358578a998aad4a1c1beef58dec";
var selectedCityEl = document.getElementById('city-header');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');

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
        selectedCityEl.innerHTML = data.name + moment(data.dt, "X").format("(MM/DD/YYYY)") + `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">`
        tempEl.innerHTML = "Temp " + data.main.temp

        //Loop over the data to generate a result for each city, each city will have a link to the url
        for (var i = 0; i < data.length; i++) {
          // Creating elements, tablerow, tabledata, and anchor
          var tableData = document.createElement('td');
          var link = document.createElement('a');
  
          // Setting the text of link and the href of the link
          link.textContent = data[i].html_url;
          link.href = data[i].html_url;
  
          // Appending the link to the tabledata and then appending the tabledata to the tablerow
          // The tablerow then gets appended to the tablebody
          tableData.appendChild(link);
        }
      });
  }
  function displayWeather () {
    getApi (cityNameEl.value);
  }


  submitButtonEl.addEventListener('click', displayWeather);


    // Use localStorage to store any persistant data.