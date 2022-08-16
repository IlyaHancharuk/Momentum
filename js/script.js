import playList from './playList.js'

const time = document.querySelector('time')
const date = document.querySelector('date')
const greetingContainer = document.querySelector('.greeting-container')
const greeting = document.querySelector('.greeting')
const userName = document.querySelector('.name')
const weather = document.querySelector('.weather')
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
const player = document.querySelector('.player')
const playBtn = document.querySelector('.play')
const playPrevBtn = document.querySelector('.play-prev')
const playNextBtn = document.querySelector('.play-next')
const playListContainer = document.querySelector('.play-list')
const langEnBtn = document.querySelector('.item-en')
const langRuBtn = document.querySelector('.item-ru')
const langEn = document.getElementById('langEn')
const langRu = document.getElementById('langRu')
const settingsBtn = document.querySelector('.settings-icon')
const settingsContainer = document.querySelector('.settings-container')
const settingsMenu = document.querySelector('.settings-menu')
const form = document.getElementById('backgroung-source')
const tagsInInput = document.querySelector('.tags-input')

let isPlay = false
let language = 'en'

let dateValue = new Date()

let showBlock = {
    player: 1,
    weather: 1,
    time: 1,
    date: 1,
    greeting: 1,
    quote: 1
}

function f (block) {
    if (showBlock.block === 0) {
        block.classList.add('hidden')
    } else {
        block.classList.remove('hidden')
    }
}

const langObj = {
    en: {
        nigth: 'Good nigth',
        morning: 'Good morning',
        afternoon: 'Good afternoon',
        evening: 'Good evening',
        windSpeed: 'Wind speed',
        units: 'm/s',
        humidity: 'Humidity',
        namePlaceholder: '[Enter name]',
        tagPlaceholder: 'enter tag...',
        language: 'Language',
        player: 'Player',
        weather: 'Weather',
        clocks: 'Clocks',
        date: 'Date',
        greeting: 'Greeting',
        quote: 'Quote',
        source: 'Source images'

    },
    ru: {
        nigth: 'Спокойной ночи',
        morning: 'Доброе утро',
        afternoon: 'Добрый день',
        evening: 'Добрый вечер',
        windSpeed: 'Скорость ветра',
        units: 'м/с',
        humidity: 'Влажность',
        namePlaceholder: '[Введите имя]',
        tagPlaceholder: 'введите тэг...',
        language: 'Язык',
        player: 'Плеер',
        weather: 'Погода',
        clocks: 'Часы',
        date: 'Дата',
        greeting: 'Приветствие',
        quote: 'Цитата',
        source: 'Источник изображения'
    }
}

//---------------------Quote of day--------------------------------

let randomQuoteNum
async function getQuotes() {
    const quotes = language === 'en' ? 'data.json' : 'dataRu.json'
    const res = await fetch(quotes)
    const data = await res.json()

    let getRandomQuoteNum = () => randomQuoteNum = Math.floor(Math.random() * 100)
    getRandomQuoteNum()

    quote.textContent = `"${data[randomQuoteNum]["text"]}"`
    author.textContent = data[randomQuoteNum]["author"]
}

changeQuote.addEventListener ('click', getQuotes)

//---------------------weather-----------------------------

city.value = 'Minsk'
let owfClass

async function getWeather() {  
    weatherIcon.className = 'weather-icon owf'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=91e0c5938a3b45ed4154661576da4ecf&units=metric`
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
        wind.textContent = `${langObj[language].windSpeed}: ${Math.round(data.wind.speed)} ${langObj[language].units}`
        humidity.textContent = `${langObj[language].humidity}: ${data.main.humidity}%`
    }
}

city.addEventListener('change', getWeather)



//----------------------Clocks-----------------------
let locales
function showTime() {
    dateValue = new Date()
    let optionsForTime = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false}    
    let optionsForDate = { weekday: 'long', month: 'long', day: 'numeric'}
    
    time.innerHTML = dateValue.toLocaleString(language, optionsForTime)
    date.innerHTML = dateValue.toLocaleString(language, optionsForDate)

    setTimeout(showTime, 1000) 
}

showTime()

//---------------Greeting-------------------------

let greetingText
let timeOfDay
function getTimeOfDay () { 
    const hours = dateValue.getHours()
    if (hours >= 0 && hours < 6) {
        greetingText = langObj[language].nigth
        timeOfDay = 'nigth'
    } else if (hours >= 6 && hours < 12) {
        greetingText = langObj[language].morning
        timeOfDay = 'morning'
    } else if (hours >= 12 && hours < 18) {
        greetingText = langObj[language].afternoon
        timeOfDay = 'afternoon'
    } else {
        greetingText = langObj[language].evening
        timeOfDay = 'evening'
    }
    greeting.textContent = greetingText   
    setTimeout(getTimeOfDay, 1000)
}

getTimeOfDay()



//---------------save in local storage----------------------------------

function setLocalStorage() {
    localStorage.setItem('name', userName.value)
    localStorage.setItem('city', city.value)
    localStorage.setItem('language', language)
    localStorage.setItem('showBlock', JSON.stringify(showBlock))
    
}
window.addEventListener('beforeunload', setLocalStorage)
function getLocalStorage() {
  if(localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name')
  }

  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city')
  }

  if(localStorage.getItem('language')) {
    language = localStorage.getItem('language')
    langEn.checked = language === 'en'
    langRu.checked = language === 'ru'
  }

  if(localStorage.getItem('showBlock')) {
    showBlock = JSON.parse(localStorage.getItem('showBlock'))
  }
}
window.addEventListener('load', () => {
    getLocalStorage()
    getWeather()
    getQuotes()
    getTranslateSettings()
    getTimeOfDay()
})

//--------------------slider----------------------------------------

let randomNum
let bgUrl
let getRandomNum = () => randomNum = Math.floor(Math.random() * 20 + 1)
getRandomNum()

function setBg() { 
    let bgNum = String(randomNum).padStart(2, '0')
    const img = new Image()
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    bgUrl = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
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

slidePrev.addEventListener('click', function() {
    if (sourceImg === 'unsplash') {
        getLinkToImageInUnsp()
    } else if (sourceImg === 'flickr') {
        getLinkToImageInFlic()
    } else {
        getSlidePrev()
    }
})

slideNext.addEventListener('click', function() {
    if (sourceImg === 'unsplash') {
        getLinkToImageInUnsp()
    } else if (sourceImg === 'flickr') {
        getLinkToImageInFlic()
    } else {
        getSlideNext()
    }
})

//---------------------image from API---------------------------
async function getLinkToImageInUnsp () {
    let url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags}&client_id=fg6V1-FMUyFtFJVmMEUrCgYssfrcB9wmCcyURszY4qQ`
    const res = await fetch(url)
    const data = await res.json()
    bgUrl = data.urls.regular
    const img = new Image()
    img.src = data.urls.regular
    img.onload = () => {      
        body.style.backgroundImage = `url("${bgUrl}")`
    }
}

let randomImgNum
async function getLinkToImageInFlic () {
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=47ed8b2c0859449bef5f83556459af46&tags=${tags}&extras=url_h&format=json&nojsoncallback=1`
    const res = await fetch(url)
    const data = await res.json()

    randomImgNum = Math.floor(Math.random() * 100)
    console.log(randomImgNum);
    bgUrl = data.photos.photo[randomImgNum].url_h
    const img = new Image()
    img.src = data.photos.photo[randomImgNum].url_h
    img.onload = () => {      
        body.style.backgroundImage = `url("${bgUrl}")`
    }
}


let sourceImg

addEventListener('change', function() {
    sourceImg = form.value
    if (sourceImg === 'github') {
        tagsInInput.disabled = true
        tagsInInput.hidden = true
        setBg()
    } else if (sourceImg === 'unsplash') {
        tagsInInput.disabled = false
        tagsInInput.hidden = false
        getLinkToImageInUnsp()
        
    } else if (sourceImg === 'flickr') {
        tagsInInput.disabled = false
        tagsInInput.hidden = false
        getLinkToImageInFlic()
    }
})


let tags = timeOfDay
addEventListener('change', function() {
    tags = tagsInInput.value
})
//-------------------Audio player-----------------------------------------------

const audio = new Audio()
let playNum = 0

function playAudio() {
    audio.src = playList[playNum].src
    audio.currentTime = 0
    if(!isPlay) {
        audio.play()
        isPlay = true
    } else if (isPlay) {
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

//-----------------settings menu-----------------------------------

settingsBtn.addEventListener('click', function() {
    settingsContainer.classList.toggle('settings-container-active')
    settingsBtn.classList.toggle('settings-icon-active')
    if(!settingsMenu.classList.contains('settings-menu-active')) {
        setTimeout(function() {
            settingsMenu.classList.add('settings-menu-active')
        }, 400)
    } else {
        settingsMenu.classList.remove('settings-menu-active')
    } 
})

//---------toggle lang-----------------

function getTranslateSettings() {
    document.querySelector('.language-text').innerHTML = langObj[language].language
    document.querySelector('.player-text').innerHTML = langObj[language].player
    document.querySelector('.weather-text').innerHTML = langObj[language].weather
    document.querySelector('.clocks-text').innerHTML = langObj[language].clocks
    document.querySelector('.date-text').innerHTML = langObj[language].date
    document.querySelector('.greeting-text').innerHTML = langObj[language].greeting
    document.querySelector('.quote-text').innerHTML = langObj[language].quote
    document.querySelector('.source-image-text').innerHTML = langObj[language].source
}


langEnBtn.addEventListener('click', function(){
    if (langEn.checked === true && language !== "en") {
        language = "en"
        getWeather()
        getQuotes()
        getTimeOfDay()
        showTime()
        userName.placeholder = langObj[language].namePlaceholder
        tagsInInput.placeholder = langObj[language].tagPlaceholder
        getTranslateSettings()
    }
})

langRuBtn.addEventListener('click', function(){
    if (langRu.checked === true && language !== "ru") {
        language = "ru"
        getWeather()
        getQuotes()
        getTimeOfDay()
        showTime()
        userName.placeholder = langObj[language].namePlaceholder
        tagsInInput.placeholder = langObj[language].tagPlaceholder
        getTranslateSettings()
    }
})



//---------show blocks----------------------------
function getShow (block) {
    block.classList.toggle('hidden')
}

document.getElementById('show-player-btn').addEventListener('click', function() {
    this.classList.toggle('switch-on')
    getShow(player)
})

document.getElementById('show-weather-btn').addEventListener('click', function() {
    this.classList.toggle('switch-on')
    getShow(weather)
})

document.getElementById('show-greeting-btn').addEventListener('click', function() {
    this.classList.toggle('switch-on')
    getShow(greetingContainer)
})
    
document.getElementById('show-clocks-btn').addEventListener('click', function() {
    this.classList.toggle('switch-on')
    getShow(time)
})

document.getElementById('show-date-btn').addEventListener('click', function() {
    this.classList.toggle('switch-on')
    getShow(date)
})

document.getElementById('show-quote-btn').addEventListener('click', function() {
    this.classList.toggle('switch-on')
    getShow(quote)
    getShow(author)
    getShow(changeQuote)
})



