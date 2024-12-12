let search = document.querySelector(".search");
let search_input = document.querySelector("input");
let search_button = document.querySelector(".search i");
let weather_section = document.querySelector(".weather");
let not_found_message = document.querySelector(".not-found_message");
let city = document.querySelector(".city");
let day = document.querySelector(".day");
let month = document.querySelector(".month");
let weather_img = document.querySelector(".statue img");
let temperature_degree = document.querySelector(".temperature_degree");
let weather_name = document.querySelector(".weather_name");
let humidity = document.querySelector(".humidity .value");
let wind_speed = document.querySelector(".wind_speed .value");
let forecast_box = document.querySelectorAll(".forecast li");
let forecast_date = document.querySelectorAll(".forecast li .date");
let forecast_img = document.querySelectorAll(".forecast li img");
let forecast_tempMax = document.querySelectorAll(".forecast li .temperatureMax");
let forecast_tempMin = document.querySelectorAll(".forecast li .temperatureMin");

search_input.addEventListener(
  "focus",
  () => (search.style.borderColor = "#eee")
);

search_input.addEventListener(
  "blur",
  () => (search.style.borderColor = "transparent")
);

search_input.addEventListener("keydown", (Event) => {
  if (Event.key == "Enter" && search_input.value.trim() !== "") {
    update_data(search_input.value.trim());
    search_input.value = "";
    search_input.blur();
  }
});

search_button.addEventListener("click", () => {
  if (search_input.value.trim() !== "") {
    update_data(search_input.value.trim());
    search_input.value = "";
    search_input.blur();
  }
});

function display_message(message) {
  message.style.display = "flex";
}

async function update_data(location) {
  let t = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${location}&days=3`
  );
  if (t.ok && 400 != t.status) {
    let a = await t.json();
    let date = new Date(new Date(a.current.last_updated.replace(" ", "T"))); 
    day.innerHTML = date.toLocaleDateString("default", {
      weekday: "long",
    });
    month.innerHTML = `, ${date.getDate()} ${date.toLocaleDateString(
      "default",
      {
        month: "short",
      }
    )}`;
    city.innerHTML = a.location.name;
    console.log();
    
    weather_img.src = a.current.condition.icon;
    temperature_degree.innerHTML = `${a.current.temp_c} °C`;
    weather_name.innerHTML = a.current.condition.text;
    humidity.innerHTML = `${a.current.humidity}%`;

    a.forecast.forecastday.forEach((list, index) => {
      if (index != 0) {
        date = new Date(
          new Date(list.date.replace(" ", "T"))
        ).toLocaleDateString("default", {
          weekday: "long",
        });
        forecast_date[index - 1].innerHTML = date
          .split(" ")
          .reverse()
          .join(" ");
        forecast_img[index - 1].src = list.day.condition.icon;
        forecast_tempMax[index - 1].innerHTML = `${list.day.maxtemp_c} °C`;
        forecast_tempMin[index - 1].innerHTML = `${list.day.mintemp_c} °C`;
      }
    });
  }
  display_message(weather_section);
}

update_data("cairo");
