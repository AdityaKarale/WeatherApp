let weather = {
  apiKey: "f2b57c51056680bf4703ae6ab8ba08f4",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q="+city+
      "&appid="+
      this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })

     .then((data) => this.displayWeather(data));
      
  },
  displayWeather: function (data) {
    console.log(data);
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { sunrise } = data.sys;
    const { sunset } = data.sys;
    var celcius = temp-273.15;
    var n = celcius.toFixed(2);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = n + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";      
      let unix = sunrise;
      let usun = sunset;
      let sr = new Date(unix*1000);
      let sn = new Date(usun*1000);
      var n = sr.getHours();
      var h = sr.getMinutes();
      var o = sn.getHours();
      o=o-12; //to convert 12 hours format for sunset.
      var p = sn.getMinutes();
      document.querySelector(".sunrise").innerText ="Sunrise: " + n+":"+h+ " AM";
      document.querySelector(".sunset").innerText ="Sunset: " + o+":"+p+ " PM";    
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + description + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Pune");

