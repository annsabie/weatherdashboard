var searchBtn = document.querySelector("#searchbutton")

var APIKey = "1b2adfc5e6c0c8bf7e0f04f586da6de6"

var city = "";

var queryURL = "api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}" + city + "&appid=" + APIKey;

var responseText = document.getElementById('response-text');

searchBtn.addEventListener("click", getApi);




function getApi (queryURL) {
    fetch(queryURL)
        .then(function (response) {
    console.log(response);
});
};