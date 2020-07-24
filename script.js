var getItem = []

// This click event triggers the needed AJAX requests and creates all the weather info \\
$(".searchBtn").on("click", function () {
    event.preventDefault();

    // clears the page for new info and prevents stacking \\
    $("#resultsCard").empty();

    // captures user inout for AJAX requests \\
    var newCity = $("input").val().trim();
    var cityAPI = (newCity.charAt(0).toUpperCase() + newCity.slice(1))

    // if user leaves form blank, the code won't run \\
    if (!newCity) {
        alert("Please type a city name.")
    }

    else {
        var a = $("<button>")

        a.addClass("list-group-item")

        a.attr("data-search", cityAPI)

        a.text(cityAPI)

        $(".list-group").append(a)

        // sets local storage city names \\ 
        var store = $(this).siblings().val()
        var stored = store.charAt(0).toUpperCase() + store.slice(1)

        console.log(stored)
        getItem = JSON.parse(localStorage.getItem("city")) || []
        console.log(getItem)
        getItem.push(stored)
        localStorage.setItem("city", JSON.stringify(getItem))

        AJAX(newCity);
    }
})

function storage() {

    getItem = JSON.parse(localStorage.getItem("city")) || []

    for (var i = 0; i < getItem.length; i++) {
        var a = $("<button>")

        a.addClass("list-group-item")

        a.attr("data-search", getItem[i])

        a.text(getItem[i])

        $(".list-group").append(a)
    }
    if (getItem.length === 0) {
        AJAX("Atlanta");
    } else {
        var lastSearch = getItem.pop()
        AJAX(lastSearch);
    }
}

storage();

$("ul").on("click", ".list-group-item", function () {
    event.preventDefault();
    var attr = $(this).attr("data-search")
    console.log(attr)
    AJAX(attr);
})

function AJAX(newCity) {

    $("#resultsCard").empty();
    // var newCity = $("input").val().trim();
    var cityAPI = (newCity.charAt(0).toUpperCase() + newCity.slice(1))
    var apiKey = "0659bcfbc663939009bde73b4afdb4fc"

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityAPI + "&appid=" + apiKey

    $.ajax({
        "url": queryURL,
        "method": "GET"
    }).then(function (response) {
        console.log(response)
        // <-------------------------------> \\ 
        var kelvin = (response.main.temp)
        var fahrenheit = (kelvin - 273.15) * 1.80 + 32
        var roundedF = fahrenheit.toFixed(1)
        var tempP = $("<p>")
        tempP.text("Temperature: " + roundedF + " °F")
        // <--------------------------------> \\ 
        var humidity = (response.main.humidity)
        humidity.toString();
        var humidP = $("<p>")
        humidP.text("Humidity: " + humidity + "%")
        // <--------------------------------> \\
        var speed = response.wind.speed
        speed.toString();
        var windP = $("<p>")
        windP.text("Wind Speed: " + speed + " MPH")
        var date = moment().format("L");
        var cityH1 = $("<h3>").text(cityAPI + " (" + date + ")")
        var weatherIcon = $("<img>").addClass("weather-icon")
        var weatherImg = response.weather[0].icon
        weatherIcon.attr("src", "http://openweathermap.org/img/wn/" + weatherImg + ".png")
        cityH1.append(weatherIcon)
        // <---------------------------------> \\

        var lat = response.coord.lat
        var lon = response.coord.lon

        $.ajax({
            "url": "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon,
            "method": "GET"
        }).then(function (UV) {

            var uv = UV[0].value

            var uvP = $("<p>")
            var uvB = $("<button>")
            uvP.text("UV Index: ")
            uvB.text(uv)
            if (uv < 5) {
                uvB.addClass("btn btn-success")
            }
            if (uv > 5) {
                uvB.addClass("btn btn-danger")
            }
            if (uv === 5) {
                uvB.addClass("btn btn-warning")
            }
            $("#resultsCard").append(cityH1, tempP, humidP, windP, uvP)
            $(uvP).append(uvB)
        })

    }).catch(function(error){
        console.log(error)
        $(".col-lg-2").remove();
        alert("Not a valid city.")
    });
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityAPI + "&appid=" + apiKey

    $.ajax({
        "url": forecastURL,
        "method": "GET"
    }).then(function (resp2) {

        $("#break").text("5-Day Forecast:")
        $(".col-lg-2").remove();

        for (var i = 0; i < resp2.list.length; i++) {
            if (resp2.list[i].dt_txt.includes("12:00:00")) {

                var icon = resp2.list[i].weather[0].icon
                var x = resp2.list[i].main.temp
                var temp = ((x - 273.15) * 1.80 + 32).toFixed(2);
                var hum = resp2.list[i].main.humidity

                var div1 = $("<div>").addClass("col-lg-2 card text-white bg-primary mb-3").attr("style", "width: 12rem;").attr("id", "forecast5").css("padding", "10px")
                $("#fiveDay").append(div1)
                var tempP = $("<p>").text("Temp: " + temp + " °F")
                var humiP = $("<p>").text("Humidity: " + hum + "%")
                var weatherIcon2 = $("<img>").addClass("weather-icon").height(50).width(50)
                weatherIcon2.attr("src", "http://openweathermap.org/img/wn/" + icon + ".png")
                var date = (resp2.list[i].dt_txt).slice(0, 10)
                var dateP = $("<h5>").text("(" + date + ")")
                div1.append(dateP, weatherIcon2, tempP, humiP)
            }
        }
    });
}

