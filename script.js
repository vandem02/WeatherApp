const apiKey = "9ba2aa6acb365d4e64e2db58467190a6";

setInterval(function () {
  if ($("#city").val()) $("#search").removeAttr("disabled");
  else $("#search").attr("disabled", true);
}, 1);

for (let i = localStorage.length - 1; i >= 0; i--) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  addToHistory(value);
}

function fetchWeather(cityName) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherData) {
      if (weatherData.cod != "200") {
        alert("Error: " + weatherData.message);
        return;
      }

      $("#city").val("");

      $("#empty-panel").hide();
      $("#weather-panel").show();

      localStorage.setItem(cityName, cityName);
      addToHistory(cityName);

      var now = dayjs();

      var todayWeather = weatherData.list[0];
      var conditions = todayWeather.weather[0].main;
      var icon = todayWeather.weather[0].icon;

      $(".text-bg-primary").empty();
      $(".text-bg-primary").append(
        `<div class="card-body">
          <h3 class="card-title">` +
          cityName +
          ` (` +
          now.format("M/D/YYYY") +
          `)</h3>
          <img src="https://openweathermap.org/img/wn/` +
          icon +
          `@2x.png" alt=` +
          conditions +
          `>
          <p><b>` +
          conditions +
          `</b></p>
          <p class="card-text">Temp: ` +
          todayWeather.main.temp +
          `°F</p>
          <p class="card-text">Wind speed: ` +
          todayWeather.wind.speed +
          ` mph</p>
          <p class="card-text">Humidity: ` +
          todayWeather.main.humidity +
          `%</p>
        </div>`
      );

      var fiveDayForecast = [];

      fiveDayForecast.push(weatherData.list[8]);
      fiveDayForecast.push(weatherData.list[16]);
      fiveDayForecast.push(weatherData.list[24]);
      fiveDayForecast.push(weatherData.list[32]);
      fiveDayForecast.push(weatherData.list[39]);

      var count = 0;
      $(".text-bg-info").each(function () {
        todayWeather = fiveDayForecast[count];
        conditions = todayWeather.weather[0].main;
        icon = todayWeather.weather[0].icon;

        now = now.add(1, "day");
        $(this).empty();
        $(this).append(
          `<div class="card-body">
            <h5 class="card-title">` +
            now.format("M/D/YYYY") +
            `</h5>
            <img src="https://openweathermap.org/img/wn/` +
            icon +
            `@2x.png" alt=` +
            conditions +
            `>
            <p><b>` +
            conditions +
            `</b></p>
            <p class="card-text">Temp: ` +
            todayWeather.main.temp +
            `°F</p>
            <p class="card-text">Wind speed: ` +
            todayWeather.wind.speed +
            ` mph</p>
            <p class="card-text">Humidity: ` +
            todayWeather.main.humidity +
            `%</p>
          </div>`
        );
        count++;
      });
    });
}

function addToHistory(cityName) {
  $("#" + cityName).remove()
  var $button = $('<button id="' + cityName + '" type="button" class="btn btn-secondary">' + cityName + "</button>");
  $button.click(function () {
    fetchWeather(cityName);
  });
  $("#recents").after($button);
}

$("#search").click(function () {
  fetchWeather($("#city").val());
});

$("#city").on("keydown", function (e) {
  if (e.which == 13 && $(this).val()) fetchWeather($(this).val());
});
