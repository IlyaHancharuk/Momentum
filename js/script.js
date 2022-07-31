const time = document.querySelector('time')
const date = document.querySelector('date')
const greeting = document.querySelector('.greeting')
const userName = document.querySelector('.name')


let dateValue = new Date()



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
    localStorage.setItem('name', userName.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
  }
}

//-----------------------------------------------------------
