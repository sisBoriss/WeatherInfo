
(async function () {
    // Получаем указатели на нужные элементы
  //  const formEl = document.querySelector("button-59");
    const weatherInfoEl = document.querySelector("#response-info");

    function showWeather(el, weatherInfo) {
        const section = document.createElement('section');
        section.innerHTML = JSON.stringify(weatherInfo, null, 2);
        el.appendChild(section);
    }

    /**
     * Функция должна делать запрос на
     * https://api.openweathermap.org/data/2.5/weather?units=metric&q={{CITY_NAME}}&appid={{APP_ID}}
     * где
     *  {{CITY_NAME}} должен быть заменен на имя города
     *  {{APP_ID}} должен быть заменен на ключ приложения
     * Запрос возвращает данные в формате JSON
     *
     * функция должна возвращать (Promise) данные с информацией о погоде
     * @param {string} cityName
     */
    async function getWeatherUserLocation() {
        let response = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
        //response = response.replaceAll(',', '\n');
        return response;
    }

    async function getWeather(cityName) {
        let token = '63b151efb40928e868a13e6198b120c9';
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${token}`);
        response.json();
        let result;
        for (let key in result) {
            result += `${key}: ${response[key]}\n`;
        }
        return result;
    }
    const getWeatherb = document.getElementById('getWeatherb');
    getWeatherb.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const inputEl = document.querySelector("#userInput");
        const cityName = inputEl.value;
        inputEl.value = "";
        const parentSection = document.querySelector("#history-info");
        const asideDiv = document.createElement('section');
        asideDiv.innerHTML = `${cityName}`;
        parentSection.appendChild(asideDiv);
        const weather = await getWeather(cityName);

        showWeather(weatherInfoEl, weather);
       getWeatherUserLocation();
    });
})();