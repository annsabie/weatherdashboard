var searchButton = $(".searchButton");

var apiKey = "1b2adfc5e6c0c8bf7e0f04f586da6de6";

for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}

var keyCount = 0;

searchButton.click(function () {

    var citySearch = $(".citySearch").val();

    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&Appid=" + apiKey + "&units=imperial";
  
    if (citySearch == "") {
        alert("Please enter a valid city");
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {

            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");

            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            var currentWeather = $(".currentWeather").append("<div>").addClass("card-body");
            
            var currentCity = currentWeather.append("<h5>");
            currentWeather.append(currentCity);

            var timeUTC = new Date(response.dt * 1000);
            currentCity.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentCity.append("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
           
            var currentTemp = currentCity.append("<p>");
            currentCity.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");


            var uvAPI = "0f2b4b1ea92cc74ae9d1aa0afb8e31d8";

            var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + uvAPI;

            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function (response) {
                var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
            });

        });

        var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&Appid=" + apiKey + "&units=imperial";

        $.ajax({
            url: fiveDayUrl,
            method: "GET"
        })
        .then(function (response) {
            var day = [0, 8, 16, 24, 32];
            var forecast = $(".forecast").addClass("card-body");
            var fiveDay = $(".fiveDay").addClass("card-text");
            fiveDay.empty();
            day.forEach(function (i) {
              var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
              FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");
              fiveDay.append("<div class=fiveDayInfo>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
            })
          });
        }
  });