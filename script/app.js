const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeRemained = document.querySelector('#time')
let time = 0
let score = 0
const board = document.querySelector('#board')
const colors = ['#40DFEF', '#B9F8D3', '#FFFBE7', '#E78EA9', '#BFFFF0']

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})
board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
}
})


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(value) {
    timeRemained.innerHTML = `00:${value}`
}
function finishGame() {
    timeRemained.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = randomDimension(10, 80)
    const { width, height } = board.getBoundingClientRect()
    const positionX = randomDimension(0, width - size)
    const positionY = randomDimension(0, height - size)

    circle.classList.add('circle')
    circle.style.height = `${size}px`
    circle.style.width = `${size}px`
    circle.style.top = `${positionY}px`
    circle.style.left = `${positionX}px`
    circle.style.background = getRandomColor()
    board.append(circle)
}

function randomDimension(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}