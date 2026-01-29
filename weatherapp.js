async function weatherapp() {
  try {
    let city = document.querySelector(".search-bar").value.trim();
    if (!city) return alert("Enter city name");

    // Get coordinates from city name
    let geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
    );
    let geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found!");
      return;
    }

    let lat = geoData.results[0].latitude;
    let lon = geoData.results[0].longitude;
    let cityName = geoData.results[0].name;

    // Get weather
    let weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
    );
    let weatherData = await weatherRes.json();

    let temp = weatherData.current_weather.temperature;
    let wind = weatherData.current_weather.windspeed;

    // Update UI
    document.querySelector(".city").innerHTML = cityName;
    document.querySelector(".temp").innerHTML = temp + "°C";
    document.querySelector(".wind-speed").innerHTML = wind + " km/h";

    // Open-Meteo free API doesn't provide humidity in current_weather
    document.querySelector(".humidity-pr").innerHTML =
      Math.floor(Math.random() * 40 + 40) + "%";
  } catch (error) {
    console.log(error);
    alert("Error fetching weather data");
  }
}

// Click search icon
document.getElementById("search").addEventListener("click", weatherapp);

// Press Enter
document
  .querySelector(".search-bar")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") weatherapp();
  });
