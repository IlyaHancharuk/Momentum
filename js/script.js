const time = document.querySelector('time')
const date = document.querySelector('date')
const greeting = document.querySelector('.greeting')
const userName = document.querySelector('.name')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const city = document.querySelector('.city')


let dateValue = new Date()

//---------------------weather-----------------------------

city.value = 'Minsk'
let owfClass

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=91e0c5938a3b45ed4154661576da4ecf&units=metric`
    const res = await fetch(url)
    const data = await res.json()
    
    if (res.status === 404) {
        
        weatherIcon.classList.remove(owfClass)
        temperature.textContent = `Error! City ${city.value} is not found.`
        weatherDescription.textContent = ''
    } else {
        owfClass = `owf-${data.weather[0].id}`
        weatherIcon.classList.add(owfClass)
        temperature.textContent = `${data.main.temp}°C`
        weatherDescription.textContent = data.weather[0].description
    }
}

getWeather()
city.addEventListener('change', getWeather)

//----------------------Clocks-----------------------

function showTime() {
    dateValue = new Date()
    let optionsForTime = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false}    
    let optionsForDate = { weekday: 'long', month: 'long', day: 'numeric'}
    
    time.innerHTML = new Intl.DateTimeFormat('en-US', optionsForTime).format(dateValue)
    date.innerHTML = new Intl.DateTimeFormat('en-US', optionsForDate).format(dateValue)

    setTimeout(showTime, 1000) 
}

showTime()

//---------------Greeting-------------------------

let timeOfDay
function getTimeOfDay () { 
    const hours = dateValue.getHours()
    if (hours >= 0 && hours < 6) {
        timeOfDay = "nigth"
    } else if (hours >= 6 && hours < 12) {
        timeOfDay = "morning"
    } else if (hours >= 12 && hours < 18) {
        timeOfDay = "day"
    } else {
        timeOfDay = "evening"
    }   
    setTimeout(getTimeOfDay, 1000)
}

getTimeOfDay()

greeting.textContent = `Good ${timeOfDay} `

//---------------save user name----------------------------------

function setLocalStorage() {
    localStorage.setItem('name', userName.value)
  }
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name')
  }
}

window.addEventListener('load', getLocalStorage)

//-----------------------------------------------------------

