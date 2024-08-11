
const API_KEY = "4d3fb563f0f4c0f4752ed1adc41ace16"

// Clima promedio 
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Colombia&appid=${API_KEY}&units=metric&lang=es`)
.then(res => res.json())
.then(data => {
    console.log(data)
})


// Clima de los proximos 5 dias en distintas horas.

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Quilmes&appid=${API_KEY}&units=metric&lang=es`)
.then(res => res.json())
.then(data => {
    console.log(data)
})

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