function empty() {
    $(".weather").empty()
}





$(".list-group-item").on("click", function () {

    var x = $(this).data("search")

    console.log(x)

    var apiKey = "0659bcfbc663939009bde73b4afdb4fc"

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + x + "&appid=" + apiKey

    $.ajax({
        "url": queryURL,
        "method": "GET"
    }).then(function (response) {

        // <-------------------------------> \\ 
        var kelvin = (response.main.temp)
        var fahrenheit = (kelvin - 273.15) * 1.80 + 32
        // roundedF is a string !!! \\ 
        var roundedF = fahrenheit.toFixed(2)
        console.log("Temperature: " + roundedF)
        // <--------------------------------> \\ 
        // humidity response is a number \\
        var humidity = (response.main.humidity)
        // turn response into string \\
        var humidString = humidity.toString();
        console.log("Humidity: " + humidString + "%")
        // <--------------------------------> \\
        var speed = response.wind.speed
        var windSpeed = speed.toString();
        console.log("Wind Speed: " + windSpeed + " MPH")
        // <---------------------------------> \\
        // console.log(response)

    });
})


$(".searchBtn").on("click", function () {

    $("#resultsCard").empty();
    // $(".row").empty();
    // $("h3").empty();

    var newCity = $("input").val().trim();
    var cityAPI = (newCity.charAt(0).toUpperCase() + newCity.slice(1))


    if (!newCity) {
        alert("Please type city name.")
    }

    else {
        var a = $("<button>")

        a.addClass("list-group-item")

        a.attr("data-search", cityAPI)

        a.text(cityAPI)

        $(".list-group").append(a)


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
            // roundedF is a string !!! \\ 
            var roundedF = fahrenheit.toFixed(1)
            var tempP = $("<p>")
            tempP.text("Temperature: " + roundedF + " °F")
            // <--------------------------------> \\ 
            // humidity response is a number \\
            var humidity = (response.main.humidity)
            // turn response into string \\
            humidity.toString();
            var humidP = $("<p>")
            humidP.text("Humidity: " + humidity + "%")
            // <--------------------------------> \\
            var speed = response.wind.speed
            speed.toString();
            var windP = $("<p>")
            windP.text("Wind Speed: " + speed + " MPH")
            var date = moment().format("L");
            var cityH1 = $("<h2>").text(cityAPI + " (" + date + ")")
            // <---------------------------------> \\

            var lat = response.coord.lat
            var lon = response.coord.lon

            $.ajax({
                "url" : "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon ,
                "method" : "GET"
            }).then(function(UV){

                var uv = UV[0].value
                console.log(uv)

                var uvP = $("<p>")
                uvP.text("UV Index: " + uv)
                if (uv < 5){
                    console.log("less than five")
                    uvP.addClass("green")
                }
                if (uv > 5) {
                    console.log("greater than 5")
                    uvP.addClass("red")
                }
                if (uv === 5) {
                    console.log("is 5")
                    uvP.addClass("yellow")
                }
                $("#resultsCard").append(cityH1, tempP, humidP, windP, uvP)

            })

        });
        var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityAPI + "&appid=" + apiKey

        $.ajax({
            "url": forecastURL,
            "method": "GET"
        }).then(function (resp2) {

            // console.log(resp2)

            // var day1 = ;   
            // console.log(day1)
            var x = resp2.list[0].main.temp
            dayOneT = ((x - 273.15) * 1.80 + 32).toFixed(2);
            var dayOneH = resp2.list[0].main.humidity
            var oneT = $("<p>").text("Temp: " + dayOneT + " °F")
            var oneH = $("<p>").text("Humidity: " + dayOneH + "%")
            $("#day1").append(oneT, oneH)

            var y = resp2.list[8].main.temp
            dayTwoT = ((y - 273.15) * 1.80 + 32).toFixed(2);
            var dayTwoH = resp2.list[8].main.humidity
            var twoT = $("<p>").text("Temp: " + dayTwoT + " °F")
            var twoH = $("<p>").text("Humidity: " + dayTwoH + "%")
            $("#day2").append(twoT, twoH)

            var z = resp2.list[16].main.temp
            dayThreeT = ((z - 273.15) * 1.80 + 32).toFixed(2);
            var dayThreeH = resp2.list[16].main.humidity
            var threeT = $("<p>").text("Temp: " + dayThreeT + " °F")
            var threeH = $("<p>").text("Humidity: " + dayThreeH + "%")
            $("#day3").append(threeT, threeH)

            moment().add(1, 'days').calendar();
            var t = resp2.list[24].main.temp
            dayFourT = ((t - 273.15) * 1.80 + 32).toFixed(2);
            var dayFourH = resp2.list[24].main.humidity
            var fourT = $("<p>").text("Temp: " + dayFourT + " °F")
            var fourH = $("<p>").text("Humidity: " + dayFourH + "%")
            $("#day4").append(fourT, fourH)

            var r = resp2.list[32].main.temp
            dayFiveT = ((r - 273.15) * 1.80 + 32).toFixed(2);
            var dayFiveH = resp2.list[32].main.humidity
            var fiveT = $("<p>").text("Temp: " + dayFiveT + " °F")
            var fiveH = $("<p>").text("Humidity: " + dayFiveH + "%")
            $("#day5").append(fiveT, fiveH)


        });

    }
})

