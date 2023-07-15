const apiKey = "9ba2aa6acb365d4e64e2db58467190a6";
var city;

function fetchWeather(cityName) {
  city = cityName;
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherData) {
      if (weatherData.cod != "200") {
        alert("Error: " + weatherData.message);
        return;
      }

      console.log(weatherData);

      var now = dayjs();

      var todayWeather = weatherData.list[0];
      var conditions = todayWeather.weather[0].main;
      var icon = todayWeather.weather[0].icon;

      $(".text-bg-primary").empty();
      $(".text-bg-primary").append(
        `<div class="card-body">
        <h3 class="card-title">` +
          city +
          ` (` +
          now.format("M/D/YYYY") +
          `)</h3>
        <img src="https://openweathermap.org/img/wn/` +
          icon +
          `@2x.png" alt=` +
          conditions +
          `>
        <p class="card-text">Temp: ` + todayWeather.main.temp + `°F</p>
        <p class="card-text">Wind speed: ` + todayWeather.wind.speed + ` mph</p>
        <p class="card-text">Humidity: ` + todayWeather.main.humidity + `%</p>
      </div>`
      );

      var fiveDayForecast = [];

      fiveDayForecast.push(weatherData.list[8]);
      fiveDayForecast.push(weatherData.list[16]);
      fiveDayForecast.push(weatherData.list[24]);
      fiveDayForecast.push(weatherData.list[32]);
      fiveDayForecast.push(weatherData.list[39]);

      console.log(fiveDayForecast);

      var count = 0;
      $(".text-bg-info").each(function () {
        $(this).empty();
        $(this).append(
          `<div class="card-header">Header</div>
            <div class="card-body">
              <h5 class="card-title">Info card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>`
        );
        count++;
      });
    });
}

$("#search").click(function () {
  fetchWeather($("#city").val());
});

$("#city").on("keydown", function (e) {
  if (e.which == 13) fetchWeather($(this).val());
});
