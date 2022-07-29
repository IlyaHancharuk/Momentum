const time = document.querySelector('time')
const date = document.querySelector('date')

function updateClocks() {
    const dateValue = new Date()
    let optionsForTime = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false}    
    let optionsForDate = { weekday: 'long', month: 'long', day: 'numeric'}
    
    time.innerHTML = new Intl.DateTimeFormat('en-US', optionsForTime).format(dateValue)
    date.innerHTML = new Intl.DateTimeFormat('en-US', optionsForDate).format(dateValue)
}

let timer = setTimeout(function tick() {
    updateClocks()
    timer = setTimeout(tick, 1000)
}, 1000)