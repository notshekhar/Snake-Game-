import { deploy, default_size } from "./config.mjs"
import { Snake, vector } from "./snake.mjs"
import { Food } from "./food.mjs"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const { width, height } = canvas
const [rows, cols] = [width / default_size, height / default_size]
console.log(rows, cols)
// const snakePos = new vector(0, 0)
let snakePos
let boundary
let snake
let food

let gameRunnning = false
let gameOver = true

window.snake = snake

//draw a line on canvas
function line(stroke, width, x, y, nx, ny) {
    ctx.beginPath()
    ctx.strokeStyle = stroke
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.lineWidth = width
    ctx.moveTo(x, y)
    ctx.lineTo(nx, ny)
    ctx.stroke()
}

function drawGrids() {
    for (let i = 0; i < rows; i++) {
        line("black", 1, i * default_size, 0, i * default_size, height)
    }
    for (let i = 0; i < cols; i++) {
        line("black", 1, 0, i * default_size, width, i * default_size)
    }
}
function cleanCanvas() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)
    ctx.beginPath()
    ctx.rect(0, 0, width, height)
    ctx.stroke()
}
window.onkeydown = (e) => {
    let [x, y] = [0, 0]
    let keyCode = e.keyCode
    if (keyCode == 13) {
        if (gameOver) resetGame()
    }
    switch (keyCode) {
        case 38:
            ;[x, y] = [0, -1]
            break
        case 40:
            ;[x, y] = [0, 1]
            break
        case 37:
            ;[x, y] = [-1, 0]
            break
        case 39:
            ;[x, y] = [1, 0]
            break
    }
    let pos = vector(x, y)
    if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40)
        snake.update(pos)
}
canvas.onclick = () => {
    if (gameOver) resetGame()
}

function generateNewFood() {
    let x = Math.floor(Math.random() * rows) * default_size
    let y = Math.floor(Math.random() * cols) * default_size
    food = new Food(vector(x, y))
}
function resetGame() {
    snakePos = vector(width / 2, height / 2)
    boundary = vector(width, height)
    snake = new Snake(snakePos, boundary)
    generateNewFood()
    gameOver = false
    gameRunnning = true
    console.log("reset")
}
function gameOverMessage() {
    ctx.font = "30px Arial"
    ctx.fillStyle = "red"
    ctx.textAlign = "center"
    ctx.fillText("Game Over, Press Enter restart", width / 2, height / 2)
}
function startNewGame() {
    ctx.font = "30px Arial"
    ctx.fillStyle = "red"
    ctx.textAlign = "center"
    ctx.fillText("Press Enter, to start the Game", width / 2, height / 2)
}

window.gameOverF = () => (gameOver = true)

startNewGame()

function draw() {
    if (gameRunnning) {
        //cleaning canvas
        cleanCanvas()
        drawGrids()
        if (snake.isDead() || gameOver) {
            gameOver = true
            gameRunnning = false
            cleanCanvas()
            gameOverMessage()
        } else {
            food.show(ctx)
            if (food.isEaten(snake)) {
                snake.eat(food)
                generateNewFood()
            }
            snake.show(ctx)
            snake.run()
        }
    }
}
setInterval(() => draw(), 150)

console.log(vector(-1, 0).isEqual(vector(-1, 0)))
