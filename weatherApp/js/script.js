
const API_KEY = "52c5ab5d2a1b49658de194604241108"

const selectors = {
    input:document.querySelector(".input"),
    btn:document.querySelector(".btn"),
    view:document.querySelector(".fa-eye"),
    container:document.querySelector(".container-extend")
}

const weatherPrincipal = {
    img:document.querySelector(".img"),
    temperature:document.querySelector(".temperature"),
    nation:document.querySelector(".weather-info-nation"),
    region:document.querySelector(".weather-info-region"),
    description:document.querySelector(".description"),
    wind:document.querySelector(".weather-info-wind"),
    humidity:document.querySelector(".weather-info-humidity"),
    clouds:document.querySelector(".weather-info-clouds"),
    name:document.querySelector(".span-city"),
    descriptionExtend:document.querySelector(".extend-description")
}

const fetchWeather = (value = "Argentina") =>  {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${value}&days=3&lang=es`)

    .then(res => res.json())
    .then(data => {
        displayWeather(data)
        displayForecast(data)
        displayChart(data)
    })
    .catch(error =>{
        console.log(error)
    }) 
}

const displayWeather = (data) => {

    const {location:{name,country,region},current:{temp_c, condition:{icon,text},wind_kph,humidity,cloud}} = data ;

    weatherPrincipal.img.src = icon
    weatherPrincipal.temperature.textContent = `${temp_c} °C`
    weatherPrincipal.nation.textContent = `${country}`
    weatherPrincipal.region.textContent = `${region}`
    weatherPrincipal.description.textContent = `${text}`
    weatherPrincipal.wind.textContent = `Viento: ${wind_kph} km/h`
    weatherPrincipal.humidity.textContent=`Humedad: ${humidity}%`
    weatherPrincipal.clouds.textContent=` Nubes : ${cloud}%`
    weatherPrincipal.name.textContent = name

}

let weatherChart = null;

const displayForecast = (data) =>{

    const {forecast:{forecastday}} = data   

    selectors.container.innerHTML =""

    for(let i=0; i<forecastday.length; i++){
    const day = forecastday[i]

    const dayFormatted = day.date.split("-").reverse().join("/")
    const dayName = getDayName(day.date).charAt(0).toUpperCase().concat(getDayName(day.date).slice(1))
    
    

    const element = `
                    <article class="days-extend">
                    <p class="extend-day">${dayName}</p>
                    <p class="extend-date">${dayFormatted}</p>
                    <img class="extend-img" src="${day.day.condition.icon}" alt="Icon">
                    <p class="extend-description">${day.day.condition.text}</p>
                    <div class="weather-info-extend">
                        <div class="flex">
                            <i class="fa-solid fa-temperature-three-quarters"></i>
                            <p class="temp">T.Max: ${day.day.maxtemp_c} °C</p>
                        </div>
                        <div class="flex">
                            <i class="fa-solid fa-temperature-empty"></i>
                            <p class="temp">T.Min: ${day.day.mintemp_c} °C </p>
                        </div>
                        <div class="flex-eye">
                            <i class="fa-solid fa-eye"></i>
                        </div>
                    </article> `

        selectors.container.insertAdjacentHTML("beforeend",element)
   }
}

const getDayName = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
}

const displayChart = (data) => {
    const ctx = document.getElementById("myChart")

    // Destruir el gráfico anterior si existe
    if (weatherChart) {
        weatherChart.destroy();
    }
    
    const {forecast:{forecastday}} = data 

        console.log(forecastday)
        const labels = forecastday.map(day => getDayName(day.date));
        console.log(labels)
        const maxTemps = forecastday.map(day => day.day.maxtemp_c);
        console.log(maxTemps)
        const minTemps = forecastday.map(day => day.day.mintemp_c);
        console.log(minTemps)

        weatherChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Temperatura Máxima (°C)',
                        data: maxTemps,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        tension: 0.1
                    },
                    {
                        label: 'Temperatura Mínima (°C)',
                        data: minTemps,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                        tension: 0.1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    
}


selectors.btn.addEventListener("click", () =>{
   const query = selectors.input.value
   fetchWeather(query)
})

selectors.input.addEventListener("keydown", (e) =>{
    const query = selectors.input.value
    if (e.key === "Enter") fetchWeather(query) 
})

 fetchWeather()

