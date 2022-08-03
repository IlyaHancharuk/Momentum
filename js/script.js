import playList from './playList.js'

const time = document.querySelector('time')
const date = document.querySelector('date')
const greeting = document.querySelector('.greeting')
const userName = document.querySelector('.name')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city')
const body = document.querySelector('body')
const slidePrev = document.querySelector('.slide-prev')
const slideNext = document.querySelector('.slide-next')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')
const playBtn = document.querySelector('.play')
const playPrevBtn = document.querySelector('.play-prev')
const playNextBtn = document.querySelector('.play-next')
const playListContainer = document.querySelector('.play-list')

let isPlay = false
let dateValue = new Date()

//---------------------weather-----------------------------

city.value = 'Minsk'
let owfClass

async function getWeather() {  
    weatherIcon.className = 'weather-icon owf'
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
        temperature.textContent = `${Math.round(data.main.temp)}°C`
        weatherDescription.textContent = data.weather[0].description
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
        humidity.textContent = `Humidity: ${data.main.humidity}%`
    }
}

getWeather()
city.addEventListener('change', getWeather)

//---------------------Quote of day--------------------------------

let randomQuoteNum
async function getQuotes() {  
    const quotes = 'data.json'
    const res = await fetch(quotes)
    const data = await res.json()

    let getRandomQuoteNum = () => randomQuoteNum = Math.floor(Math.random() * 100)
    getRandomQuoteNum()

    quote.textContent = `"${data[randomQuoteNum]["text"]}"`
    author.textContent = data[randomQuoteNum]["author"]
  }
  getQuotes()

changeQuote.addEventListener ('click', getQuotes)

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
        timeOfDay = "afternoon"
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

//--------------------slider----------------------------------------

let randomNum

let getRandomNum = () => randomNum = Math.floor(Math.random() * 20 + 1)
getRandomNum()

function setBg() { 
    let bgNum = String(randomNum).padStart(2, '0')
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    let bgUrl = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.onload = () => {      
        body.style.backgroundImage = `url("${bgUrl}")`
      }
}
setBg()

function getSlideNext() {
    randomNum +=1
    if (randomNum > 20) {
        randomNum = 1
    }
    setBg()
}

function getSlidePrev() {
    randomNum = randomNum - 1
    if (randomNum < 1) {
        randomNum = 20
    }
    setBg()
}

slidePrev.addEventListener('click', getSlidePrev)
slideNext.addEventListener('click', getSlideNext)

//-------------------Audio player-----------------------------------------------

const audio = new Audio()
let playNum = 0

function playAudio() {
  audio.src = playList[playNum].src
  audio.currentTime = 0
  if(!isPlay) {
    audio.play()
    isPlay = true
  } else if (isPlay) 
  {
    audio.pause()
    isPlay = false
  }

}

function togglePlayIcon() {
    if(!isPlay) {
        playBtn.classList.remove('pause')
      } else {
        playBtn.classList.add('pause')
      }
}

playBtn.addEventListener('click', playAudio)
playBtn.addEventListener('click', togglePlayIcon)

function playNext() {
    playNum +=1
    if (playNum > playList.length - 1) {
        playNum = 0
    }
    isPlay = false
    playAudio()
    togglePlayIcon()
}

function playPrev() {
    playNum = playNum - 1
    if (playNum < 0) {
        playNum = playList.length - 1
    }
    isPlay = false
    playAudio()
    togglePlayIcon()
}

playNextBtn.addEventListener('click', playNext)
playPrevBtn.addEventListener('click', playPrev)

for (let i = 0; i < playList.length; i++) {
    const li = document.createElement('li')
    li.classList.add('play-item')
    li.textContent = playList[i].title
    playListContainer.append(li)
}

/* const playItems = document.querySelectorAll('.play-item')
playItems[playNum].classList.add('.item-active') */