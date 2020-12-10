import { default_size } from "./config.mjs"

export function Food(pos, size) {
    this.x = pos.x || 0
    this.y = pos.y || 0
    this.size = size || default_size
    this.show = (ctx) => {
        ctx.beginPath()
        ctx.fillStyle = "red"
        ctx.rect(this.x, this.y, this.size, this.size)
        ctx.fill()
    }
    this.isEaten = (snake) => {
        return this.x == snake.x && this.y == snake.y
    }
}
