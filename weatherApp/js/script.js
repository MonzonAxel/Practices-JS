
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
    name:document.querySelector(".span-city")
}

const fetchWeather = (value = "Argentina") =>  {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${value}&lang=es`)
    .then(res => res.json())
    .then(data => {
        displayWeather(data)
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

const fetchForescast = (value = "Argentina") =>{
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${value}&days=3&lang=es`)
    .then(res => res.json())
    .then(data => {
        displayForecast(data)
    })
    .catch(error =>{
        console.log(error)
    })
}

const displayForecast = (data) =>{
    const {forecast:{forecastday}} = data   

    selectors.container.innerHTML =""

    for(let i=0; i<forecastday.length; i++){
    const day = forecastday[i]
    console.log(day)

    const element = `
                    <article class="days-extend">
                    <p class="extend-day">Dia</p>
                    <p class="extend-date">${day.date}</p>
                    <img class="extend-img" src="${day.day.condition.icon}" alt="Icon">
                    <div class="weather-info-extend">
                        <div class="flex">
                            <i class="fa-solid fa-temperature-three-quarters"></i>
                            <p>T. Max :${day.day.maxtemp_c}</p>
                        </div>
                        <div class="flex">
                            <i class="fa-solid fa-temperature-empty"></i>
                            <p>T. Min :${day.day.mintemp_c} </p>
                        </div>
                        <div class="flex-eye">
                            <i class="fa-solid fa-eye"></i>
                        </div>
                    </article> `

        selectors.container.insertAdjacentHTML("beforeend",element)
   }
}


selectors.btn.addEventListener("click", () =>{
   const query = selectors.input.value
   fetchWeather(query)
   fetchForescast(query)
})

fetchWeather()

fetchForescast()







// const ctx = document.getElementById('myChart');

//   new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });