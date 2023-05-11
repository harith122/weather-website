let weather = {
    apikey : "0f60ff823435522f8e15a94f7eaed86d",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + " &units=metric&appid=" 
            + this.apikey
        )
          .then((Response) => Response.json())
          .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
         const { name } = data;
         const { icon, description } = data.weather[0];
         const { temp, humidity } = data.main;
         const { speed } = data.wind;
         document.querySelector(".city").innerText = "Weather in " + name;
         document.querySelector(".icon").src = "http://openweathermap.org/img/wn/"+  icon  +".png";
         document.querySelector(".description").innerText = description;
         document.querySelector(".temp").innerText = temp + "°C";
         document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
         document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
         document.querySelector(".weather").classList.remove("loading");
         document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    getLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetch(
                    "https://api.openweathermap.org/data/2.5/weather?lat=" 
                    + latitude
                    + "&lon="
                    + longitude
                    + "&units=metric&appid=" 
                    + this.apikey
                )
                .then((Response) => Response.json())
                .then((data) => this.displayWeather(data));
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search(); 
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter"){
        weather.search();
    }
});

weather.getLocation();  // Call the function to get the user's location by default
