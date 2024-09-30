// STICKS

const hourStick = document.getElementById("hourStick")
const minuteStick = document.getElementById("minuteStick")
const secondStick = document.getElementById("secondStick")


// MARKS CONTAINER (UL)

const marksContainer = document.querySelector(".hour-marks")


// HOURS NUMBERS CONTAINER

const hoursNumberContainer = document.querySelector(".numbers")


// PARAGRAPH TO DISPLAY DATE ON CLOCK

const dayP = document.getElementById("day")




// DOM LOADED

document.addEventListener("DOMContentLoaded", (event) => {
    displayHours()
    displayMarks()
    setInterval(changeTime, 1000)
})



// STICKS MOVEMENT LOGIC

const days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"]

function changeTime() {
    // Get current hours, minutes, and seconds
    const currTime = new Date()
    const h = currTime.getHours()
    const m = currTime.getMinutes()
    const s = currTime.getSeconds()

    // Calculate stick degrees movement per second
    const sDeg = s * 6
    const mDeg = 6 * (m + s * 0.0169)
    const hDeg = 30 * (h + m * 0.0169)

    // Get full date for date paragraph
    const day = currTime.getDate()
    const dayOfWeek = days[currTime.getDay() - 1]
    const month = ("0" + (currTime.getMonth() + 1)).slice(-2)
    const year = currTime.getFullYear()

    dayP.textContent = `${dayOfWeek} ${day}\\${month}\\${year}`

    // Sticks movement
    secondStick.style.transform = `rotate(${sDeg}deg)`
    minuteStick.style.transform = `rotate(${mDeg}deg)`
    hourStick.style.transform = `rotate(${hDeg}deg)`
}


// FILL CLOCK WITH HOURS

function displayHours() {
    for(let i = 1; i <= 12; i ++) {
        const [li, div] = createLiAndDiv(hoursNumberContainer)

        // Print hours numbers and reposition them
        div.innerText = i
        li.style.transform = `rotate(${i * 30}deg)`
        div.style.transform = `rotate(-${i * 30}deg)`
    }
}


// FILL CLOCK WITH MARKS

function displayMarks() {
    for(let i = 1; i <= 60; i++) {
        const [li, div] = createLiAndDiv(marksContainer)
        div.classList.add("mark")

        // Reposition marks
        li.style.transform = `rotate(${i * 6}deg)`

        // Different style for main minutes/seconds mark (5, 10, 15 ...)
        if(i % 5 == 0) {
            div.classList.add("stick5")
        }
    }
}


// CREATE DIV INSIDE LI AND APPEND TO A CONTAINER

function createLiAndDiv(container) {
    const li = document.createElement("li")
    container.appendChild(li)
    const div = document.createElement("div")
    li.appendChild(div)
    return [li, div]
}