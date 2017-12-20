function getCity(place) {
    for (var i = 0; i < place.results[0].address_components.length; i++) {
        if (place.results[0].address_components[i].types[0] === "locality") {
        var city = place.results[0].address_components[i].long_name;
        return city;
        }
    }
}

function getState(place) {
    for (var i = 0; i < place.results[0].address_components.length; i++) {
        if (place.results[0].address_components[i].types[0] === "administrative_area_level_1") {
        var state = place.results[0].address_components[i].long_name;
        return state;
        }
    }
}

function getLocation(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    const API_KEY = 'AIzaSyDByZh4-mURU2CPXcD2sabUjSNIzaefa0A';
    var reversegeocodingapi = "https://maps.googleapis.com/maps/api/geocode/json?key=" + API_KEY +"&latlng="+lat+"%2C"+lon;
    $.getJSON(reversegeocodingapi, function(place) {
        const city = getCity(place);
        const state = getState(place);
        $("#location").html(city.toUpperCase() + ", " + state.toUpperCase());
    });
    getWeatherData(lat, lon);
}

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation)
    }



function getWeatherData(latitude, longitude) {
    var weatherapiurl = "https://api.forecast.io/forecast/014dd470e25bffea4a246375af37ba17/"+latitude+","+longitude+"?callback=?"
    var icon = null;
    $.getJSON(weatherapiurl, function(weatherdata) {
        var temp = Math.round(weatherdata.currently.temperature);
        $("#temp").html(temp + "°F");
        icon = weatherdata.currently.icon;

        var WeatherDict = {
            sunny: 'wi-day-sunny',
            rainy: 'wi-day-rain',
            showers: 'wi-day-showers',
            overcast: 'wi-day-sunny-overcast',
            'partly-cloudy-day': 'wi-day-cloudy',
            'cloudy-day': 'wi-day-cloudy',
            windy: 'wi-day-windy',
            hot: 'wi-day-hot',
            clearnight: 'wi-night-clear',
            cloudynight: 'wi-night-alt-cloudy',
            rainynight: 'wi-night-alt-rain',
            cloudygustnight: 'wi-night-alt-cloudy-gusts',
            showersnight: 'wi-night-alt-showers'
        };

        function getCurrentWeather(weatherdata) {
            return weatherdata.currently.icon;
        }
        var currentWeather = getCurrentWeather(weatherdata);  
        console.log(currentWeather);

        var iconClassName = WeatherDict[currentWeather] || WeatherDict['sunny']; 
        

        $("#icon i").addClass(iconClassName); 
        // class name is dynamic
    });

    

}
