const apiKey = "c6708ba426105dd7dcc10c3a911a5e1b";
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === '404') {
        document.querySelector('.error').textContent = 'City not found';
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else if (response.ok) {
        document.querySelector('.city').textContent = data.name;
        document.querySelector('.temp').textContent = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').textContent = data.main.humidity + '%';
        document.querySelector('.wind').textContent = data.wind.speed + ' km/hr';

        const weatherCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${weatherCode}.png`;
        weatherIcon.src = iconUrl;

        document.querySelector('.error').style.display = 'none';
        document.querySelector('.weather').style.display = 'block';
    }
    // } else {
    //     document.querySelector('.error').textContent = 'An error occurred. Please try again later.';
    //     document.querySelector('.error').style.display = 'block';
    //     document.querySelector('.weather').style.display = 'none';
    // }
}


searchBtn.addEventListener('click', () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        document.querySelector('.error').textContent = 'Please enter a valid city name.';
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }
}); m